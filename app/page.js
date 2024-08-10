'use client';
import React, { useState, useEffect } from 'react';
import CycleTitle from '../components/cycleTitle'

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen text-xl md:text-2xl lg:text-3xl space-y-6 justify-center items-center">

        <div className="">
          <p className="">Hey, I&apos;m <span className="text-secondary font-bold">Joseph</span><span className="animate-flicker">_</span></p>
        </div>

        <div className="">
          <CycleTitle />
        </div>

    </div>
  );
}
