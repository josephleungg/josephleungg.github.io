'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { cn } from '../lib/utils';

const MENU_LINKS = [
    { path: "#home", name: "Home" },
    { path: "#about", name: "About" },
    { path: "#projects", name: "Projects" },
    { path: "#contact", name: "Contact" }
];

export default function MenuBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(MENU_LINKS[0].path);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleTransition(e, path) {
        e.preventDefault();

        const body = document.getElementById('content');

        body?.classList.add('page-transition');
        await sleep(300);
        
        // For hash links, scroll to the element
        const targetId = path.substring(1); // removes the #
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(path);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', path);
        }
        
        await sleep(300);

        body?.classList.remove('page-transition');
    }

    useEffect(() => {
        const handleScrollState = () => {
            setIsScrolled(window.scrollY > 12);
        };

        handleScrollState();
        window.addEventListener('scroll', handleScrollState);

        return () => {
            window.removeEventListener('scroll', handleScrollState);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const sections = MENU_LINKS.map((link) => ({
            path: link.path,
            element: document.getElementById(link.path.replace('#', '')),
        })).filter((item) => item.element);

        if (!sections.length) return;

        const getClosestSection = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.35;
            let closestPath = sections[0].path;
            let minDistance = Infinity;

            sections.forEach(({ path, element }) => {
                if (!element) return;
                const elementTop = element.offsetTop;
                const distance = Math.abs(scrollPos - elementTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPath = path;
                }
            });

            setActiveSection((prev) => (prev === closestPath ? prev : closestPath));
        };

        const throttledScroll = () => {
            if (typeof window === 'undefined') return;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(getClosestSection);
            } else {
                getClosestSection();
            }
        };

        getClosestSection();
        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', throttledScroll);

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('resize', throttledScroll);
        };
    }, []);

    return (
        <nav className="sticky top-8 z-50 mt-4 flex w-full justify-center px-4">
            <div
                className={cn(
                    "flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border px-6 py-3 transition-all duration-300",
                    isScrolled
                        ? "bg-slate-950/80 border-white/15 shadow-2xl shadow-black/20 backdrop-blur-xl"
                        : "bg-slate-900/50 border-white/5 backdrop-blur-md"
                )}
            >
                <a
                    href="#home"
                    onClick={(e) => handleTransition(e, "#home")}
                    className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-200 hover:text-white transition-colors"
                >
                    Joseph Leung
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex flex-1 items-center justify-end gap-1 text-xs md:text-sm">
                    {MENU_LINKS.map((link) => (
                        <MenuItem
                            key={link.path}
                            link={link}
                            handleTransition={handleTransition}
                            isActive={activeSection === link.path}
                        />
                    ))}
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-slate-200 transition-all duration-300",
                            isMobileMenuOpen && "rotate-45 translate-y-2"
                        )}
                    ></span>
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-slate-200 transition-all duration-300",
                            isMobileMenuOpen && "opacity-0"
                        )}
                    ></span>
                    <span
                        className={cn(
                            "block w-6 h-0.5 bg-slate-200 transition-all duration-300",
                            isMobileMenuOpen && "-rotate-45 -translate-y-2"
                        )}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={cn(
                    "md:hidden absolute top-20 left-4 right-4 rounded-3xl border overflow-hidden transition-all duration-300 origin-top",
                    isScrolled
                        ? "bg-slate-950/95 border-white/15 shadow-2xl shadow-black/20 backdrop-blur-xl"
                        : "bg-slate-900/95 border-white/5 backdrop-blur-md",
                    isMobileMenuOpen
                        ? "opacity-100 scale-y-100 translate-y-0"
                        : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
                )}
            >
                <ul className="flex flex-col py-4">
                    {MENU_LINKS.map((link, index) => (
                        <li
                            key={link.path}
                            className="transition-all duration-300"
                            style={{
                                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                            }}
                        >
                            <a
                                onClick={(e) => handleTransition(e, link.path)}
                                href={link.path}
                                className={cn(
                                    "group relative block overflow-hidden rounded-full px-6 py-3 mx-4 text-sm font-medium uppercase tracking-wide transition-colors duration-300",
                                    activeSection === link.path ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span className="relative z-10">{link.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
