'use client';
import react, { useState } from 'react';

export default function MenuBar() {
    const tabs = ["Home", "About", "Projects", "Contact"];
    const tabLinks = ["#home", "#about", "#projects", "#contact"];

    return (
        <>
            <div className="space-x-8 pb-4 text-sm min-h-full flex justify-center items-end absolute inset-0 bg-menuColor bg-opacity-50 backdrop-blur-weak glow-shadow md:hidden">
                {tabs.map((tab, index) => (
                    <a key={index} className="hover-text-glow hover-flicker-underline" href={tabLinks[index]}>{tab}</a>
                ))}
            </div>

            <div className="invisible md:visible md:bg-menuColor md:bg-opacity-50 md:glow-shadow-2 md:min-w-full md:min-h-full">
                {/* Content here */}
            </div>
        </>
    );
}