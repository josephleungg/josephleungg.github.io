'use client';
import React, { useId, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { photoUrl, useHevy } from './hevy-data';
import { LABEL_CLASS, formatDate, formatRest, formatTime } from './format';

const FADE_MASK = '[mask-image:linear-gradient(to_bottom,black_calc(100%-1.5rem),transparent)]';
const SET_MEANINGS = { W: 'Warm-up set', D: 'Drop set', F: 'Failure set' };
const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function buildStats(workout) {
    return [
        { label: 'Duration', value: workout.duration },
        { label: 'Volume', value: workout.volumeLbs.toLocaleString('en-US'), unit: 'lbs' },
        { label: 'Sets', value: workout.sets },
        { label: 'Exercises', value: workout.exercises.length },
        workout.avgHeartRate && { label: 'Heart rate', value: workout.avgHeartRate, unit: 'bpm' },
        workout.calories && { label: 'Calories', value: workout.calories, unit: 'kcal' },
        { label: 'PRs', value: workout.records },
        { label: 'Yearly PRs', value: workout.yearlyRecords },
    ].filter(Boolean);
}

function Chevron({ open }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 16 16"
            className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 6l4 4 4-4" />
        </svg>
    );
}

function SetRow({ set }) {
    const isMarker = SET_MEANINGS[set.n];
    return (
        <li className={`grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-3 rounded-lg px-2 py-1.5 ${set.records.length ? 'bg-paper' : ''}`}>
            <span className={`text-center font-grotesk text-sm font-medium ${isMarker ? 'text-accent' : 'text-ink'}`}>
                {isMarker && <span className="sr-only">{SET_MEANINGS[set.n]} </span>}
                {set.n}
            </span>
            <div>
                <p className="font-grotesk text-sm text-ink">{set.text}</p>
                {set.records.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {set.records.map((record) => (
                            <span key={record} className="rounded-full bg-accent/10 px-2 py-0.5 font-roboto text-[9px] text-accent">
                                PR · {record}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}

function ExerciseRow({ exercise, isOpen, onToggle }) {
    const panelId = useId();
    const setCount = exercise.sets.length;
    const meta = [`${setCount} ${setCount === 1 ? 'set' : 'sets'}`, exercise.rest && `${formatRest(exercise.rest)} rest`]
        .filter(Boolean)
        .join(' · ');
    const hasRecord = exercise.sets.some((set) => set.records.length);

    return (
        <li className={`shrink-0 rounded-xl border bg-surface transition-colors duration-300 ${isOpen ? 'border-ink/20' : 'border-line'}`}>
            <button
                type="button"
                data-cursor
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={onToggle}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left ${FOCUS_RING}`}
            >
                <div className="min-w-0">
                    <p className="flex items-center gap-2 font-grotesk text-sm font-semibold text-ink">
                        <span className="truncate">{exercise.name}</span>
                        {hasRecord && (
                            <span className="shrink-0 rounded-full bg-accent/10 px-1.5 py-0.5 font-roboto text-[9px] uppercase tracking-[0.1em] text-accent">
                                PR
                            </span>
                        )}
                    </p>
                    <p className="mt-0.5 font-roboto text-[10px] text-muted">{meta}</p>
                </div>
                <Chevron open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-3">
                            <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 px-2 pb-1 font-roboto text-[9px] uppercase tracking-[0.15em] text-muted">
                                <span className="text-center">Set</span>
                                <span>Weight &amp; reps</span>
                            </div>
                            <ol>
                                {exercise.sets.map((set, index) => (
                                    <SetRow key={index} set={set} />
                                ))}
                            </ol>
                            {exercise.notes && <p className="mt-1.5 px-2 font-inter text-xs italic text-muted">{exercise.notes}</p>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

function WorkoutDetails({ workout }) {
    const [openIndex, setOpenIndex] = useState(-1);
    const reduceMotion = useReducedMotion();
    const exerciseCount = workout.exercises.length;

    return (
        <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid h-full min-h-0 gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-0"
        >
            <section className={`scrollbar-hide flex min-h-0 flex-col gap-2.5 md:overflow-y-auto md:pr-5 md:pb-5 ${FADE_MASK}`}>
                {workout.photo && (
                    <div className="relative h-56 shrink-0 overflow-hidden rounded-xl bg-line lg:h-auto lg:min-h-40 lg:flex-1">
                        <Image
                            src={photoUrl(workout.photo)}
                            alt={`Photo from the ${workout.title} workout`}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                )}

                <div>
                    <p className="font-roboto text-[11px] text-muted">
                        {formatDate(workout.date, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="mt-0.5 font-roboto text-[11px] text-muted">
                        {formatTime(workout.start)} — {formatTime(workout.end)}
                    </p>
                    <h3 className="mt-2 font-grotesk text-xl font-semibold leading-tight tracking-tight text-ink">{workout.title}</h3>
                    {workout.description && <p className="mt-1.5 font-inter text-sm text-muted">{workout.description}</p>}
                </div>

                <dl className="grid shrink-0 grid-cols-2 border-t border-line min-[1400px]:grid-cols-3">
                    {buildStats(workout).map((stat) => (
                        <div key={stat.label} className="border-b border-line py-1 pr-3">
                            <dt className="font-inter text-xs text-muted">{stat.label}</dt>
                            <dd className="mt-0.5 font-grotesk text-base font-medium text-ink">
                                {stat.value}
                                {stat.unit && <span className="ml-1 font-inter text-xs font-normal text-muted">{stat.unit}</span>}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="flex min-h-0 flex-col md:border-l md:border-line md:pl-5">
                <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-grotesk text-base font-semibold tracking-tight text-ink">Exercises &amp; sets</h4>
                    <span className="font-roboto text-[10px] text-muted">
                        {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
                    </span>
                </div>
                <ul className={`scrollbar-hide mt-3 flex min-h-0 flex-1 flex-col gap-2 pb-6 md:overflow-y-auto ${FADE_MASK}`}>
                    {workout.exercises.map((exercise, index) => (
                        <ExerciseRow
                            key={`${exercise.name}-${index}`}
                            exercise={exercise}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </ul>
            </section>
        </motion.div>
    );
}

export default function WorkoutCard() {
    const { status, selected } = useHevy();

    if (status === 'loading') return <div aria-hidden className="h-full min-h-60 animate-pulse rounded-xl bg-line/60" />;

    if (status === 'failed' || !selected) {
        return (
            <div>
                <span className={LABEL_CLASS}>In the gym</span>
                <p className="mt-3 font-inter text-sm text-muted">
                    {status === 'failed' ? 'Workouts are unavailable right now.' : 'No workouts yet this month.'}
                </p>
            </div>
        );
    }

    return <WorkoutDetails key={selected.id} workout={selected} />;
}
