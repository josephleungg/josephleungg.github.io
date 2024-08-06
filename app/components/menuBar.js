import React from 'react';

export default function MenuBar() {
    const tabs = ["Home", "About", "Projects", "Contact"];
    const tabLinks = ["/", "/about", "/projects", "/contact"];

    return (
        <>
            {/* Mobile version */}
            <div className="md:hidden text-sm bg-menuColor flex flex-row justify-center items-center shadow-md w-full h-full">
                <a href="/projects" className="hover-text-glow">test</a>
            </div>

            {/* Desktop version */}
            <div className="hidden md:flex text-sm lg:text-base flex-col pt-12 bg-menuColor min-h-full">
                <div className="flex flex-col space-y-6 pl-6 pb-12">
                    {tabs.map((tab, index) => (
                        <a key={index} href={tabLinks[index]} className="hover-text-glow inline-block">{tab}</a>
                    ))}
                </div>

                <hr className="opacity-30" />
            </div>
        </>
    );
}