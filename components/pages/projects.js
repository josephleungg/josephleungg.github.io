'use client';
import { projects } from '../../lib/utils'

export default function Projects() {

    // Function to get color for each technology
    const getTechColor = (techName) => {
        const tech = techName.toLowerCase();
        
        // Language colors
        if (tech.includes('javascript')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        if (tech.includes('python')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        if (tech.includes('typescript')) return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
        if (tech.includes('java')) return 'bg-red-500/20 text-red-300 border-red-500/30';
        if (tech.includes('html')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
        if (tech.includes('css')) return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
        
        // Frontend frameworks
        if (tech.includes('react')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
        if (tech.includes('nextjs') || tech.includes('next')) return 'bg-white/20 text-white border-white/30';
        if (tech.includes('tailwindcss') || tech.includes('tailwind')) return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
        
        // Backend frameworks
        if (tech.includes('nodejs') || tech.includes('node')) return 'bg-green-600/20 text-green-300 border-green-600/30';
        if (tech.includes('expressjs') || tech.includes('express')) return 'bg-gray-600/20 text-gray-300 border-gray-600/30';
        if (tech.includes('django')) return 'bg-green-700/20 text-green-400 border-green-700/30';
        if (tech.includes('flask')) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        
        // Databases
        if (tech.includes('mongodb')) return 'bg-green-500/20 text-green-300 border-green-500/30';
        if (tech.includes('supabase')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
        
        // AI/ML
        if (tech.includes('tensorflow')) return 'bg-orange-600/20 text-orange-300 border-orange-600/30';
        if (tech.includes('openai')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        if (tech.includes('cohere')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
        
        // Tools
        if (tech.includes('puppeteer')) return 'bg-cyan-600/20 text-cyan-300 border-cyan-600/30';
        if (tech.includes('pygame')) return 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30';
        
        // Default
        return 'bg-gray-700/40 text-gray-300 border-gray-600/50';
    };

    return (
        <div className="flex flex-col items-center py-32 px-8 md:px-32 min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-montserrat font-black text-secondary">PROJECTS</h1>
                <p className="text-lg font-roboto mt-2 text-center">Check out some of my featured projects here!</p>
            </div>

            {/* project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-7xl">

                {projects.map((project, i) => (
                   <div 
                        key={i} 
                        className="group relative flex flex-col bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-secondary/50"
                   >
                        {/* Project image */}
                        <div className="relative w-full h-56 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                            <img 
                                src={project[2]} 
                                className="w-full h-full object-cover" 
                                alt={project[0]} 
                            />
                            {/* Gradient overlay on image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Card content */}
                        <div className="flex flex-col flex-1 p-6">
                            {/* Status badge */}
                            <div className="mb-3">
                                {project[6] ? (
                                    <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full">
                                        Completed
                                    </span>
                                ) : (
                                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold rounded-full">
                                        In Development
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-montserrat font-bold text-white mb-3">
                                {project[0]}
                            </h2>
                            
                            {/* Description */}
                            <p className="text-sm font-roboto text-gray-300 mb-4 flex-1">
                                {project[1]}
                            </p>
                            
                            {/* Technology badges */}
                            <div className="flex flex-wrap gap-2 mb-4 pt-4 border-t border-gray-700/50">
                                {project[7].slice(0, 6).map((badge, index) => {
                                    // Extract technology name from badge URL
                                    const techName = badge.split('badge/')[1]?.split('-')[0] || `Tech ${index}`;
                                    const colorClass = getTechColor(techName);
                                    
                                    return (
                                        <span 
                                            key={index}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${colorClass}`}
                                        >
                                            {techName}
                                        </span>
                                    );
                                })}
                                {project[7].length > 6 && (
                                    <span className="px-3 py-1.5 text-xs text-gray-400 self-center font-medium">
                                        +{project[7].length - 6}
                                    </span>
                                )}
                            </div>
                            
                            {/* Buttons */}
                            <div className="flex gap-3">
                                <a
                                    href={project[3]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-700/50 hover:bg-gray-600/50 text-white font-montserrat font-medium text-sm rounded-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    GitHub
                                </a>
                                
                                {project[4] && (
                                    <a
                                        href={project[4]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary/90 hover:bg-secondary text-white font-montserrat font-medium text-sm rounded-lg transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>     
                ))}

            </div>
        </div>
    );
}