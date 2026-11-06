'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ScrollFade from '../ScrollFade';
import { experiences } from '../../lib/data';

const STICK_TOP = 96;
const PEEK = 12; // how much of each buried card stays visible
const SHRINK = 0.025;
const LANDING_TILT = 1.2;
const GAP = 20; // space between cards

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

    const wrapperRef = useRef(null);
    const clipRef = useRef(null);
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    const spacerRef = useRef(null);
    const revealOnOpen = useRef(false);
    const [rolled, setRolled] = useState(false);
    const expanded = isOpen && !rolled;

    // The next card rolls this one up as it climbs and unravels it as it drops back, so the
    // panel only ever fills the room left above that card. The spacer takes the hidden height:
    // inside the sticky wrapper it would shove the card off the top of the pile at the deck's end.
    // Returns how much further the next card must drop for the panel to show in full.
    const syncRoll = () => {
        const wrapper = wrapperRef.current;
        const panel = panelRef.current;
        const next = spacerRef.current?.nextElementSibling;
        if (!panel || !next) return 0;

        const height = panel.offsetHeight;
        const chrome = wrapper.offsetHeight - clipRef.current.offsetHeight;
        const room = next.getBoundingClientRect().top - wrapper.getBoundingClientRect().top - chrome - GAP;
        const visible = Math.max(0, Math.min(room, height));

        // A card taller than the screen scrolls its content into view before it rolls up,
        // otherwise the end of it would be hidden before it was ever on screen.
        const overflow = Math.max(0, STICK_TOP + index * PEEK + chrome + height + GAP - window.innerHeight);
        const shift = Math.min(height - visible, overflow);

        clipRef.current.style.maxHeight = visible < height ? `${visible}px` : '';
        contentRef.current.style.transform = shift ? `translateY(${-shift}px)` : '';
        spacerRef.current.style.height = `${GAP + height - visible}px`;
        setRolled(height > 0 && visible === 0);
        return height - room;
    };

    useMotionValueEvent(progress, 'change', syncRoll);

    const reveal = () => {
        const missing = syncRoll();
        if (missing > 1) window.scrollBy({ top: -missing });
    };

    const handleClick = () => {
        if (isOpen && rolled) {
            reveal();
            return;
        }
        if (!isOpen) revealOnOpen.current = true;
        onToggle();
    };

    const resetRoll = () => {
        if (clipRef.current) clipRef.current.style.maxHeight = '';
        if (spacerRef.current) spacerRef.current.style.height = `${GAP}px`;
        setRolled(false);
    };

    return (
        <>
            <div ref={wrapperRef} className="sticky" style={{ top: STICK_TOP + index * PEEK }}>
                <motion.article
                    style={still ? undefined : { scale, rotate, opacity }}
                    className="origin-top rounded-2xl"
                >
                    {/* Separate layer: the scroll animation owns the transform on the element above. */}
                    <div className="group/card rounded-2xl border border-line bg-surface shadow-[0_-8px_30px_rgba(15,15,15,0.05)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_18px_40px_rgba(15,15,15,0.12)]">
                        <button
                            type="button"
                            onClick={handleClick}
                            aria-expanded={expanded}
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
                                style={{ transform: expanded ? 'rotate(45deg)' : 'none' }}
                            >
                                +
                            </span>
                        </button>

                        <div ref={clipRef} className="overflow-hidden">
                            <AnimatePresence initial={false} onExitComplete={resetRoll}>
                                {isOpen && (
                                    <motion.div
                                        ref={panelRef}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        onUpdate={syncRoll}
                                        onAnimationComplete={() => {
                                            if (!revealOnOpen.current) return;
                                            revealOnOpen.current = false;
                                            reveal();
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div ref={contentRef} className="mx-5 border-t border-line pb-5 pt-4 md:mx-6 md:pb-6 md:pl-[4.25rem]">
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
                    </div>
                </motion.article>
            </div>
            {index < last && <div ref={spacerRef} aria-hidden style={{ height: GAP }} />}
        </>
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

            <div ref={deckRef} className="mt-12 flex flex-col">
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
