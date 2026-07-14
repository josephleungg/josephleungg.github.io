'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../lib/utils';

function ProjectLinks({ project }) {
    return (
        <div className="flex gap-3">
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-roboto text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
                GitHub ↗
            </a>
            {project.demo && (
                <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-roboto text-[11px] uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
                >
                    Demo ↗
                </a>
            )}
        </div>
    );
}

function PreviewCard({ project }) {
    const openGithub = () => window.open(project.github, '_blank', 'noopener,noreferrer');

    return (
        <div
            role="link"
            tabIndex={0}
            data-cursor
            onClick={openGithub}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openGithub())}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_60px_rgba(15,15,15,0.08)] transition-colors hover:border-ink/30"
        >
            <div className="relative aspect-[16/10] w-full bg-paper">
                <Image
                    key={project.image}
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-paper/90 px-3 py-1 font-roboto text-[10px] uppercase tracking-[0.15em] text-ink backdrop-blur">
                    {project.finished ? 'Completed' : 'In Development'}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-ink/90 px-3 py-1 font-roboto text-[10px] uppercase tracking-[0.15em] text-paper opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    View project ↗
                </span>
            </div>
            <div className="p-6">
                <h3 className="font-grotesk text-2xl font-semibold tracking-tight text-ink">{project.title}</h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 font-roboto text-[11px] text-ink/70">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="mt-6">
                    <ProjectLinks project={project} />
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const [active, setActive] = useState(-1);
    const [openMobile, setOpenMobile] = useState(-1);

    return (
        <div className="flex flex-col justify-center px-6 py-24 sm:px-8 sm:py-28 md:px-24 lg:px-32">
            <p className="eyebrow mb-4">03 — Projects</p>
            <h2 className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl">
                Things I&apos;ve built
            </h2>
            <p className="mt-4 max-w-lg font-inter text-muted">
                A selection of featured projects — hover a title to preview it.
            </p>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_460px] lg:items-start" onMouseLeave={() => setActive(-1)}>
                {/* left: the list */}
                <div className="flex flex-col">
                    {projects.map((project, i) => {
                        const isActive = active === i;
                        const isOpen = openMobile === i;
                        return (
                            <div key={project.title} className="border-b border-line">
                                <div
                                    onMouseEnter={() => setActive(i)}
                                    onClick={() => setOpenMobile(isOpen ? -1 : i)}
                                    data-cursor
                                    className="group flex items-center justify-between gap-4 py-6"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-roboto text-xs text-muted">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h3 className={`font-grotesk text-2xl font-semibold tracking-tight transition-colors md:text-3xl ${isActive ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
                                                {project.title}
                                            </h3>
                                            <p className="mt-1 font-inter text-sm text-muted">{project.subtitle}</p>
                                        </div>
                                    </div>
                                    <span className={`hidden shrink-0 font-grotesk text-xl transition-all duration-300 lg:block ${isActive ? 'translate-x-0 text-accent opacity-100' : '-translate-x-2 opacity-0'}`}>
                                        →
                                    </span>
                                    <span className="font-grotesk text-xl text-muted transition-transform duration-300 lg:hidden" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                                        +
                                    </span>
                                </div>

                                {/* mobile inline expansion */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden lg:hidden"
                                        >
                                            <div className="pb-6">
                                                <PreviewCard project={project} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* right: sticky preview (desktop only) */}
                <div className="hidden lg:block">
                    <div className="sticky top-28">
                        {active === -1 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-line"
                            >
                                <p className="font-roboto text-[11px] uppercase tracking-[0.2em] text-muted">
                                    Hover a title to preview
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={active}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <PreviewCard project={projects[active]} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
