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
                    className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-200"
                >
                    Joseph Leung
                </a>
                <ul className="flex flex-1 items-center justify-end gap-1 text-xs md:text-sm">
                    {MENU_LINKS.map((link) => (
                        <MenuItem
                            key={link.path}
                            link={link}
                            handleTransition={handleTransition}
                            isActive={activeSection === link.path}
                        />
                    ))}
                </ul>
            </div>
        </nav>
    );
}
