'use client';
import React from 'react';
import Link from 'next/link'
import { useRouter, usePathname } from "next/navigation"
import { cn } from '../../lib/utils';
import { motion, useMotionValue, AnimatePresence, useTransform } from 'framer-motion';

export default function MenuBar() {
    const links = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/about",
            name: "About"
        },
        {
            path: "/projects",
            name: "Projects"
        },
        {
            path: "/contact",
            name: "Contact"
        }
    ]

    // for the transition animation
    const router = useRouter();

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function handleTransition(e, path) {
      e.preventDefault();
  
      const body = document.getElementById('content');
  
      body.classList.add('page-transition');
  
      await sleep(300);
  
      router.push(path);
  
      await sleep(300);
  
      body.classList.remove('page-transition');
    }

    // navbar utils
    const pathname = usePathname();
    const MotionLink = motion(Link);

    const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
        const INPUT_RANGE = inputUpper - inputLower;
        const OUTPUT_RANGE = outputUpper - outputLower;

        return (value) =>
            outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
    }

    const setTransform = (item, event, x, y) => {
        const bounds = item.getBoundingClientRect();
        const relativeX = event.clientX - bounds.left;
        const relativeY = event.clientY - bounds.top;
        const xRange = mapRange(0,bounds.width, -1, 1)(relativeX)
        const yRange = mapRange(0,bounds.height, -1, 1)(relativeY)
        x.set(xRange * 10)
        y.set(yRange * 10)
    }

    return (
        <nav className="p-8">
            <ul className="flex gap-8">
                <AnimatePresence>
                {links.map((link, index) => {
                    const x = useMotionValue(0);
                    const y = useMotionValue(0);
                    const textX = useTransform(x, (latest) => latest * 0.5)
                    const textY = useTransform(y, (latest) => latest * 0.5)

                    return(
                    <motion.li 
                        onPointerMove={(event) => {
                        const item = event.currentTarget;
                        setTransform(item, event, x, y)
                        }} 
                        key={index}
                        onPointerLeave={(event) => {
                            x.set(0);
                            y.set(0);
                        }}
                        style={{x, y}}
                        >
                        <MotionLink
                            onClick={(e) => handleTransition(e, link.path)}
                            href={link.path}
                            className={cn(
                                "relative font-medium rounded-lg text-sm py-2 px-4 transition-all:duration-500 ease-out hover:bg-menuColor",
                                pathname === link.path ? "text-secondary" : "hover-text-glow")}
                            >
                            <motion.span
                                style={{ x: textX, y: textY }}
                                className="z-10 relative"
                            >
                                {link.name}
                            </motion.span>
                            {pathname === link.path ? (
                                <motion.div
                                    transition={{ type: "spring" }}
                                    layoutId="underline"
                                    className="absolute w-full h-full rounded-md left-0 bottom-0 bg-menuColor"
                                >
                                    
                                </motion.div>
                            ) : null}
                        </MotionLink>
                    </motion.li>
                )})}
                </AnimatePresence>
            </ul>
        </nav>
    );
}