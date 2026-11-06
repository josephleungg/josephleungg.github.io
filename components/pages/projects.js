'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { projects } from '../../lib/utils';

const TILE_SIZE = 140;
// Page padding + meta column + gap: the tile stops here so it never covers the links.
const META_RESERVED = 468;
const TILE_OFFSET = 110;
const LARGE_MOUSE = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 220, damping: 26, mass: 0.6 };

const reveal = {
    hidden: { y: '105%' },
    shown: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

const LINK_CLASS =
    'link-underline py-2 font-roboto text-[11px] uppercase tracking-[0.15em] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

function FloatingTile({ index, visible, x, y }) {
    return (
        <motion.div
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        >
            <motion.div
                initial={false}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.8,
                    rotate: visible ? -3 : 4,
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden rounded-full shadow-[0_20px_50px_rgba(15,15,15,0.2)]"
                style={{
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    marginLeft: -TILE_SIZE / 2,
                    marginTop: -TILE_SIZE / 2,
                }}
            >
                <motion.div
                    initial={false}
                    animate={{ y: `${(-index * 100) / projects.length}%` }}
                    transition={{ duration: 0.55, ease: EASE }}
                >
                    {projects.map((project) => (
                        <div key={project.title} className="relative" style={{ height: TILE_SIZE }}>
                            <Image src={project.image} alt="" fill sizes={`${TILE_SIZE}px`} className="object-cover" />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function ProjectRow({ project, dimmed, onPointerEnter, reduceMotion }) {
    return (
        <motion.article
            initial={reduceMotion ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, margin: '-60px' }}
            onPointerEnter={onPointerEnter}
            className={`group grid flex-1 gap-3 border-t border-line py-4 transition-opacity duration-300 last:border-b lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-10 ${dimmed ? 'opacity-30' : ''}`}
        >
            <div>
                <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full lg:[@media(hover:hover)_and_(pointer:fine)]:hidden">
                    <Image src={project.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="overflow-hidden pb-[0.12em]">
                    <motion.h3
                        variants={reveal}
                        className="font-grotesk text-4xl font-bold leading-none tracking-tighter text-ink sm:text-5xl lg:text-[clamp(2.25rem,3.75vw,4rem)]"
                    >
                        <span className="inline-block transition-[transform,color] duration-500 ease-out group-focus-within:translate-x-4 group-focus-within:text-accent group-hover:translate-x-4 group-hover:text-accent">
                            {project.title}
                        </span>
                    </motion.h3>
                </div>
                <p className="mt-0.5 flex flex-wrap items-baseline gap-x-3 font-grotesk text-sm font-medium tracking-tight text-ink">
                    {project.subtitle}
                    <span className="font-roboto text-[10px] font-normal uppercase tracking-[0.2em] text-muted">
                        {project.finished ? 'Completed' : 'In development'}
                    </span>
                </p>
            </div>

            <div>
                <p className="font-inter text-xs leading-relaxed text-muted">
                    {project.description}
                </p>
                <p className="mt-1 font-roboto text-[10px] leading-relaxed text-muted">
                    {project.tech.join(' / ')}
                </p>
                <div className="flex gap-5">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor className={LINK_CLASS}>
                        GitHub ↗
                    </a>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor className={LINK_CLASS}>
                            Demo ↗
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tileVisible, setTileVisible] = useState(false);
    const reduceMotion = useReducedMotion();

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springX = useSpring(pointerX, SPRING);
    const springY = useSpring(pointerY, SPRING);

    const trackPointer = (e) => {
        pointerX.set(Math.min(e.clientX + TILE_OFFSET, window.innerWidth - META_RESERVED - TILE_SIZE / 2));
        pointerY.set(e.clientY);
    };

    const handleRowEnter = (e, index) => {
        if (e.pointerType !== 'mouse' || !window.matchMedia(LARGE_MOUSE).matches) return;
        trackPointer(e);
        // Start at the cursor instead of sweeping in from the last position.
        if (!tileVisible) {
            springX.jump(pointerX.get());
            springY.jump(pointerY.get());
        }
        setActiveIndex(index);
        setTileVisible(true);
    };

    return (
        <div className="flex min-h-screen flex-col px-6 pb-16 pt-24 sm:px-8 md:px-24 lg:px-32">
            <p className="eyebrow mb-3">Projects</p>
            {/* the wrapper observes the viewport: the clipped heading itself never intersects */}
            <motion.div
                initial={reduceMotion ? false : 'hidden'}
                whileInView="shown"
                viewport={{ once: true }}
                className="overflow-hidden pb-[0.12em]"
            >
                <motion.h2
                    variants={reveal}
                    className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl"
                >
                    Things I&apos;ve built
                </motion.h2>
            </motion.div>
            <p className="mt-2 max-w-md font-inter text-sm text-muted">
                A selection of featured projects.
            </p>

            <div
                className="mt-6 flex flex-1 flex-col"
                onPointerMove={(e) => e.pointerType === 'mouse' && trackPointer(e)}
                onPointerLeave={() => setTileVisible(false)}
            >
                {projects.map((project, i) => (
                    <ProjectRow
                        key={project.title}
                        project={project}
                        dimmed={tileVisible && activeIndex !== i}
                        onPointerEnter={(e) => handleRowEnter(e, i)}
                        reduceMotion={reduceMotion}
                    />
                ))}
            </div>

            <FloatingTile
                index={activeIndex}
                visible={tileVisible}
                x={reduceMotion ? pointerX : springX}
                y={reduceMotion ? pointerY : springY}
            />
        </div>
    );
}
