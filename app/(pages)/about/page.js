'use client';
import React from 'react';
import ImageCarousel from '../../components/imageCarousel'

export default function AboutPage() {
    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
    ]

    return(
        <div className="flex flex-col md:flex-row my-32 md:my-0 font-roboto px-12 gap-20 min-h-screen">
            
            <div className="flex flex-col md:h-screen md:w-[50%] md:items-left justify-center">
                <h1 className="text-2xl font-extrabold text-secondary">A LITTLE BIT ABOUT ME</h1>
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

        </div>
    );
};