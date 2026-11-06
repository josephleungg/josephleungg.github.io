// Publishes this month's workouts to R2. Each run rebuilds the month from Hevy, so edits
// and deletions carry over, and anything from an earlier month is removed.
// Logs in with HEVY_USERNAME / HEVY_PASSWORD on every run; R2 uploads need the R2_* keys.
// --dry-run writes to public/ instead of R2. --month YYYY-MM overrides the current month.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright';
import sharp from 'sharp';

const PROFILE_USERNAME = 'jleunggg';
const PROFILE_URL = `https://hevy.com/user/${PROFILE_USERNAME}`;
const LOGIN_URL = 'https://hevy.com/login';
const LOGIN_TIMEOUT_MS = 30_000;
const TIME_ZONE = 'America/Toronto';
const BUCKET = 'jleungg-hevy';
const DATA_KEY = 'hevy.json';
const PHOTO_PREFIX = 'photos/';
const PHOTO_WIDTH = 640;
const KG_TO_LBS = 2.20462;
const MAX_SCROLLS = 40;
const IDLE_SCROLLS_BEFORE_STOP = 4;
const SCROLL_PAUSE_MS = 1500;

const { values: args } = parseArgs({
    options: { 'dry-run': { type: 'boolean', default: false }, month: { type: 'string' } },
});
const dryRun = args['dry-run'];

function torontoDate(date) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(date);
}

const toLbs = (kg) => Math.round(kg * KG_TO_LBS * 2) / 2;

const PR_LABELS = {
    best_weight: 'Best Weight',
    best_volume: 'Best Volume',
    best_1rm: 'Best 1RM',
    best_reps: 'Best Reps',
};
const SET_MARKERS = { warmup: 'W', dropset: 'D', failure: 'F' };

const prLabel = (type) => PR_LABELS[type] ?? type.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatSetDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return [minutes && `${minutes}m`, rest && `${rest}s`].filter(Boolean).join(' ');
}

function formatSet(set) {
    const parts = [];
    if (set.weight_kg && set.reps) parts.push(`${toLbs(set.weight_kg)} lbs × ${set.reps} reps`);
    else if (set.weight_kg) parts.push(`${toLbs(set.weight_kg)} lbs`);
    else if (set.reps) parts.push(`${set.reps} reps`);
    if (set.distance_meters) parts.push(`${(set.distance_meters / 1609.344).toFixed(2)} mi`);
    if (set.duration_seconds) parts.push(formatSetDuration(set.duration_seconds));
    return parts.join(' · ') || '—';
}

function timeOfDay(seconds) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: TIME_ZONE,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).format(new Date(seconds * 1000));
}

function toExercise(exercise) {
    // Only normal sets are numbered, so a drop set between sets 1 and 2 shows as 1, D, 2.
    let working = 0;
    return {
        name: exercise.title,
        rest: exercise.rest_seconds > 0 ? exercise.rest_seconds : null,
        notes: (exercise.notes ?? '').trim(),
        sets: exercise.sets.map((set) => ({
            n: SET_MARKERS[set.indicator] ?? String(++working),
            text: formatSet(set),
            records: (set.prs ?? []).map((record) => prLabel(record.type)),
        })),
    };
}

function toWorkout(raw) {
    const sets = raw.exercises.flatMap((exercise) => exercise.sets);
    const heartRate = raw.biometrics?.average_heart_rate;
    const calories = raw.biometrics?.total_calories;
    return {
        id: raw.short_id,
        title: raw.name,
        description: (raw.description ?? '').trim(),
        date: torontoDate(new Date(raw.start_time * 1000)),
        start: timeOfDay(raw.start_time),
        end: timeOfDay(raw.end_time),
        duration: formatDuration(raw.end_time - raw.start_time),
        volumeLbs: Math.round(raw.estimated_volume_kg * KG_TO_LBS),
        sets: sets.length,
        records: sets.reduce((total, set) => total + (set.prs?.length ?? 0), 0),
        yearlyRecords: sets.reduce((total, set) => total + (set.yearly_prs?.length ?? 0), 0),
        avgHeartRate: heartRate > 0 ? Math.round(heartRate) : null,
        calories: calories > 0 ? Math.round(calories) : null,
        photo: null,
        sourceImage: raw.image_urls?.[0] ?? null,
        exercises: raw.exercises.map(toExercise),
    };
}

function readCredentials() {
    const { HEVY_USERNAME: username, HEVY_PASSWORD: password } = process.env;
    if (!username || !password) throw new Error('Missing HEVY_USERNAME or HEVY_PASSWORD.');
    return { username, password };
}

// Failures are reported by step only: Playwright's own errors can echo the values typed into the form.
async function logIn(page, { username, password }) {
    let step = 'opening the login page';
    try {
        await page.goto(LOGIN_URL, { waitUntil: 'networkidle' });
        step = 'filling in the form';
        await page.locator('form input:not([type="password"]):not([type="hidden"])').fill(username);
        await page.locator('form input[type="password"]').fill(password);
        step = 'submitting the form';
        await page.getByRole('button', { name: 'Login', exact: true }).click();
    } catch {
        throw new Error(`Hevy login failed while ${step}. Nothing was changed.`);
    }

    // A wrong password or a bot check leaves the page on /login. Neither is worked around here.
    try {
        await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: LOGIN_TIMEOUT_MS });
    } catch {
        throw new Error(
            'Hevy login did not complete. Check HEVY_USERNAME and HEVY_PASSWORD, or Hevy may have shown a bot check. Nothing was changed.'
        );
    }
}

