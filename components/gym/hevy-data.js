'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_HEVY_URL || '';
const HevyContext = createContext(null);

export const photoUrl = (path) => `${BASE_URL}/${path}`;

export function HevyProvider({ children }) {
    const [status, setStatus] = useState('loading');
    const [data, setData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch(`${BASE_URL}/hevy.json`, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`Status ${response.status}`);
                return response.json();
            })
            .then((json) => {
                setData(json);
                setSelectedId(json.workouts[0]?.id ?? null);
                setStatus('ready');
            })
            .catch((error) => {
                if (error.name !== 'AbortError') setStatus('failed');
            });
        return () => controller.abort();
    }, []);

    const value = useMemo(() => {
        const workouts = data?.workouts ?? [];
        return {
            status,
            month: data?.month ?? null,
            workouts,
            selected: workouts.find((workout) => workout.id === selectedId) ?? null,
            select: setSelectedId,
        };
    }, [status, data, selectedId]);

    return <HevyContext.Provider value={value}>{children}</HevyContext.Provider>;
}

export function useHevy() {
    const context = useContext(HevyContext);
    if (!context) throw new Error('useHevy must be used inside HevyProvider.');
    return context;
}
