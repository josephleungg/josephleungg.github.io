import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { usePathname } from "next/navigation";

function MenuItem({ link, handleTransition }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const textX = useTransform(x, (latest) => latest * 0.5);
    const textY = useTransform(y, (latest) => latest * 0.5);

    const pathname = usePathname();
    const MotionLink = motion(Link);

    const setTransform = (item, event, x, y) => {
        const bounds = item.getBoundingClientRect();
        const relativeX = event.clientX - bounds.left;
        const relativeY = event.clientY - bounds.top;
        const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
        const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
        x.set(xRange * 10);
        y.set(yRange * 10);
    };

    return (
        <motion.li
            onPointerMove={(event) => {
                const item = event.currentTarget;
                setTransform(item, event, x, y);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{ x, y }}
        >
            <MotionLink
                onClick={(e) => handleTransition(e, link.path)}
                href={link.path}
                className={cn(
                    "relative font-roboto font-medium rounded-lg text-sm md:text-base py-2 px-4 transition-all duration-500 ease-out hover:bg-menuColor",
                    pathname === link.path ? "font-extrabold text-secondary" : "hover-text-glow"
                )}
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
                    />
                ) : null}
            </MotionLink>
        </motion.li>
    );
}

export default MenuItem;
