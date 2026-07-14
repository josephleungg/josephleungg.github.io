import { cn } from '../lib/utils';

function MenuItem({ link, handleTransition, isActive }) {
    return (
        <li>
            <a
                onClick={(e) => handleTransition(e, link.path)}
                href={link.path}
                data-cursor
                className={cn(
                    "relative block px-3 py-2 font-roboto text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                )}
            >
                <span className="relative z-10">{link.name}</span>
                {/* active indicator dot */}
                <span
                    className={cn(
                        "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )}
                />
            </a>
        </li>
    );
}

export default MenuItem;
