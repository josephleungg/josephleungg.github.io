'use client';
import react, { useState } from 'react';
import Link from 'next/link';

export default function MenuBar() {
    const tabs = ["Home", "About"];
    const pages = ["Projects", "Contact"];
    const tabLinks = ["/", "#about"];
    const pageLinks = ["projects", "contact"];

    return (
        <>
            <div className="space-x-8 p-4 text-sm min-h-full flex justify-center items-end bg-menuColor bg-opacity-50 backdrop-blur-md glow-shadow md:hidden">
                {tabs.map((tab, index) => (
                    <a key={index} className="hover-text-glow hover-flicker-underline" href={tabLinks[index]}>{tab}</a>
                ))}
                {pages.map((page, index) => (
                    <Link key={index} href={pageLinks[index]}>
                        <p className="hover-text-glow hover-flicker-underline">{page}</p>
                    </Link>
                ))}
            </div>

            <div className="invisible md:visible text-sm lg:text-base flex flex-col pt-12 bg-menuColor shadow-md min-w-full min-h-full">
                <div className="flex flex-col space-y-6 pl-6 pb-12">
                    {tabs.map((tab, index) => (
                        <a key={index} className="hover-text-glow hover-flicker-underline" href={tabLinks[index]}>{tab}</a>
                    ))}
                    {pages.map((page, index) => (
                    <Link key={index} href={pageLinks[index]}>
                        <p className="hover-text-glow hover-flicker-underline">{page}</p>
                    </Link>
                    ))}
                </div>

                <hr className="opacity-30" />
            </div>
        </>
    );
}