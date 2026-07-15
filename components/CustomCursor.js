'use client';
import React, { useEffect, useRef, useState } from 'react';

// Number of segments in the trailing tail (head + ghosts).
const TRAIL = 8;

/**
 * A black "X" cursor with a smooth 60Hz trailing effect.
 * - The head X tracks the mouse tightly; each trailing X chases the one ahead
 *   of it, producing a fading tail that updates every animation frame (~60Hz).
 * - Grows/tints red when hovering interactive elements.
 * - The rAF loop idles when the mouse is still (perf + battery).
 * - Disabled on coarse-pointer / touch devices (native cursor stays).
 */
export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const nodeRefs = useRef([]);
    const target = useRef({ x: -100, y: -100 });
    const points = useRef(
        Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))
    );
    const hovering = useRef(false);
    const down = useRef(false);
    const raf = useRef(null);
    const running = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        setEnabled(true);

        const lerp = (a, b, n) => a + (b - a) * n;

        const tick = () => {
            const pts = points.current;
            // head chases the mouse quickly
            pts[0].x = lerp(pts[0].x, target.current.x, 0.4);
            pts[0].y = lerp(pts[0].y, target.current.y, 0.4);
            // each following node chases the node ahead of it → trailing tail
            for (let i = 1; i < pts.length; i++) {
                pts[i].x = lerp(pts[i].x, pts[i - 1].x, 0.4);
                pts[i].y = lerp(pts[i].y, pts[i - 1].y, 0.4);
            }

            const hov = hovering.current;
            const press = down.current;

            for (let i = 0; i < pts.length; i++) {
                const el = nodeRefs.current[i];
                if (!el) continue;
                const headScale = press ? 0.8 : 1;
                const scale = (1 - i / (TRAIL * 1.6)) * (i === 0 && hov ? 1.6 : 1) * headScale;
                el.style.transform =
                    `translate3d(${pts[i].x}px, ${pts[i].y}px, 0) translate(-50%, -50%) rotate(45deg) scale(${scale})`;
                el.style.opacity = `${(1 - i / TRAIL) * (i === 0 ? 1 : 0.7)}`;
                if (i === 0) el.style.color = hov ? '#ff4655' : '#0f0f0f';
            }

            // idle check — stop when the whole tail has caught up to the mouse
            const headDx = target.current.x - pts[0].x;
            const headDy = target.current.y - pts[0].y;
            const tail = pts[pts.length - 1];
            const tailDx = pts[0].x - tail.x;
            const tailDy = pts[0].y - tail.y;
            if (headDx * headDx + headDy * headDy < 0.02 && tailDx * tailDx + tailDy * tailDy < 0.02) {
                running.current = false;
                return;
            }
            raf.current = requestAnimationFrame(tick);
        };

        const startLoop = () => {
            if (running.current) return;
            running.current = true;
            raf.current = requestAnimationFrame(tick);
        };

        const onMove = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            startLoop();
        };
        const interactiveSel = 'a, button, input, textarea, select, label, [data-cursor], [role="button"]';
        const onOver = (e) => {
            hovering.current = !!(e.target.closest && e.target.closest(interactiveSel));
            startLoop();
        };
        const onDown = () => { down.current = true; startLoop(); };
        const onUp = () => { down.current = false; startLoop(); };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            if (raf.current) cancelAnimationFrame(raf.current);
            running.current = false;
        };
    }, []);

    if (!enabled) return null;

    // Each node is an "X": two crossed bars. The wrapper is rotated 45° in the
    // transform, so a "+" of two bars renders on screen as an "×".
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
            {Array.from({ length: TRAIL }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (nodeRefs.current[i] = el)}
                    className="absolute left-0 top-0 h-4 w-4 will-change-transform text-ink"
                >
                    {/* horizontal bar */}
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current" />
                    {/* vertical bar */}
                    <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-current" />
                </div>
            ))}
        </div>
    );
}
