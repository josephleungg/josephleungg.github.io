'use client';
import React, { useState, useEffect } from 'react';
import CycleTitle from '../components/cycleTitle'
import AboutPage from '../components/pages/about';
import Experience from '../components/pages/experience';
import Projects from '../components/pages/projects';
import Contact from '../components/pages/contact';

export default function Home() {
  
  return (
    <div>
      {/* intro section */}
      <div id="home" className="flex flex-col min-h-screen text-xl md:text-2xl lg:text-3xl space-y-6 justify-center items-center">

          <div className="">
            <p className="">Hey, I&apos;m <span className="text-secondary font-bold">Joseph</span><span className="animate-flicker">_</span></p>
          </div>

          <div className="">
            <CycleTitle />
          </div>

      </div>

      {/* about page from components */}
      <div id="about" className="flex flex-col min-h-screen">
        <AboutPage />
      </div>

      {/* experience page from components */}
      <div id="experience" className="flex flex-col min-h-screen">
        <Experience />
      </div>

      {/* projects page from components */}
      <div id="projects" className="flex flex-col min-h-screen">
        <Projects />
      </div>

      {/* contact page from components */}
      <div id="contact" className="flex flex-col min-h-screen">
        <Contact />
      </div>

  </div>
  );
}
