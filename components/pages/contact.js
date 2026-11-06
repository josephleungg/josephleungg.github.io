'use client';
import React, { useRef } from 'react';
import ScrollFade from '../ScrollFade';

const links = [
    { label: "LinkedIn", handle: "in/josephleung1", href: "https://www.linkedin.com/in/josephleung1/" },
    { label: "GitHub", handle: "@josephleungg", href: "https://github.com/josephleungg" },
];

export default function Contact() {
    const linksRef = useRef(null);

    return (
        <div className="flex min-h-screen flex-col justify-between px-6 pb-10 pt-24 sm:px-8 sm:pt-28 md:px-24 lg:px-32">
            <div className="flex flex-1 flex-col justify-center">
                <ScrollFade>
                    <p className="eyebrow mb-4">Contact</p>
                </ScrollFade>

                <ScrollFade>
                    <h2 className="font-grotesk text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
                        Let&apos;s build<br />something
                        <span className="text-accent">.</span>
                    </h2>
                </ScrollFade>

                <ScrollFade>
                    <p className="mt-6 max-w-md font-inter text-muted">
                        Open to new grad roles, collaborations, or just a chat. Reach me anywhere below.
                    </p>
                </ScrollFade>

                <div ref={linksRef}>
                    <ScrollFade anchorRef={linksRef} end={0.7}>
                        <div className="mt-12 flex flex-col divide-y divide-line border-y border-line">
                            {links.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor
                                    className="group flex items-center justify-between gap-4 py-5 transition-colors"
                                >
                                    <span className="font-grotesk text-2xl font-semibold text-ink transition-colors group-hover:text-accent md:text-3xl">
                                        {l.label}
                                    </span>
                                    <span className="flex items-center gap-3 font-roboto text-sm text-muted">
                                        {l.handle}
                                        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">↗</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </ScrollFade>
                </div>
            </div>

            {/* The footer sits too low to reach the trigger point, so the links drive it. */}
            <ScrollFade anchorRef={linksRef} end={0.7} delay={0.2}>
                <footer className="mt-16 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 font-roboto text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row">
                    <span>© {new Date().getFullYear()} Joseph Leung</span>
                </footer>
            </ScrollFade>
        </div>
    );
}