async function readMonthFromHevy(month) {
    const credentials = readCredentials();

    const browser = await chromium.launch({ headless: true });
    try {
        const context = await browser.newContext({ timezoneId: TIME_ZONE, locale: 'en-US' });
        const page = await context.newPage();

        await logIn(page, credentials);

        const raw = new Map();
        let responses = 0;
        let rejected = 0;
        page.on('response', async (response) => {
            const url = new URL(response.url());
            if (url.host !== 'api.hevyapp.com' || url.pathname !== '/user_workouts_paged') return;
            if (url.searchParams.get('username') !== PROFILE_USERNAME) return;
            if (!response.ok()) {
                rejected += 1;
                return;
            }
            const body = await response.json().catch(() => null);
            if (!body) return;
            responses += 1;
            for (const workout of body.workouts ?? []) raw.set(workout.short_id, workout);
        });

        await page.goto(PROFILE_URL, { waitUntil: 'networkidle' });
        if (rejected || !responses) throw new Error('Hevy returned no workout data after logging in.');

        const monthStart = Date.parse(`${month}-01T00:00:00Z`) / 1000 - 86400;
        const reachedOlderMonth = () => [...raw.values()].some((workout) => workout.start_time < monthStart);

        await page.mouse.move(700, 450);
        let idleScrolls = 0;
        for (let i = 0; i < MAX_SCROLLS && !reachedOlderMonth() && idleScrolls < IDLE_SCROLLS_BEFORE_STOP; i++) {
            const before = raw.size;
            await page.mouse.wheel(0, 2500);
            await page.waitForTimeout(SCROLL_PAUSE_MS);
            idleScrolls = raw.size === before ? idleScrolls + 1 : 0;
        }

        return [...raw.values()];
    } finally {
        await browser.close();
    }
}

function validate(workouts) {
    for (const workout of workouts) {
        const complete = workout.id && workout.title && /^\d{4}-\d{2}-\d{2}$/.test(workout.date) && workout.exercises.length;
        if (!complete) throw new Error('Hevy data is missing expected fields. Nothing was changed.');
    }
}

async function resizePhoto(sourceUrl) {
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`Photo download failed with status ${response.status}.`);
    return sharp(Buffer.from(await response.arrayBuffer()))
        .rotate()
        .resize({ width: PHOTO_WIDTH, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer();
}

function localStore() {
    const path = (key) => `public/${key}`;
    return {
        async readData() {
            return existsSync(path(DATA_KEY)) ? readFile(path(DATA_KEY), 'utf8') : null;
        },
        async putPhoto(key, body) {
            await mkdir(`public/${PHOTO_PREFIX}`, { recursive: true });
            await writeFile(path(key), body);
        },
        async putData(body) {
            await writeFile(path(DATA_KEY), body);
        },
        async listPhotos() {
            return [];
        },
        async deletePhotos() {},
    };
}

async function r2Store() {
    const { DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } = await import(
        '@aws-sdk/client-s3'
    );
    const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) throw new Error('Missing R2 credentials.');

    const client = new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
    });

    return {
        async readData() {
            try {
                const { Body } = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: DATA_KEY }));
                return await Body.transformToString();
            } catch (error) {
                if (error.name === 'NoSuchKey') return null;
                throw error;
            }
        },
        async putPhoto(key, body) {
            await client.send(
                new PutObjectCommand({
                    Bucket: BUCKET,
                    Key: key,
                    Body: body,
                    ContentType: 'image/webp',
                    CacheControl: 'public, max-age=31536000, immutable',
                })
            );
        },
        async putData(body) {
            await client.send(
                new PutObjectCommand({
                    Bucket: BUCKET,
                    Key: DATA_KEY,
                    Body: body,
                    ContentType: 'application/json',
                    CacheControl: 'public, max-age=300',
                })
            );
        },
        async listPhotos() {
            const { Contents = [] } = await client.send(
                new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PHOTO_PREFIX })
            );
            return Contents.map((object) => object.Key);
        },
        async deletePhotos(keys) {
            if (!keys.length) return;
            await client.send(
                new DeleteObjectsCommand({ Bucket: BUCKET, Delete: { Objects: keys.map((Key) => ({ Key })) } })
            );
        },
    };
}

async function main() {
    const month = args.month ?? torontoDate(new Date()).slice(0, 7);
    const store = dryRun ? localStore() : await r2Store();

    const raw = await readMonthFromHevy(month);
    const workouts = raw
        .filter((workout) => !workout.is_private)
        .map(toWorkout)
        .filter((workout) => workout.date.startsWith(month))
        .sort((a, b) => b.date.localeCompare(a.date));
    validate(workouts);

    const previousText = await store.readData();
    const previous = previousText ? JSON.parse(previousText) : { workouts: [] };
    const existingPhotos = new Map(previous.workouts.map((workout) => [workout.id, workout.photo]));

    // New photos go up first and old ones come down last, so the card never points at a missing image.
    for (const workout of workouts) {
        const { sourceImage } = workout;
        delete workout.sourceImage;
        if (!sourceImage) continue;
        const key = `${PHOTO_PREFIX}${workout.id}.webp`;
        if (existingPhotos.get(workout.id) !== key) await store.putPhoto(key, await resizePhoto(sourceImage));
        workout.photo = key;
    }

    const nextText = `${JSON.stringify({ month, workouts }, null, 2)}\n`;
    if (nextText !== previousText) await store.putData(nextText);

    const keep = new Set(workouts.map((workout) => workout.photo));
    const stale = (await store.listPhotos()).filter((key) => !keep.has(key));
    await store.deletePhotos(stale);

    console.log(
        `${month}: ${workouts.length} workouts, ${nextText === previousText ? 'no change' : 'updated'}, ${stale.length} old photos deleted.`
    );
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
