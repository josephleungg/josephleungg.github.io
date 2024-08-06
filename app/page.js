'use client';
import React, { useState, useEffect } from 'react';
import CycleTitle from './components/cycleTitle'

export default function Home() {
  
  return (
    <div>

      {/* main section at top */}
      <div id="home" className="flex flex-col min-h-screen text-xl md:text-3xl space-y-6 justify-center items-center">

        <div className="">
          <p className="">Hey, I'm <span className="text-secondary font-bold">Joseph </span><span className="animate-flicker">_</span></p>
        </div>

        <div className="">
          <CycleTitle />
        </div>

      </div>

      {/* about me */}
      <div id="about" className="flex min-h-screen justify-center items-center">
        about
      </div>

      {/* projects */}
      <div id="projects" className="flex min-h-screen justify-center items-center">
        projects
      </div>

      {/* contact me */}
      <div id="contact" className="flex min-h-screen justify-center items-center">
        contact
      </div>

    </div>
  );
}
