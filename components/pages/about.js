'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { skills } from '../../lib/data';

const interests = [
    { src: "/images/car.jpg", label: "Late-night drives", alt: "Blue Toyota GR Supra parked in front of a cherry tree", position: "center 70%" },
    { src: "/images/3-web.jpg", label: "Good food", alt: "Bowl of comforting food" },
    { src: "/images/4-web.jpg", label: "Hiking", alt: "Hiking trail view" },
];

// Wipes open with scroll while the photo drifts inside its frame; hover widens the panel.
function InterestPanel({ interest, index }) {
    const panelRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: panelRef,
        offset: ['start end', 'end start'],
    });

    const wipeStart = 0.05 + index * 0.05;
    const hidden = useTransform(scrollYProgress, [wipeStart, wipeStart + 0.3], [100, 0]);
    const clipPath = useMotionTemplate`inset(${hidden}% 0% 0% 0% round 16px)`;
    const drift = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <figure
            ref={panelRef}
            className="group min-w-0 md:basis-0 md:grow md:transition-[flex-grow] md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:grow-[2]"
        >
            <motion.div
                style={reduceMotion ? { borderRadius: 16 } : { clipPath }}
                className="relative h-64 overflow-hidden md:h-[26rem]"
            >
                <motion.div style={reduceMotion ? undefined : { y: drift }} className="absolute -inset-y-[12%] inset-x-0">
                    <Image
                        src={interest.src}
                        alt={interest.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        style={{ objectPosition: interest.position }}
                    />
                </motion.div>
            </motion.div>
            <figcaption className="mt-3 font-roboto text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-ink">
                {interest.label}
            </figcaption>
        </figure>
    );
}

export default function AboutPage() {
    return (
        <div className="flex flex-col justify-center px-6 pb-24 pt-24 sm:px-8 sm:pb-28 md:px-24 lg:px-32">
            <motion.p
                className="eyebrow mb-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
            >
                About
            </motion.p>

            <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-start">
                {/* left: heading + blurb */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-grotesk text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
                        A little bit<br />about me
                    </h2>
                    <p className="mt-8 max-w-xl font-inter text-base leading-relaxed text-muted md:text-lg">
                        I&apos;m currently a fourth year <span className="font-medium text-ink">Computer Science</span> student
                        attending <span className="font-medium text-ink">Toronto Metropolitan University</span>. Beyond the
                        screen, I find joy in lifting weights, eating, and going on late night drives. I also love to binge
                        shows and play video games whenever I have the time. My interests extend to web design and building
                        software that tackles meaningful real-world problems. I&apos;m always excited to keep learning and
                        developing myself in the tech field.
                    </p>

                    {/* quick facts */}
                    <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-8">
                        {[
                            { k: "Based in", v: "Toronto, ON" },
                            { k: "Focus", v: "Full-Stack Dev" },
                            { k: "School", v: "TMU · CS" },
                            { k: "Currently", v: "Open to work" },
                        ].map((f) => (
                            <div key={f.k}>
                                <p className="font-roboto text-[10px] uppercase tracking-[0.25em] text-muted">{f.k}</p>
                                <p className="mt-1 font-grotesk text-base font-medium text-ink">{f.v}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* right: headshot */}
                <motion.div
                    className="relative mx-auto w-full max-w-sm"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
                        <Image
                            src="/images/1-web.jpg"
                            alt="Headshot of Joseph Leung"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 384px"
                            className="object-cover"
                        />
                    </div>
                    <span className="absolute -bottom-3 -right-3 rounded-full border border-line bg-paper px-4 py-2 font-roboto text-[10px] uppercase tracking-[0.2em] text-ink shadow-sm">
                        that&apos;s me →
                    </span>
                </motion.div>
            </div>

            {/* interests */}
            <div className="mt-20 flex flex-col gap-6 md:flex-row md:gap-3">
                {interests.map((it, i) => (
                    <InterestPanel key={it.label} interest={it} index={i} />
                ))}
            </div>

            {/* skills marquee */}
            <div className="mt-20">
                <p className="eyebrow mb-6">Languages &amp; tools I use</p>
                <div className="relative overflow-hidden border-y border-line py-5">
                    <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
                        {[...skills, ...skills].map((s, i) => (
                            <span
                                key={i}
                                className="font-grotesk text-lg font-medium text-ink/80 md:text-2xl"
                            >
                                {s}
                                <span className="ml-8 text-accent">/</span>
                            </span>
                        ))}
                    </div>
                    {/* fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
                </div>
            </div>
        </div>
    );
}
