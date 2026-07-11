'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { experiences } from '../../lib/data';

// Company logo with a clean monogram fallback (logo images are optional).
function CompanyLogo({ exp }) {
    const [errored, setErrored] = useState(false);
    const initials = exp.short || exp.company.slice(0, 2).toUpperCase();

    if (exp.logo && !errored) {
        return (
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white">
                <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    fill
                    sizes="48px"
                    className="object-contain p-2"
                    onError={() => setErrored(true)}
                />
            </div>
        );
    }

    return (
        <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-grotesk text-sm font-bold text-white"
            style={{ backgroundColor: exp.accent || '#0f0f0f' }}
        >
            {initials}
        </div>
    );
}

export default function Experience() {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col justify-center px-6 py-24 sm:px-8 sm:py-28 md:px-24 lg:px-32">
            <p className="eyebrow mb-4">02 — Experience</p>
            <h2 className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl">
                Where I&apos;ve worked
            </h2>
            <p className="mt-4 max-w-lg font-inter text-muted">
                My professional journey so far — hover (or tap) a role to see the details.
            </p>

            {/* Timeline */}
            <div className="relative mt-14 pl-6 md:pl-10">
                {/* vertical rail */}
                <span className="absolute left-0 top-2 h-full w-px bg-line md:left-2" />

                <div className="flex flex-col gap-2">
                    {experiences.map((exp, i) => {
                        const isActive = active === i;
                        return (
                            <div
                                key={`${exp.company}-${i}`}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => setActive(isActive ? -1 : i)}
                                data-cursor
                                className="group relative"
                            >
                                {/* node dot */}
                                <span
                                    className={`absolute -left-6 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-paper transition-all duration-300 md:-left-8 ${isActive ? 'scale-125 bg-accent' : 'bg-ink/30 group-hover:bg-ink'}`}
                                />

                                <div className={`rounded-2xl border px-5 py-4 transition-all duration-300 ${isActive ? 'border-line bg-surface shadow-[0_10px_40px_rgba(15,15,15,0.06)]' : 'border-transparent hover:border-line'}`}>
                                    {/* always-visible header row */}
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h3 className={`font-grotesk text-xl font-semibold tracking-tight transition-colors md:text-2xl ${isActive ? 'text-ink' : 'text-ink/70 group-hover:text-ink'}`}>
                                            {exp.title}
                                        </h3>
                                        <span className="font-roboto text-xs uppercase tracking-[0.15em] text-muted">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="mt-1 font-inter text-sm text-muted">
                                        {exp.company} · {exp.location}
                                    </p>

                                    {/* expanding detail card */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-5 flex flex-col gap-5 border-t border-line pt-5 md:flex-row md:items-start md:gap-6">
                                                    <CompanyLogo exp={exp} />
                                                    <div className="flex-1">
                                                        <ul className="flex flex-col gap-2">
                                                            {exp.description.map((point, idx) => (
                                                                <li key={idx} className="flex gap-3 font-inter text-sm leading-relaxed text-muted">
                                                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {exp.skills.map((skill) => (
                                                                <span
                                                                    key={skill}
                                                                    className="rounded-full border border-line px-3 py-1 font-roboto text-[11px] text-ink/70"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
