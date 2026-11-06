'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ScrollFade from '../ScrollFade';
import { experiences } from '../../lib/data';

const STICK_TOP = 96;
const PEEK = 12; // how much of each buried card stays visible
const SHRINK = 0.025;
const LANDING_TILT = 1.2;

// Company logo with a clean monogram fallback (logo images are optional).
function CompanyLogo({ exp }) {
    const [errored, setErrored] = useState(false);
    const initials = exp.short || exp.company.slice(0, 2).toUpperCase();

    if (exp.logo && !errored) {
        return (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    style={{ transform: `scale(${exp.logoZoom || 1})` }}
                    onError={() => setErrored(true)}
                />
            </div>
        );
    }

    return (
        <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-grotesk text-xs font-bold text-white"
            style={{ backgroundColor: exp.accent || '#0f0f0f' }}
        >
            {initials}
        </div>
    );
}

function DeckCard({ exp, index, total, progress, entry, isOpen, onToggle, still }) {
    const last = total - 1;
    const landed = index / last;

    // A card shrinks as later cards land on it, and sways briefly as it lands itself.
    const scale = useTransform(progress, [landed, 1], [1, 1 - (last - index) * SHRINK]);
    const rotate = useTransform(
        progress,
        [landed - 0.2, landed - 0.1, landed],
        [0, (index % 2 ? 1 : -1) * LANDING_TILT, 0]
    );

    // Sticky cards can't be measured individually, so each fades in at its share of the deck.
    const opacity = useTransform(entry, [index / total, (index + 0.6) / total], [0, 1]);

    return (
        <div className="sticky" style={{ top: STICK_TOP + index * PEEK }}>
            <motion.article
                style={still ? undefined : { scale, rotate, opacity }}
                className="origin-top rounded-2xl"
            >
                {/* Separate layer: the scroll animation owns the transform on the element above. */}
                <div className="group/card rounded-2xl border border-line bg-surface shadow-[0_-8px_30px_rgba(15,15,15,0.05)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_18px_40px_rgba(15,15,15,0.12)]">
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        data-cursor
                        className="group flex w-full items-start gap-4 p-5 text-left md:gap-5 md:p-6"
                    >
                        <span className="shrink-0 transition-transform duration-300 ease-out group-hover/card:-rotate-3 group-hover/card:scale-110">
                            <CompanyLogo exp={exp} />
                        </span>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-grotesk text-base font-semibold tracking-tight text-ink transition-[color,transform] duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:text-accent md:text-xl">
                                {exp.title}
                            </h3>
                            <p className="mt-1 font-roboto text-[11px] uppercase tracking-[0.12em] text-muted">
                                {exp.company} · {exp.duration}
                            </p>
                            <p className="mt-2 max-w-2xl font-inter text-sm leading-relaxed text-muted">
                                {exp.summary}
                            </p>
                        </div>
                        <span
                            className="shrink-0 font-grotesk text-lg text-muted transition-[color,transform] duration-300 group-hover/card:text-accent"
                            style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                        >
                            +
                        </span>
                    </button>

                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="mx-5 border-t border-line pb-5 pt-4 md:mx-6 md:pb-6 md:pl-[4.25rem]">
                                    <ul className="flex flex-col gap-2">
                                        {exp.description.map((point, idx) => (
                                            <li key={idx} className="flex gap-2.5 font-inter text-sm leading-relaxed text-muted">
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.article>
        </div>
    );
}

export default function Experience() {
    const [openIndex, setOpenIndex] = useState(-1);
    const deckRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Runs from the first card sticking to the last card landing on the pile.
    const { scrollYProgress } = useScroll({
        target: deckRef,
        offset: [`start ${STICK_TOP}px`, 'end 340px'],
    });
    const { scrollYProgress: entryProgress } = useScroll({
        target: deckRef,
        offset: ['start end', 'end end'],
    });

    return (
        <div className="flex flex-col justify-center px-6 pb-20 pt-24 sm:px-8 sm:pb-24 md:px-24 lg:px-32">
            <ScrollFade>
                <p className="eyebrow mb-3">Experience</p>
            </ScrollFade>
            <ScrollFade>
                <h2 className="font-grotesk text-3xl font-bold tracking-tight text-ink md:text-5xl">
                    Where I&apos;ve worked
                </h2>
            </ScrollFade>
            <ScrollFade>
                <p className="mt-3 max-w-xl font-inter text-base text-muted">
                    My professional journey so far — click a role for the full story.
                </p>
            </ScrollFade>

            <div ref={deckRef} className="mt-12 flex flex-col gap-5">
                {experiences.map((exp, i) => (
                    <DeckCard
                        key={`${exp.company}-${i}`}
                        exp={exp}
                        index={i}
                        total={experiences.length}
                        progress={scrollYProgress}
                        entry={entryProgress}
                        isOpen={openIndex === i}
                        onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                        still={reduceMotion}
                    />
                ))}
            </div>
        </div>
    );
}
