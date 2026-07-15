'use client';
import React, { useEffect, useState } from 'react';

/**
 * Minimalist loading overlay with a grey progress bar.
 * Progress is tied to real work: images loading, fonts ready, and window.load.
 * Eases toward 100%, fades out, then unmounts. Never hangs (hard 4s fallback).
 */
export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let current = 0;
        let finished = false;
        let raf;

        const readTarget = () => {
            // Weight three signals: images, fonts, window load.
            const imgs = Array.from(document.images || []);
            const total = imgs.length;
            const loaded = imgs.filter((img) => img.complete).length;
            const imgRatio = total === 0 ? 1 : loaded / total;

            const fontsReady = document.fonts && document.fonts.status === 'loaded' ? 1 : 0.6;
            const windowLoaded = document.readyState === 'complete' ? 1 : 0.5;

            return Math.min(1, imgRatio * 0.6 + fontsReady * 0.2 + windowLoaded * 0.2);
        };

        const finish = () => {
            if (finished) return;
            finished = true;
            current = 100;
            setProgress(100);
            setDone(true);
            // unmount after the fade
            setTimeout(() => setMounted(false), 650);
        };

        const tick = () => {
            const target = readTarget() * 100;
            // ease current toward target; creep slowly if target stalls below 100
            const next = current + Math.max((target - current) * 0.08, target > current ? 0.4 : 0);
            current = Math.min(next, 99.5);
            setProgress(Math.round(current));

            if (readTarget() >= 1 && document.readyState === 'complete') {
                finish();
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        const onLoad = () => { /* readState flips to complete; tick will catch it */ };
        window.addEventListener('load', onLoad);

        // Hard safety net so the overlay can never trap the user.
        const failsafe = setTimeout(finish, 4000);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('load', onLoad);
            clearTimeout(failsafe);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-paper transition-opacity duration-700 ${done ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
            <div className="flex w-64 flex-col items-center gap-5 px-6">
                <div className="font-grotesk text-2xl font-bold tracking-tight text-ink">
                    Joseph Leung<span className="animate-flicker text-accent">.</span>
                </div>

                {/* grey track + fill */}
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
                    <div
                        className="h-full rounded-full bg-neutral-400 transition-[width] duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex w-full items-center justify-between font-roboto text-[11px] uppercase tracking-[0.3em] text-muted">
                    <span>Loading</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
}
