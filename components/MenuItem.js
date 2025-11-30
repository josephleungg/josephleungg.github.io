import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { useState } from 'react';

function MenuItem({ link, handleTransition, isActive }) {
    const [isHovered, setIsHovered] = useState(false);
    const MotionLink = motion(Link);

    return (
        <li>
            <MotionLink
                onClick={(e) => handleTransition(e, link.path)}
                href={link.path}
                className={cn(
                    "group relative block overflow-hidden rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-300 md:text-sm",
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.span
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={false}
                    animate={{
                        opacity: isActive || isHovered ? 1 : 0,
                        scale: isActive || isHovered ? 1 : 0.9
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <span className="relative z-10">{link.name}</span>
                <motion.span
                    className="absolute inset-x-3 bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scaleX: isHovered ? 1 : 0.5
                    }}
                    style={{ originX: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />
            </MotionLink>
        </li>
    );
}

export default MenuItem;
