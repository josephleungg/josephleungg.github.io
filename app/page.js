'use client';
import React from 'react';
import CycleTitle from '../components/cycleTitle';
import AboutPage from '../components/pages/about';
import Experience from '../components/pages/experience';
import Projects from '../components/pages/projects';
import Life from '../components/pages/life';
import Contact from '../components/pages/contact';

export default function Home() {
  return (
    <div>
      {/* intro / hero */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-center px-6 sm:px-8 md:px-24 lg:px-32"
      >
        <p className="eyebrow mb-5 sm:mb-6">Toronto, ON · Portfolio ’25</p>

        <h1 className="font-grotesk text-4xl font-bold leading-[1] tracking-tight text-ink sm:text-6xl md:text-8xl lg:text-9xl">
          Hey, I&apos;m
          <br />
          <span className="text-ink">Joseph Leung</span>
          <span className="animate-flicker text-accent">.</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base sm:mt-8 sm:text-lg md:text-2xl">
          <span className="font-inter text-ink">I&apos;m a</span>
          <CycleTitle />
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-6 flex items-center gap-3 sm:left-8 md:bottom-10 md:left-24 lg:left-32">
          <span className="eyebrow">Scroll</span>
          <span className="h-8 w-px bg-line md:h-10" />
        </div>
      </section>

      <section id="about" className="min-h-screen">
        <AboutPage />
      </section>

      <section id="experience" className="min-h-screen">
        <Experience />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="life" className="min-h-screen">
        <Life />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
