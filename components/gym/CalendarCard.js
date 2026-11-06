'use client';
import React from 'react';
import { useHevy } from './hevy-data';
import { LABEL_CLASS, formatDate } from './format';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const RECENT_COUNT = 3;
const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function monthLayout(month) {
    const [year, monthNumber] = month.split('-').map(Number);
    return {
        leadingBlanks: new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay(),
        dayCount: new Date(Date.UTC(year, monthNumber, 0)).getUTCDate(),
    };
}

function MonthGrid({ month, workouts, selectedDate, onSelectDate }) {
    const { leadingBlanks, dayCount } = monthLayout(month);
    const workoutDates = new Set(workouts.map((workout) => workout.date));

    return (
        <div>
            <p className="mb-2 font-grotesk text-sm font-medium text-ink">
                {formatDate(`${month}-01`, { month: 'long', year: 'numeric' })}
            </p>
            <div className="grid grid-cols-7 justify-items-center gap-y-1">
                {WEEKDAYS.map((day, index) => (
                    <span key={index} aria-hidden className="font-roboto text-[9px] text-muted">
                        {day}
                    </span>
                ))}
                {Array.from({ length: leadingBlanks }, (_, index) => (
                    <span key={`blank-${index}`} />
                ))}
                {Array.from({ length: dayCount }, (_, index) => {
                    const day = index + 1;
                    const date = `${month}-${String(day).padStart(2, '0')}`;

                    if (!workoutDates.has(date)) {
                        return (
                            <span key={date} className="flex h-7 w-7 items-center justify-center font-inter text-xs text-muted">
                                {day}
                            </span>
                        );
                    }

                    const isSelected = date === selectedDate;
                    return (
                        <button
                            key={date}
                            type="button"
                            data-cursor
                            aria-pressed={isSelected}
                            aria-label={`Show workout from ${formatDate(date, { month: 'long', day: 'numeric' })}`}
                            onClick={() => onSelectDate(date)}
                            className={`flex h-7 w-7 items-center justify-center rounded-full font-inter text-xs font-medium text-white transition-colors ${FOCUS_RING} ${isSelected ? 'bg-ink' : 'bg-accent hover:bg-ink'}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function WorkoutList({ heading, workouts, selectedId, onSelect, showDate }) {
    return (
        <div>
            <p className="mb-1.5 font-roboto text-[9px] uppercase tracking-[0.2em] text-muted">{heading}</p>
            <ul className="flex flex-col gap-1">
                {workouts.map((workout) => {
                    const isSelected = workout.id === selectedId;
                    return (
                        <li key={workout.id}>
                            <button
                                type="button"
                                data-cursor
                                aria-pressed={isSelected}
                                onClick={() => onSelect(workout.id)}
                                className={`flex w-full items-baseline gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-colors ${FOCUS_RING} ${isSelected ? 'border-accent' : 'border-line hover:border-ink/30'}`}
                            >
                                {showDate && (
                                    <span className={`shrink-0 font-roboto text-[10px] ${isSelected ? 'text-accent' : 'text-muted'}`}>
                                        {formatDate(workout.date, { month: 'short', day: 'numeric' })}
                                    </span>
                                )}
                                <span className="min-w-0 truncate font-inter text-xs text-ink">{workout.title}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function CalendarCard() {
    const { status, month, workouts, selected, select } = useHevy();

    const selectDate = (date) => select(workouts.find((workout) => workout.date === date).id);
    const sameDay = workouts.filter((workout) => workout.date === selected?.date);

    return (
        <div className="flex h-full min-h-0 flex-col">
            <span className={`${LABEL_CLASS} mb-3`}>Gym Calendar</span>

            {status === 'loading' && <div aria-hidden className="min-h-40 flex-1 animate-pulse rounded-xl bg-line/60" />}
            {status === 'failed' && <p className="font-inter text-sm text-muted">Calendar is unavailable right now.</p>}

            {status === 'ready' && (
                <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto md:grid md:grid-cols-2 md:gap-6 lg:flex lg:gap-4">
                    <MonthGrid month={month} workouts={workouts} selectedDate={selected?.date} onSelectDate={selectDate} />
                    {workouts.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <WorkoutList
                                heading="Recent"
                                workouts={workouts.slice(0, RECENT_COUNT)}
                                selectedId={selected?.id}
                                onSelect={select}
                                showDate
                            />
                            {sameDay.length > 1 && (
                                <WorkoutList heading="Same day" workouts={sameDay} selectedId={selected?.id} onSelect={select} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
