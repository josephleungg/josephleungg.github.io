'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { nowPlaying, car, sports, nowList } from '../../lib/data';

// Fills its (relatively-positioned, sized) parent via next/image, falling back
// to a styled placeholder if the file is missing so a missing asset never breaks layout.
function SafeImage({ src, alt, className, placeholder, sizes }) {
    const [errored, setErrored] = useState(false);
    if (!src || errored) {
        return (
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 ${className || ''}`}>
                <span className="font-grotesk text-3xl text-neutral-500">{placeholder}</span>
            </div>
        );
    }
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={className}
            onError={() => setErrored(true)}
        />
    );
}

const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

export default function Life() {
    return (
        <div className="flex flex-col justify-center px-6 py-24 sm:px-8 sm:py-28 md:px-24 lg:px-32">
            <p className="eyebrow mb-4">04 — Off the clock</p>
            <h2 className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl">
                A little life beyond code
            </h2>
            <p className="mt-4 max-w-lg font-inter text-muted">
                What I&apos;m listening to, driving, playing, and up to lately.
            </p>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* Now playing — Spotify style */}
                <motion.div
                    {...reveal}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 md:row-span-1 lg:col-span-1"
                >
                    <div className="mb-5 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#1DB954]" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.6-.12-.42.18-.78.6-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.24 1.08zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.6.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.66-1.56.42z" />
                        </svg>
                        <span className="font-roboto text-[10px] uppercase tracking-[0.25em] text-muted">Currently listening to</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <SafeImage
                                src={nowPlaying.cover}
                                alt={`${nowPlaying.album} cover`}
                                className="object-cover"
                                sizes="64px"
                                placeholder="♪"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-grotesk text-lg font-semibold text-ink">{nowPlaying.track}</p>
                            <p className="truncate font-inter text-sm text-muted">{nowPlaying.artist}</p>
                        </div>
                    </div>

                    {/* progress bar */}
                    <div className="mt-5">
                        <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                            <div className="h-full rounded-full bg-ink" style={{ width: `${nowPlaying.progress * 100}%` }} />
                        </div>
                        <div className="mt-2 flex justify-between font-roboto text-[10px] text-muted">
                            <span>{nowPlaying.elapsed}</span>
                            <span>{nowPlaying.length}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Car */}
                <motion.div
                    {...reveal}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface md:col-span-2 lg:col-span-2 lg:row-span-2 lg:flex-row"
                >
                    <div className="relative h-72 overflow-hidden sm:h-96 lg:h-full lg:min-h-[420px] lg:w-1/2">
                        <SafeImage
                            src={car.image}
                            alt="2023 Toyota GR Supra"
                            className="object-cover object-[center_60%]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            placeholder="🚗"
                        />
                        <span className="absolute left-4 top-4 rounded-full border border-line bg-paper/90 px-3 py-1 font-roboto text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur">
                            The whip
                        </span>
                    </div>
                    <div className="flex flex-col justify-center gap-6 p-6 lg:w-1/2 lg:p-8">
                        <div>
                            <p className="font-grotesk text-2xl font-bold tracking-tight text-ink">{car.name}</p>
                            <p className="mt-1 font-inter text-sm text-muted">{car.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                            {car.facts.map((f) => (
                                <div key={f.label}>
                                    <p className="font-roboto text-[10px] uppercase tracking-[0.2em] text-muted">{f.label}</p>
                                    <p className="mt-1 font-grotesk text-sm font-medium text-ink">{f.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sports */}
                <motion.div
                    {...reveal}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl border border-line bg-surface p-6"
                >
                    <span className="font-roboto text-[10px] uppercase tracking-[0.25em] text-muted">Currently playing</span>
                    <div className="mt-5 flex flex-col gap-4">
                        {sports.map((s) => (
                            <div key={s.name} className="flex items-center gap-4">
                                <span className="text-3xl">{s.emoji}</span>
                                <div>
                                    <p className="font-grotesk text-lg font-semibold text-ink">{s.name}</p>
                                    <p className="font-inter text-sm text-muted">{s.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Now list */}
                <motion.div
                    {...reveal}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="rounded-2xl border border-line bg-surface p-6 md:col-span-2 lg:col-span-1"
                >
                    <span className="font-roboto text-[10px] uppercase tracking-[0.25em] text-muted">/ now</span>
                    <div className="mt-5 flex flex-col divide-y divide-line">
                        {nowList.map((n) => (
                            <div key={n.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                <span className="font-roboto text-[11px] uppercase tracking-[0.15em] text-accent">{n.label}</span>
                                <span className="text-right font-inter text-sm text-ink">{n.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
