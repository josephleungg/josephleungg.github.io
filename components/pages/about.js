'use client';
import React from 'react';
import { ChevronDown } from "react-feather"
import ImageCarousel from '../imageCarousel'
import Image from 'next/image';

export default function AboutPage() {
    const headshot = "/images/1.png";

    const interests = [
        { src: "/images/2.png", label: "Cars", alt: "Night photo of a car" },
        { src: "/images/3.png", label: "Food", alt: "Bowl of comforting food" },
        { src: "/images/4.png", label: "Hiking", alt: "Hiking trail view" },
    ];

    const technologies = [
        // ICONS TAKEN FROM: https://devicon.dev/
        // Format: [iconUrl, className, officialUrl]
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", "", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", "", "https://www.python.org/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg", "", "https://www.java.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", "", "https://www.typescriptlang.org/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", "", "https://en.cppreference.com/w/c"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", "", "https://developer.mozilla.org/en-US/docs/Web/HTML"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", "", "https://developer.mozilla.org/en-US/docs/Web/CSS"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", "", "https://nodejs.org/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "", "https://react.dev/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", "", "https://nextjs.org/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg", "bg-white rounded-3xl", "https://expressjs.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain-wordmark.svg", "", "https://www.djangoproject.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", "bg-white rounded-3xl", "https://flask.palletsprojects.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", "", "https://www.mongodb.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", "", "https://supabase.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", "", "https://tailwindcss.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", "", "https://www.tensorflow.org/"],
    ]

    const tools = [
        // Format: [iconUrl, className, officialUrl]
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "bg-white rounded-3xl", "https://github.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", "", "https://www.linux.org/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", "", "https://www.postman.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", "", "https://code.visualstudio.com/"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", "", "https://www.adobe.com/products/photoshop.html"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg", "bg-[#E298F2] rounded-xl", "https://www.adobe.com/products/premiere.html"],
        ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", "", "https://www.figma.com/"],
    ]

    return(
        <div className="font-roboto">
            {/* about me section */}
            <div className="relative grid min-h-screen gap-12 px-8 py-16 md:px-24 lg:grid-cols-2">
                <div className="flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-6 md:items-start">
                        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full border border-white/20 bg-primary-soft/80 shadow-2xl md:h-64 md:w-64">
                            <Image
                                src={headshot}
                                alt="Headshot of Joseph Leung"
                                fill
                                priority
                                sizes="(max-width: 768px) 224px, 256px"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-3xl font-montserrat font-black italic text-secondary md:text-4xl">A LITTLE BIT ABOUT ME</h1>
                    </div>
                    <p className="text-justify text-base leading-relaxed text-accent/90 md:text-lg">I&apos;m currently a fourth year <span className="font-bold text-tertiary">Computer Science </span> 
                        student attending Toronto Metropolitan University! Beyond the screen, I find joy in lifting weights, eating, and 
                        going on late night drives, I also love to binge shows and play video games whenever I have the time. 
                        My interests extend to web design and working on software that tackles meaningful real-world problems. 
                        I am always excited to continue learning, and developing myself in the technological field!</p>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="rounded-[36px] bg-gradient-to-br from-primary-soft/50 to-primary/30 p-4 shadow-2xl">
                        <ImageCarousel slides={interests} autoSlideInterval={3200} />
                    </div>
                </div>

            </div>

            {/* skills section */}
            <div id="skills" className="flex flex-col h-full md:gap-24 md:flex-row pt-32 pb-64 md:py-64 px-8 md:px-24">
                
                {/* technologies */}
                <div className="cursor-pointer transform transition duration-500 hover:scale-105 flex flex-col md:w-[50%] shadow-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-2xl md:text-3xl font-montserrat font-black italic text-secondary">TECHNOLOGIES</h1>
                    </div>
                    
                    <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-8 bg-black/30 rounded-3xl p-4 md:p-8 mt-4">
                        {technologies.map((icon, i) => (
                            <div 
                                key={i} 
                                onClick={() => window.open(icon[2], '_blank')}
                                className="cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-xl bg-black/40 p-2 md:p-4 lg:p-6 rounded-3xl"
                            >
                                <Image src={icon[0]} alt={`Technology ${i}`} className={`${icon[1]}`} layout="intrinsic" width={50} height={50} />
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
                        {tools.map((icon, i) => (
                            <div 
                                key={i} 
                                onClick={() => window.open(icon[2], '_blank')}
                                className="cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-xl bg-black/40 p-2 md:p-4 lg:p-6 rounded-3xl"
                            >
                                <Image src={icon[0]} alt={`Tool ${i}`} className={`${icon[1]}`} width={50} height={50} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};