'use client';
import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const RISE_PX = 72;
const SMOOTHING = { stiffness: 90, damping: 24, restDelta: 0.001 };

// Fades and rises with scroll position, so it reverses on the way back up.
// `anchorRef` drives it from another element, for content too low to reach the trigger point.
// Lower `end` values finish later; content resting low on a full-screen section needs a higher one.
export default function ScrollFade({ anchorRef, delay = 0, end = 0.55, className, children }) {
    const ownRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: anchorRef ?? ownRef,
        offset: ['start 0.98', `start ${end}`],
    });
    const progress = useSpring(scrollYProgress, SMOOTHING);

    const range = [delay, Math.min(delay + 0.8, 1)];
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [RISE_PX, 0]);

    return (
        <motion.div ref={ownRef} style={reduceMotion ? undefined : { opacity, y }} className={className}>
            {children}
        </motion.div>
    );
}
