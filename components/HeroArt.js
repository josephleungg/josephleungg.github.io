'use client';
import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const INK = 'rgba(15, 15, 15, 0.26)';
const ACCENT = '#ff4655';
const DOT_COLUMNS = [0, 1, 2, 3, 4];
const DRAW_SECONDS = 0.8;
const DELAY_SCALE = 0.4;

function drawIn(delay, still) {
    if (still) return { initial: false };
    return {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: DRAW_SECONDS, delay: delay * DELAY_SCALE, ease: 'easeInOut' },
    };
}

function popIn(delay, still) {
    if (still) return { initial: false };
    return {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.4, delay: delay * DELAY_SCALE, ease: 'backOut' },
    };
}

export default function HeroArt() {
    const rootRef = useRef(null);
    const still = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: rootRef, offset: ['start start', 'end start'] });

    const spin = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const counterSpin = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const drift = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const fade = useTransform(scrollYProgress, [0.25, 0.85], [1, 0]);

    const line = { fill: 'none', stroke: INK, strokeWidth: 1.25, strokeLinecap: 'round', vectorEffect: 'non-scaling-stroke' };
    const accentLine = { ...line, stroke: ACCENT };

    return (
        <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[62%] md:block lg:right-28">
            <motion.svg
                viewBox="0 0 700 800"
                preserveAspectRatio="xMaxYMid meet"
                className="h-full w-full overflow-visible"
                style={still ? undefined : { y: drift, opacity: fade }}
            >
                <motion.path d="M60 -20C140 160 20 280 130 420S330 560 300 800" {...line} {...drawIn(0.3, still)} />
                <motion.path d="M650 -30C540 150 640 330 540 420S360 520 420 640S640 690 620 800" {...accentLine} {...drawIn(0.5, still)} />

                <motion.g style={still ? undefined : { rotate: spin }}>
                    {/* Fades instead of drawing: the draw effect would replace its dashes. */}
                    <motion.circle
                        cx="480"
                        cy="390"
                        r="250"
                        {...line}
                        strokeDasharray="3 9"
                        {...(still ? { initial: false } : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: DRAW_SECONDS, delay: 0.4 * DELAY_SCALE } })}
                    />
                    <motion.circle cx="480" cy="390" r="180" {...line} {...drawIn(0.6, still)} />
                    <motion.circle cx="480" cy="140" r="6" fill={ACCENT} {...popIn(1.5, still)} />
                    <motion.circle cx="660" cy="390" r="4" fill={INK} {...popIn(1.7, still)} />
                </motion.g>

                <motion.g style={still ? undefined : { rotate: counterSpin }}>
                    <motion.path d="M480 280a110 110 0 0 1 110 110" {...accentLine} {...drawIn(0.9, still)} />
                    <motion.path d="M480 500a110 110 0 0 1 -110 -110" {...line} {...drawIn(1, still)} />
                    <motion.circle cx="480" cy="390" r="34" {...line} {...drawIn(1.1, still)} />
                    <motion.circle cx="480" cy="390" r="9" fill={ACCENT} fillOpacity="0.85" {...popIn(1.8, still)} />
                </motion.g>

                <motion.path d="M100 110c20-36 40-36 60 0s40 36 60 0s40-36 60 0" {...accentLine} {...drawIn(1.1, still)} />
                <motion.path d="M90 700a80 80 0 0 1 160 0M124 700a46 46 0 0 1 92 0" {...line} {...drawIn(1.2, still)} />
                <motion.circle cx="612" cy="82" r="30" {...line} {...drawIn(1.3, still)} />
                <motion.circle cx="250" cy="236" r="13" fill={ACCENT} fillOpacity="0.8" {...popIn(1.6, still)} />

                <motion.g {...(still ? { initial: false } : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 1.5 * DELAY_SCALE } })}>
                    {DOT_COLUMNS.flatMap((column) =>
                        DOT_COLUMNS.map((row) => (
                            <circle key={`${column}-${row}`} cx={520 + column * 24} cy={650 + row * 24} r="2" fill={INK} />
                        ))
                    )}
                </motion.g>
            </motion.svg>
        </div>
    );
}
