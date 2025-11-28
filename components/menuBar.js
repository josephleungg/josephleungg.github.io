'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";

export default function MenuBar() {
    const [isScrolling, setIsScrolling] = useState(false);

    const links = [
        { path: "#home", name: "Home" },
        { path: "#about", name: "About" },
        { path: "#projects", name: "Projects" },
        { path: "#contact", name: "Contact" }
    ];

    const router = useRouter();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleTransition(e, path) {
        e.preventDefault();

        const body = document.getElementById('content');

        body.classList.add('page-transition');
        await sleep(300);
        
        // For hash links, scroll to the element
        const targetId = path.substring(1); // removes the #
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        await sleep(300);

        body.classList.remove('page-transition');
    }

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('nav');
            const maxScroll = 1000; // Adjust this value as needed
            const scrollY = window.scrollY;
            const opacity = Math.min(scrollY / maxScroll, 0.5);
            const blur = Math.min(scrollY / maxScroll * 3, 2);
            const boxShadow = `0 4px 6px rgba(0, 0, 0, ${opacity * 1})`; // Adjust shadow intensity as needed
            nav.style.backgroundColor = `rgba(14, 4, 18, ${opacity})`;
            nav.style.backdropFilter = `blur(${blur}px)`;
            nav.style.webkitBackdropFilter = `blur(${blur}px)`;
            nav.style.boxShadow = boxShadow;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="flex justify-center items-center py-8 md:py-12">
            <ul className="flex gap-2 md:gap-8">
                <AnimatePresence>
                    {links.map((link, index) => (
                        <MenuItem
                            key={index}
                            link={link}
                            handleTransition={handleTransition}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </nav>
    );
}
