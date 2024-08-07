import React from 'react';
import TransitionLink from './utils/TransitionLink'

export default function MenuBar() {

    return (
        <>
            {/* Mobile version */}
            <div className="md:hidden text-sm bg-menuColor flex flex-row justify-center items-center shadow-md w-full h-full">
                <a href="/projects" className="hover-text-glow">test</a>
            </div>

            {/* Desktop version */}
            <div className="hidden md:flex text-sm lg:text-base flex-col pt-12 bg-menuColor min-h-full">
                <div className="flex flex-col space-y-6 pl-6 pb-12">
                    <TransitionLink href="/" className="hover-text-glow inline-block">Home</TransitionLink>
                    <TransitionLink href="/about" className="hover-text-glow inline-block">About</TransitionLink>
                    <TransitionLink href="/projects" className="hover-text-glow inline-block">Projects</TransitionLink>
                    <TransitionLink href="/contact" className="hover-text-glow inline-block">Contact</TransitionLink>
                </div>

                <hr className="opacity-30" />
            </div>
        </>
    );
}