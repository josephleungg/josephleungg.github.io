import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const projects = [
  // title, description, image, github link, demo (blank if unfinished), card-bg-color, finished, badges
  ["myGymBro",
  "a mobile application created using React Native allowing users to track and manage their fitness. (Work in Progress)",
  "/images/mygymbro.png",
  "https://github.com/josephleungg/myGymBro",
  "",
  "#161622",
  false,
  ["https://img.shields.io/badge/Javascript-yellow", "https://img.shields.io/badge/React_Native-blue", "https://img.shields.io/badge/ExpressJS-black", "https://img.shields.io/badge/MongoDB-lightgreen"]
  ],
  
  ["Vivid Fitness",
  "a full stack web application allowing coaches and class members to seemlessly interact with club activities.",
  "/images/vividlogo.png",
  "https://github.com/josephleungg/vivid",
  "https://www.youtube.com/watch?v=elm5lUGwtng",
  "#07465f",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/Python-blue","https://img.shields.io/badge/NextJS-black","https://img.shields.io/badge/Django-darkgreen","https://img.shields.io/badge/Supabase-lightgreen"]
  ],

  ["Rotify",
    "Rotify revolutionizes learning for Gen Z by blending text with satisfying content.",
    "/images/rotifylogo.png",
    "https://github.com/josephleungg/Rotify",
    "https://www.youtube.com/watch?v=PjXUOong-DI",
    "#07465f",
    false,
    ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/NextJS-black","https://img.shields.io/badge/ExpressJS-darkgreen","https://img.shields.io/badge/OpenAI-blue"]
  ],

  ["BuyBye",
    "Your AI Shopping Partner. Instead of doing thousand dollar hauls just to not love what you wear, BUYBYE will let you try on clothes in the comfort of your own home!",
    "/images/buybye.jpg",
    "https://github.com/danielp1218/HackTheValley2024",
    "https://www.youtube.com/watch?v=h9YmYi-IjJU",
    "#ffdf76",
    true,
    ["https://img.shields.io/badge/Typescript-blue","https://img.shields.io/badge/NextJS-black","https://img.shields.io/badge/Tailwindcss-lightgreen", "https://img.shields.io/badge/Puppeteer-green"]
  ],
  
  ["EcoDex",
  "Gamified platform designed to help users understand and manage waste more effectively by scanning and contributing to environmental sustainability.",
  "/images/ecodex-trans-readme.png",
  "https://github.com/josephleungg/EcoDex",
  "https://www.youtube.com/watch?v=7_p6hZmhYNA",
  "#10d546",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/Python-blue","https://img.shields.io/badge/NextJS-black","https://img.shields.io/badge/Flask-black","https://img.shields.io/badge/MongoDB-lightgreen","https://img.shields.io/badge/OpenAI-lightgreen"]
  ],
  
  ["ML Stock Predictor",
  "a project utilizing machine learning (tensorflow) and decades of company data to predict future price trends. (Work in Progress)",
  "/images/stock-rising.png",
  "https://github.com/josephleungg/Stock-Predictor",
  "",
  "#ffffff",
  false,
  ["https://img.shields.io/badge/Python-blue","https://img.shields.io/badge/Flask-black","https://img.shields.io/badge/Tensorflow-orange"]
  ],
  
  ["GymBro",
  "a full stack web application allowing users to create targetted workout routines and meal plans based on fitness goals.",
  "/images/gymbrologo.png",
  "https://github.com/josephleungg/GymBro",
  "https://www.youtube.com/watch?v=1uaXmzfp09s",
  "#082f49",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/NextJS-black","https://img.shields.io/badge/ExpressJS-black","https://img.shields.io/badge/Cohere-white"]
  ],
  
  ["Donut Clicker",
  "a simple clicker game created using PyGame, an open-source Python library. This project was created in 2021 as my final project for my \"Introduction to Computer Science\" course.",
  "/images/donut-clicker.png",
  "https://github.com/josephleungg/Donut-Clicker",
  "https://replit.com/@leungjoseph/Final-Game-Assignment",
  "#1f2937",
  true,
  ["https://img.shields.io/badge/Python-blue", "https://img.shields.io/badge/PyGame-yellow"]
  ],
  
  ["Portfolio Website",
  "My website created using Next.js, and Tailwind CSS.",
  "/images/logo.png",
  "https://github.com/josephleungg/josephleungg.github.io",
  "https://josephleung.vercel.app/",
  "#1f2937",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/NextJS-black"]
  ],
  
  ["MemoryLane",
  "Take a nostalgic trip through time and relive all the best moments of the past!",
  "/images/memorylane.png",
  "https://github.com/josephleungg/memorylane",
  "https://www.youtube.com/watch?v=AgtgF8Z4h54",
  "#1f2937",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/React-blue","https://img.shields.io/badge/ExpressJS-black","https://img.shields.io/badge/Cohere-white"]
  ],
  
  ["Wingman",
  "A personal assistant utilizing Ollama in the form of a bird plushie.",
  "/images/wingman.png",
  "https://github.com/josephleungg/Wingman",
  "",
  "#1f2937",
  false,
  ["https://img.shields.io/badge/Python-blue"]
  ],
  
  ["CPS530 (Web Dev) Labs",
  "Website showcasing all of my lab work in CPS530! I also go through my learning process for TailwindCSS",
  "/images/530thumbnail.png",
  "https://github.com/josephleungg/CPS530-Labs",
  "https://josephleungg.github.io/CPS530-Labs/",
  "#1f2937",
  true,
  ["https://img.shields.io/badge/Javascript-yellow","https://img.shields.io/badge/HTML-orange","https://img.shields.io/badge/CSS-darkblue"]
  ],
  
  ["Random Tools",
  "a project containing a bunch of useful/useless tools built with vanilla js.",
  "/images/randomtoolslogo.png",
  "https://github.com/josephleungg/RandomTools",
  "https://josephleungg.github.io/RandomTools/",
  "#1f2937",
  true,
  ["https://img.shields.io/badge/Javascript-yellow"]
  ],
]