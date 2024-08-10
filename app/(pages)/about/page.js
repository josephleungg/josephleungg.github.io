'use client';
import React from 'react';
import { ChevronDown } from "react-feather"
import ImageCarousel from '../../components/imageCarousel'

export default function AboutPage() {
    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
    ]

    const technologies = [
        // ICONS TAKEN FROM: https://devicon.dev/
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg", "bg-white rounded-3xl"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain-wordmark.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", "bg-white rounded-3xl"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", ""],
    ]

    const tools = [
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "bg-white rounded-3xl"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", ""],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg", "bg-[#E298F2] rounded-xl"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", ""],
    ]

    return(
        <div className="font-roboto">
            {/* about me section */}
            <div className="relative flex flex-col md:flex-row my-32 md:my-0 px-12 md:px-24 gap-24 md:gap-32 min-h-screen">
                
                <div className="flex flex-col md:h-screen md:w-[50%] md:items-left justify-center">
                    <h1 className="text-2xl md:text-3xl font-montserrat font-black italic text-secondary">A LITTLE BIT ABOUT ME</h1>
                    <p className="text-justify text-lg">I'm currently a third year <span className="font-bold text-tertiary">Computer Science </span> 
                        student attending Toronto Metropolitan University! Beyond the screen, I find joy in lifting weights and 
                        going on late night drives, I also love to binge shows and play video games whenever I have the time. 
                        My interests extend to web design and working on software that tackles meaningful real-world problems. 
                        I am always excited to continue learning, and developing myself in the technological field!</p>
                </div>

                <div className="flex md:h-screen md:w-[50%] items-center">
                    <ImageCarousel>
                        {images}
                    </ImageCarousel>
                </div>

                <button
                    onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
                    className="absolute bottom-[-10%] md:bottom-0 left-1/2 transform -translate-x-1/2 mb-4 p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronDown size={30} />
                </button>
                
            </div>

            {/* skills section */}
            <div id="skills" className="flex flex-col h-full md:gap-24 md:flex-row pt-32 pb-64 md:py-64 px-8 md:px-24">
                
                {/* technologies */}
                <div className="cursor-pointer transform transition duration-500 hover:scale-105 flex flex-col md:w-[50%] shadow-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-2xl md:text-3xl font-montserrat font-black italic text-secondary">TECHNOLOGIES</h1>
                    </div>
                    
                    <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-8 bg-black/30 rounded-3xl p-4 md:p-8 mt-4">
                        {technologies.map((icon) => (
                            <div className="cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-xl bg-black/40 w-[13%] p-1 md:p-2 lg:p-4 rounded-3xl">
                                <img src={icon[0]} className={`${icon[1]}`} />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* tools */}
                <div className="cursor-pointer transform transition duration-500 hover:scale-105 flex flex-col pt-12 md:pt-0 md:w-[50%] shadow-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-2xl md:text-3xl font-montserrat font-black italic text-secondary">TOOLS</h1>
                    </div>
                    
                    <div className="flex flex-row flex-wrap h-full justify-center items-center gap-2 md:gap-8 bg-black/30 rounded-3xl p-4 md:p-8 mt-4">
                        {tools.map((icon) => (
                            <div className="cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-xl bg-black/40 w-[13%] p-1 md:p-2 lg:p-4 rounded-3xl">
                                <img src={icon[0]} className={`${icon[1]}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};