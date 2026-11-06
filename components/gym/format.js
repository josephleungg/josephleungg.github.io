export const LABEL_CLASS = 'font-roboto text-[10px] uppercase tracking-[0.25em] text-muted';

// Dates are plain calendar days, so UTC keeps them from shifting with the viewer's timezone.
export function formatDate(date, options) {
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...options }).format(new Date(`${date}T00:00:00Z`));
}

// "16:46" -> "4:46 p.m."
export function formatTime(value) {
    const [hours, minutes] = value.split(':').map(Number);
    return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'p.m.' : 'a.m.'}`;
}

export function formatRest(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return [minutes && `${minutes}m`, rest && `${rest}s`].filter(Boolean).join(' ');
}
