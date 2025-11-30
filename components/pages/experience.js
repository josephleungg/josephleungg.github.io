'use client';
import React, { useRef } from 'react';

export default function Experience() {
    const scrollRef = useRef(null);

    const experiences = [
        {
            title: "Software Developer Intern",
            company: "RBC (Royal Bank of Canada)",
            location: "Toronto, ON",
            duration: "January 2025 - December 2025",
            description: [
                "Maintained 25+ APIs supporting money transfer and ATM functionalities, fixed bugs and vulnerabilities to maintain company compliance and reliability",
                "Deployed API updates to several applications through CI/CD workflows using GitHub Actions, ensuring smooth and efficient production releases.",
                "Migrated cloud deployment pipelines for several applications to GitHub Actions utilizing Openshift Container Platform for building, testing and deployment.",
                "Optimized application performance by analyzing performance gaps and implementing parallel processing, resulting in a 20% reduction in processing time."
            ],
            skills: ["Java", "SQL", "Spring Boot", "Red Hat OCP", "Github Actions", "Postman", ]
        },
        {
            title: "Web Developer",
            company: "TMU Chinese Student Association",
            location: "Toronto, ON",
            duration: "July 2025 - Present",
            description: [
                "Developed and maintained the official website for the TMU Chinese Student Association",
                "Collaborated with the design team to implement responsive UI/UX designs",
                "Managed website content updates and ensured user accessibility"
            ],
            skills: ["JavaScript", "Next.js", "Firebase", "Git", "Figma"]
        },
        {
            title: "Jr. Technical Analyst Intern",
            company: "Ministry of Transportation",
            location: "Toronto, ON",
            duration: "September 2024 - December 2024",
            description: [
                "Identified, troubleshot, and resolved bugs across multiple projects, ensuring smooth user experience and enhancing overall application performance",
                "Contributed to developing web applications using the Apache Struts framework for Java, assisting in building andadhering to the Ontario Disabilities Act",
                "Enhanced the project's documentation, ensuring clear, comprehensive, and accurate descriptions of the application’s features and technical details",
                "Developed an internal system to aid 5+ million Ontarians"
            ],
            skills: ["Java", "Weblogic", "SQL", "Apache", "Struts", "Python"]
        },
        {
            title: "Small Business Owner",
            company: "Self Employed",
            location: "Markham, ON",
            duration: "November 2021 - January 2025",
            description: [
                "Owner of small sneaker business",
                "Managed day to day business operations including buying, selling, restoration, market research",
                "Organized Financial records (keeping track of sales, expenses etc.)",
                "Negotiating and closing business deals",
                "Social Media Marketing and promotion"
            ],
            skills: ["Photoshop", "Premiere Pro", "Excel", "Communication", "Negotiation"]
        },
        {
            title: "Jr. Innovation Analyst Co-op",
            company: "RBC (Royal Bank of Canada)",
            location: "Remote",
            duration: "November 2020 - February 2021",
            description: [
                "Worked in a team of 5 on a 8 week long project for the Technology and Operations team.",
                "Crafted an innovative solution for a problem within the RBC space using the Design Thinking Process.",
                "Took initiative throughout the whole co-op program; took on the leadership role during the design thinking process and lead most of the presentations.",
                "Pitched our prototype/solution to stakeholders and professionals at RBC."
            ],
            skills: ["Photoshop", "Figma", "Leadership", "Communication"]
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col py-32 px-8 md:px-32 min-h-screen">
            {/* Header */}
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-2xl md:text-3xl font-montserrat font-black text-secondary">EXPERIENCE</h1>
                <p className="text-lg font-roboto mt-2 text-center">My professional journey</p>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-7xl mx-auto w-full">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/90 hover:bg-secondary text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/90 hover:bg-secondary text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Scrollable Timeline */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 px-12 scroll-smooth scrollbar-hide"
                    style={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-[350px] md:w-[400px] scroll-snap-align-start"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-10">
                                <div className="relative">
                                    <div className="w-4 h-4 bg-secondary rounded-full border-4 border-primary"></div>
                                    {index < experiences.length - 1 && (
                                        <div className="absolute top-2 left-full w-[350px] md:w-[400px] h-0.5 bg-gradient-to-r from-secondary to-gray-600"></div>
                                    )}
                                </div>
                            </div>

                            {/* Experience Card */}
                            <div className="group relative flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-secondary/50 h-full">
                                {/* Duration Badge */}
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {exp.duration}
                                    </span>
                                </div>

                                {/* Title & Company */}
                                <h3 className="text-xl font-montserrat font-bold text-white mb-1">
                                    {exp.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-lg font-roboto font-semibold text-secondary">
                                        {exp.company}
                                    </h4>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-1 mb-4 text-gray-400 text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {exp.location}
                                </div>

                                {/* Description */}
                                <ul className="text-sm font-roboto text-gray-300 mb-4 flex-1 space-y-2">
                                    {exp.description.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Skills */}
                                <div className="pt-4 border-t border-gray-700/50">
                                    <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-700/40 text-gray-300 text-xs font-medium rounded-full border border-gray-600/50 hover:bg-gray-600/40 hover:border-gray-500/50 transition-all duration-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile scroll indicator */}
                <div className="flex justify-center mt-4 md:hidden">
                    <p className="text-xs text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Swipe to explore
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </p>
                </div>
            </div>
        </div>
    );
}
