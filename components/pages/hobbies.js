'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HevyProvider } from '../gym/hevy-data';
import WorkoutCard from '../gym/WorkoutCard';
import CalendarCard from '../gym/CalendarCard';
import { LABEL_CLASS } from '../gym/format';
import { nowPlaying, sports } from '../../lib/data';

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

// Cards lie back and fan outward, then stand up as they scroll in; scrolling away folds them down.
function HobbyCard({ fan = 0, delay = 0, className, children }) {
    const cardRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'start 0.8'],
    });

    const range = [delay, Math.min(delay + 0.75, 1)];
    const rotateX = useTransform(scrollYProgress, range, [48, 0]);
    const rotateY = useTransform(scrollYProgress, range, [fan, 0]);
    const y = useTransform(scrollYProgress, range, [90, 0]);
    const scale = useTransform(scrollYProgress, range, [0.88, 1]);
    const opacity = useTransform(scrollYProgress, [delay, delay + 0.35], [0, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={reduceMotion ? undefined : { rotateX, rotateY, y, scale, opacity, transformOrigin: '50% 100%' }}
            className={`rounded-2xl border border-line bg-surface ${className || ''}`}
        >
            {children}
        </motion.div>
    );
}

export default function Hobbies() {
    return (
        <div className="flex min-h-screen flex-col px-6 pb-16 pt-24 sm:px-8 md:px-24 lg:h-screen lg:min-h-[44rem] lg:px-32">
            <p className="eyebrow mb-3">Hobbies</p>
            <h2 className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl">
                Off the clock
            </h2>
            <p className="mt-3 max-w-lg font-inter text-muted">
                What I&apos;m listening to, driving, playing, and up to lately.
            </p>

            <HevyProvider>
                <div
                    className="mt-10 grid min-h-0 flex-1 gap-3 md:grid-cols-2 lg:max-h-[40rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)_minmax(0,1fr)] lg:grid-rows-2"
                    style={{ perspective: 1200 }}
                >
                    {/* Now playing — Spotify style */}
                    <HobbyCard fan={14} delay={0.1} className="flex flex-col justify-between p-4 lg:col-start-1 lg:row-start-1">
                        <div className="mb-3 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1DB954]" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.6-.12-.42.18-.78.6-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.24 1.08zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.6.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.66-1.56.42z" />
                            </svg>
                            <span className={LABEL_CLASS}>Currently listening to</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                                <SafeImage
                                    src={nowPlaying.cover}
                                    alt={`${nowPlaying.album} cover`}
                                    className="object-cover"
                                    sizes="48px"
                                    placeholder="♪"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="truncate font-grotesk text-base font-semibold text-ink">{nowPlaying.track}</p>
                                <p className="truncate font-inter text-xs text-muted">{nowPlaying.artist}</p>
                            </div>
                        </div>

                        {/* progress bar */}
                        <div className="mt-3">
                            <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                                <div className="h-full rounded-full bg-ink" style={{ width: `${nowPlaying.progress * 100}%` }} />
                            </div>
                            <div className="mt-1.5 flex justify-between font-roboto text-[10px] text-muted">
                                <span>{nowPlaying.elapsed}</span>
                                <span>{nowPlaying.length}</span>
                            </div>
                        </div>
                    </HobbyCard>

                    {/* Sports */}
                    <HobbyCard fan={14} delay={0.2} className="flex flex-col p-4 lg:col-start-1 lg:row-start-2">
                        <span className={LABEL_CLASS}>Currently playing</span>
                        <div className="mt-3 flex flex-1 flex-col justify-center gap-3">
                            {sports.map((s) => (
                                <div key={s.name} className="flex items-center gap-3">
                                    <span className="text-2xl">{s.emoji}</span>
                                    <div>
                                        <p className="font-grotesk text-base font-semibold text-ink">{s.name}</p>
                                        <p className="font-inter text-xs text-muted">{s.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HobbyCard>

                    {/* Workout details */}
                    <HobbyCard className="min-h-0 overflow-hidden p-4 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                        <WorkoutCard />
                    </HobbyCard>

                    {/* Calendar */}
                    <HobbyCard fan={-14} delay={0.1} className="min-h-0 overflow-hidden p-4 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
                        <CalendarCard />
                    </HobbyCard>
                </div>
            </HevyProvider>
        </div>
    );
}
