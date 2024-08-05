'use client';
import React, { useState, useEffect } from 'react';
import CycleTitle from './components/cycleTitle'

export default function Home() {
  
  return (
    <div>

      {/* main section at top */}
      <div className="flex flex-col space-y-6 min-h-screen min-w-screen justify-center items-center">

        <div className="">
          <p className="text-3xl">Hey, I'm <span className="text-secondary font-bold">Joseph </span><span className="animate-flicker">_</span></p>
        </div>

        <div className="">
          <CycleTitle />
        </div>

        <div className="">
          test
        </div>

      </div>

      {/* about me */}
      <div className="flex min-h-screen min-w-screen justify-center items-center">
        hi
      </div>

    </div>
  );
}
