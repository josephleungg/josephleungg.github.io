'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { cn } from '../lib/utils';

const MENU_LINKS = [
    { path: "#home", name: "Home" },
    { path: "#about", name: "About" },
    { path: "#experience", name: "Experience" },
    { path: "#projects", name: "Projects" },
    { path: "#life", name: "Life" },
    { path: "#contact", name: "Contact" }
];

export default function MenuBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(MENU_LINKS[0].path);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Pure smooth-scroll to the target section — single page, no fade/page swap.
    function handleTransition(e, path) {
        e.preventDefault();
        const targetId = path.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(path);
        setIsMobileMenuOpen(false);
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', path);
        }
    }

    useEffect(() => {
        const handleScrollState = () => setIsScrolled(window.scrollY > 12);
        handleScrollState();
        window.addEventListener('scroll', handleScrollState);
        return () => window.removeEventListener('scroll', handleScrollState);
    }, []);

    // Scroll-spy: highlight the section closest to the top-third of the viewport.
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const sections = MENU_LINKS
            .map((link) => ({ path: link.path, element: document.getElementById(link.path.replace('#', '')) }))
            .filter((item) => item.element);

        if (!sections.length) return;

        const getClosestSection = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.35;
            let closestPath = sections[0].path;
            let minDistance = Infinity;

            sections.forEach(({ path, element }) => {
                if (!element) return;
                const distance = Math.abs(scrollPos - element.offsetTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPath = path;
                }
            });

            setActiveSection((prev) => (prev === closestPath ? prev : closestPath));
        };

        const throttledScroll = () => window.requestAnimationFrame(getClosestSection);

        getClosestSection();
        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('resize', throttledScroll);
        };
    }, []);

    return (
        <nav className="sticky top-4 z-40 mt-4 flex w-full justify-center px-4">
            <div
                className={cn(
                    "flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border px-5 py-2.5 transition-all duration-300",
                    isScrolled
                        ? "border-line bg-paper/85 shadow-[0_8px_30px_rgba(15,15,15,0.06)] backdrop-blur-xl"
                        : "border-transparent bg-paper/50 backdrop-blur-md"
                )}
            >
                <a
                    href="#home"
                    onClick={(e) => handleTransition(e, "#home")}
                    data-cursor
                    className="font-grotesk text-sm font-bold tracking-tight text-ink transition-colors hover:text-accent"
                >
                    JL<span className="text-accent">.</span>
                </a>

                {/* Desktop menu */}
                <ul className="hidden items-center gap-1 md:flex">
                    {MENU_LINKS.map((link) => (
                        <MenuItem
                            key={link.path}
                            link={link}
                            handleTransition={handleTransition}
                            isActive={activeSection === link.path}
                        />
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    data-cursor
                    className="flex h-8 w-8 flex-col items-center justify-center space-y-1.5 md:hidden"
                    aria-label="Toggle menu"
                >
                    <span className={cn("block h-0.5 w-6 bg-ink transition-all duration-300", isMobileMenuOpen && "translate-y-2 rotate-45")} />
                    <span className={cn("block h-0.5 w-6 bg-ink transition-all duration-300", isMobileMenuOpen && "opacity-0")} />
                    <span className={cn("block h-0.5 w-6 bg-ink transition-all duration-300", isMobileMenuOpen && "-translate-y-2 -rotate-45")} />
                </button>
            </div>

            {/* Mobile dropdown */}
            <div
                className={cn(
                    "absolute left-4 right-4 top-16 origin-top overflow-hidden rounded-3xl border border-line bg-paper/95 shadow-[0_8px_30px_rgba(15,15,15,0.08)] backdrop-blur-xl transition-all duration-300 md:hidden",
                    isMobileMenuOpen ? "scale-y-100 opacity-100" : "pointer-events-none -translate-y-4 scale-y-0 opacity-0"
                )}
            >
                <ul className="flex flex-col py-3">
                    {MENU_LINKS.map((link, index) => (
                        <li
                            key={link.path}
                            style={{
                                transitionDelay: isMobileMenuOpen ? `${index * 40}ms` : '0ms',
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-16px)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <a
                                onClick={(e) => handleTransition(e, link.path)}
                                href={link.path}
                                className={cn(
                                    "mx-3 block rounded-full px-5 py-2.5 font-roboto text-xs uppercase tracking-[0.2em] transition-colors duration-300",
                                    activeSection === link.path ? "bg-ink/5 text-ink" : "text-muted hover:bg-ink/5 hover:text-ink"
                                )}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
