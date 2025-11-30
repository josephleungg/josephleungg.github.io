'use client';
import React from 'react';
import ImageCarousel from '../imageCarousel'
import Image from 'next/image';

export default function AboutPage() {
    const headshot = "/images/1.png";

    const interests = [
        { src: "/images/2.png", label: "Cars", alt: "Night photo of a car" },
        { src: "/images/3.png", label: "Food", alt: "Bowl of comforting food" },
        { src: "/images/4.png", label: "Hiking", alt: "Hiking trail view" },
    ];

    const skillBubbles = [
        { name: "Python", href: "https://www.python.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", size: 130, x: "38%", y: "28%" },
        { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", size: 120, x: "62%", y: "22%" },
        { name: "Java", href: "https://www.java.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", size: 115, x: "24%", y: "42%" },
        { name: "React.js", href: "https://react.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", size: 150, x: "50%", y: "45%" },
        { name: "Next.js", href: "https://nextjs.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", size: 125, x: "73%", y: "40%", invert: true },
        { name: "Express.js", href: "https://expressjs.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", size: 110, x: "20%", y: "20%", invert: true },
        { name: "Spring Boot", href: "https://spring.io/projects/spring-boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", size: 105, x: "30%", y: "64%" },
        { name: "Flask", href: "https://flask.palletsprojects.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", size: 100, x: "10%", y: "33%", invert: true },
        { name: "DJango", href: "https://www.djangoproject.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain-wordmark.svg", size: 120, x: "78%", y: "68%", invert: true },
        { name: "React Native", href: "https://reactnative.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", size: 110, x: "65%", y: "62%" },
        { name: "TailwindCSS", href: "https://tailwindcss.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", size: 95, x: "82%", y: "25%" },
        { name: "MongoDB", href: "https://www.mongodb.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", size: 100, x: "15%", y: "58%" },
        { name: "PostgreSQL", href: "https://www.postgresql.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", size: 100, x: "48%", y: "75%" },
        { name: "SQL", href: "https://www.w3schools.com/sql/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", size: 90, x: "35%", y: "80%" },
        { name: "Postman", href: "https://www.postman.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", size: 90, x: "84%", y: "55%" },
        { name: "GitHub Actions", href: "https://github.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", size: 95, x: "58%", y: "78%", invert: true },
        { name: "Red Hat OCP", href: "https://www.redhat.com/en/technologies/cloud-computing/openshift", icon: "https://www.vectorlogo.zone/logos/redhat/redhat-icon.svg", size: 115, x: "88%", y: "12%" },
        { name: "Azure", href: "https://azure.microsoft.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", size: 105, x: "12%", y: "12%" },
    ];

    return(
        <div className="font-roboto">
            {/* about me section */}
            <div className="relative grid min-h-screen gap-12 px-8 pt-16 md:px-24 lg:grid-cols-2">
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
                        student attending <span className="font-bold text-tertiary">Toronto Metropolitan University</span>! Beyond the screen, I find joy in lifting weights, eating, and 
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
            <section id="skills" className="relative px-6 pb-32 md:px-16 lg:px-24">
                <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-primary-soft/30 px-6 py-12 shadow-2xl backdrop-blur-xl lg:px-12 lg:py-16">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="flex flex-col justify-center gap-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.6em] text-muted">Languages & Tools</p>
                                <h2 className="mt-2 text-3xl font-montserrat font-black text-secondary lg:text-4xl">SOME TECH THAT I USE</h2>
                            </div>
                    </div>
                        <div className="rounded-[32px] border border-white/10 bg-primary-soft/30 p-6 shadow-xl">
                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                                {skillBubbles.map((bubble) => (
                                    <a
                                        key={bubble.name}
                                        href={bubble.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-white/90 transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                                        aria-label={bubble.name}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30">
                                            <Image
                                                src={bubble.icon}
                                                alt={bubble.name}
                                                width={28}
                                                height={28}
                                                className={bubble.invert ? "invert" : ""}
                                            />
                                        </div>
                                        <p className="text-[10px] font-semibold text-center leading-tight">{bubble.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};