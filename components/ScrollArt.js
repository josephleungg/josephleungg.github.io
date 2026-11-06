'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const GUTTER = 128; // matches the lg:px-32 page padding
const SEGMENT = 340;
const SWING = [[20, 108], [34, 94], [26, 100]]; // left/right reach of successive waves
const SPANS = [270, 230, 310, 250]; // vertical length of successive half-waves
const LOOP_RADIUS = 26;
const HEAD_POSITION = 0.75; // the line's tip sits this far down the viewport

const SHAPE_SPACING = 430;
const SHAPE_ORDER = ['orbit', 'wave', 'ring', 'dots', 'arcs', 'disc'];

const INK = 'rgba(15, 15, 15, 0.28)';
const ACCENT = '#ff4655';

// Half-waves meet at their peaks with a vertical tangent, and each loop is a true
// circle hung on one of those peaks, so no join can form a corner or a sharp tip.
function buildPath(height, offset, loopEvery) {
    let side = offset % 2;
    let x = SWING[0][side];
    let y = 0;
    let d = `M${x} 0`;

    for (let i = offset; y < height + SEGMENT; i++) {
        side = 1 - side;
        const nextX = SWING[i % SWING.length][side];
        const span = SPANS[i % SPANS.length];

        d += `C${x} ${y + span * 0.4} ${nextX} ${y + span * 0.6} ${nextX} ${y + span}`;
        x = nextX;
        y += span;

        if ((i + 1) % loopEvery === 0) {
            const across = (side === 0 ? 2 : -2) * LOOP_RADIUS;
            const sweep = side === 0 ? 0 : 1;
            d += `a${LOOP_RADIUS} ${LOOP_RADIUS} 0 0 ${sweep} ${across} 0a${LOOP_RADIUS} ${LOOP_RADIUS} 0 0 ${sweep} ${-across} 0`;
        }
    }
    return d;
}

function ShapeArt({ type }) {
    const stroke = { fill: 'none', stroke: INK, strokeWidth: 1.25, vectorEffect: 'non-scaling-stroke' };

    switch (type) {
        case 'orbit':
            return (
                <>
                    <circle cx="50" cy="50" r="48" {...stroke} strokeDasharray="3 6" />
                    <circle cx="50" cy="50" r="32" {...stroke} />
                    <circle cx="50" cy="18" r="4" fill={ACCENT} />
                </>
            );
        case 'wave':
            return <path d="M8 50c14-30 28-30 42 0s28 30 42 0" {...stroke} stroke={ACCENT} strokeLinecap="round" />;
        case 'dots':
            return [20, 40, 60, 80].flatMap((cy) =>
                [20, 40, 60, 80].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill={INK} />)
            );
        case 'arcs':
            return <path d="M14 70a36 36 0 0 1 72 0M32 70a18 18 0 0 1 36 0" {...stroke} strokeLinecap="round" />;
        case 'disc':
            return <circle cx="50" cy="50" r="14" fill={ACCENT} fillOpacity="0.85" />;
        default:
            return (
                <>
                    <circle cx="50" cy="50" r="40" {...stroke} />
                    <circle cx="90" cy="50" r="4" fill={ACCENT} />
                </>
            );
    }
}

function Shape({ type, y, side, inset, size, spin, viewport, scrollY, still }) {
    const range = [y - viewport, y + viewport];
    const appear = useTransform(scrollY, [y - viewport * 0.9, y - viewport * 0.6], [0, 1]);
    const rotate = useTransform(scrollY, range, [-spin, spin]);
    const drift = useTransform(scrollY, range, [50, -50]);

    return (
        <motion.div
            className="absolute"
            style={{
                top: y,
                [side]: inset,
                width: size,
                height: size,
                ...(still ? {} : { opacity: appear, scale: appear, rotate, y: drift }),
            }}
        >
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                <ShapeArt type={type} />
            </svg>
        </motion.div>
    );
}

function Thread({ d, stroke, width, length, still }) {
    return (
        <motion.path
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={width}
            strokeLinecap="round"
            style={still ? undefined : { pathLength: length }}
        />
    );
}

export default function ScrollArt() {
    const rootRef = useRef(null);
    const [size, setSize] = useState({ height: 0, viewport: 0 });
    const reduceMotion = useReducedMotion();
    const { scrollY } = useScroll();

    useEffect(() => {
        const page = rootRef.current.parentElement;
        const measure = () =>
            setSize({ height: page.offsetHeight, viewport: window.innerHeight });

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(page);
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    // Whole segments keep the drawn path stable while a role expands on the timeline.
    const segments = Math.ceil(size.height / SEGMENT);
    const pathHeight = segments * SEGMENT;

    const metrics = useRef({ pathHeight, viewport: size.viewport });
    metrics.current = { pathHeight, viewport: size.viewport };

    const rawLength = useTransform(scrollY, (value) => {
        const { pathHeight: total, viewport } = metrics.current;
        return total ? Math.min(1, (value + viewport * HEAD_POSITION) / total) : 0;
    });
    const length = useSpring(rawLength, { stiffness: 140, damping: 32, restDelta: 0.0001 });

    const paths = useMemo(
        () => ({
            leftInk: buildPath(pathHeight, 0, 5),
            leftAccent: buildPath(pathHeight, 1, 3),
            rightInk: buildPath(pathHeight, 2, 4),
            rightAccent: buildPath(pathHeight, 3, 3),
        }),
        [pathHeight]
    );

    const shapes = useMemo(() => {
        const list = [];
        for (let i = 0, y = 620; y < size.height - 200; i++, y += SHAPE_SPACING) {
            const type = SHAPE_ORDER[i % SHAPE_ORDER.length];
            list.push({
                type,
                y,
                side: i % 2 === 0 ? 'left' : 'right',
                inset: type === 'orbit' ? -44 : 14 + (i % 3) * 14,
                size: type === 'orbit' ? 150 : 64 + (i % 3) * 12,
                spin: i % 2 === 0 ? 120 : -90,
            });
        }
        return list;
    }, [size.height]);

    return (
        <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            {segments > 0 && (
                <>
                    <svg className="absolute left-0 top-0" width={GUTTER} height={pathHeight}>
                        <Thread d={paths.leftInk} stroke={INK} width={1.25} length={length} still={reduceMotion} />
                        <Thread d={paths.leftAccent} stroke={ACCENT} width={1} length={length} still={reduceMotion} />
                    </svg>
                    <svg className="absolute right-0 top-0 -scale-x-100" width={GUTTER} height={pathHeight}>
                        <Thread d={paths.rightInk} stroke={INK} width={1.25} length={length} still={reduceMotion} />
                        <Thread d={paths.rightAccent} stroke={ACCENT} width={1} length={length} still={reduceMotion} />
                    </svg>
                    {shapes.map((shape) => (
                        <Shape
                            key={`${shape.y}-${size.viewport}`}
                            {...shape}
                            viewport={size.viewport}
                            scrollY={scrollY}
                            still={reduceMotion}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
