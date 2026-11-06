'use client';
import React, { useEffect, useRef, useState } from 'react';

const THUMB_HEIGHT_PCT = 22;

export default function ScrollIndicator() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const hideTimeout = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
            setProgress(Math.min(1, Math.max(0, pct)));

            setVisible(true);
            clearTimeout(hideTimeout.current);
            hideTimeout.current = setTimeout(() => setVisible(false), 1200);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed right-2 top-1/2 z-40 -translate-y-1/2 sm:right-6 md:right-8"
        >
            <div
                className="relative h-36 w-[3px] rounded-full bg-ink/15 transition-opacity duration-500 ease-out"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <div
                    className="absolute left-0 w-full rounded-full bg-ink transition-[top] duration-150 ease-out"
                    style={{
                        height: `${THUMB_HEIGHT_PCT}%`,
                        top: `${progress * (100 - THUMB_HEIGHT_PCT)}%`,
                    }}
                />
            </div>
        </div>
    );
}
