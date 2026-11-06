import { cn } from '../lib/utils';

function MenuItem({ link, handleTransition, isActive }) {
    return (
        <li>
            <a
                onClick={(e) => handleTransition(e, link.path)}
                href={link.path}
                data-cursor
                className={cn(
                    "group relative block rounded-full px-3 py-2 font-roboto text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 hover:text-paper focus-visible:text-paper",
                    isActive ? "text-ink" : "text-muted"
                )}
            >
                {/* hover pill */}
                <span
                    aria-hidden
                    className="absolute inset-0 scale-75 rounded-full bg-ink opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:scale-100"
                />
                <span className="relative z-10">{link.name}</span>
                {/* active indicator dot, hidden while the pill is showing */}
                <span
                    className={cn(
                        "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 group-focus-visible:scale-0 group-focus-visible:opacity-0",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )}
                />
            </a>
        </li>
    );
}

export default MenuItem;
