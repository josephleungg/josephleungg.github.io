'use client';
import { projects } from '../../../lib/utils'

export default function Projects() {

    return (
        <div className="flex flex-col items-center py-32 px-8 md:px-32 min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-montserrat font-black text-secondary">PROJECTS</h1>
                <p className="text-lg font-roboto mt-2 text-center">Check out some of my projects here!</p>
            </div>

            {/* project cards */}
            <div className="flex flex-row flex-wrap justify-between gap-12 items-centers mt-12">

                {projects.map((project, i) => (
                   <div key={i} className="flex flex-col">
                        {/* project image */}
                        <div className="relative w-96 h-72 rounded-3xl text-white overflow-hidden cursor-pointer transition-all duration-700 card shadow-xl">
                            <div className={`absolute inset-0 w-full h-full flex justify-center bg-[#1f2937] transition-all duration-100 delay-200 z-20 hover:opacity-0`}>
                                <img src={project[2]} className="object-cover rounded-3xl" alt={project[0]} />
                            </div>
                            
                            <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black transition-all z-10 card-back">
                                <h1 className="text-xl font-roboto font-bold text-secondary">{project[0]}</h1>
                                <p className="font-md font-roboto p-8">{project[1]}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-row pt-2 pl-2 gap-2">
                            {(project[7]).map((badge, index) => (
                                <img key={index} src={badge} alt={badge} />
                            ))}
                        </div>
                        
                        {/* bottom buttons */}
                        <div className="flex px-16 py-4 justify-between">
                            {project[6] ? (
                                <>
                                    <button className="transform transition duration-500 p-4 bg-black/50 rounded-2xl hover:text-secondary hover:scale-110 hover:shadow-xl">
                                        <a href={project[3]} target="_blank" className="text-md font-montserrat font-bold">Github</a>
                                    </button>

                                    <button className="transform transition duration-500 p-4 bg-black/50 rounded-2xl hover:text-secondary hover:scale-110 hover:shadow-xl">
                                        <a href={project[4]} target="_blank" className="text-md font-montserrat font-bold">Demo</a>
                                    </button>
                                </>
                            ) : (
                                <button className="transform transition duration-500 w-full py-4 bg-black/50 rounded-full hover:text-secondary hover:scale-110 hover:shadow-xl">
                                    <a href={project[3]} target="_blank" className="text-md font-montserrat font-bold">Github</a>
                                </button>
                            )}
                        </div>

                    </div>     
                ))}

            </div>
        </div>
    );
}