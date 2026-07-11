import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Projects as named objects. `subtitle` is a short one-liner for the list row;
// `description` is the fuller text shown in the hover card.
export const projects = [
  {
    title: "myGymBro",
    subtitle: "Mobile fitness tracker",
    description:
      "A mobile application created using React Native allowing users to track and manage their fitness.",
    image: "/images/mygymbro.png",
    github: "https://github.com/josephleungg/myGymBro",
    demo: "",
    finished: false,
    tech: ["JavaScript", "React Native", "Express", "MongoDB"],
  },
  {
    title: "Vivid Fitness",
    subtitle: "Coach & member platform",
    description:
      "A full stack web application allowing coaches and class members to seamlessly interact with club activities.",
    image: "/images/vividlogo.png",
    github: "https://github.com/josephleungg/vivid",
    demo: "https://www.youtube.com/watch?v=elm5lUGwtng",
    finished: true,
    tech: ["JavaScript", "Python", "Next.js", "Django", "Supabase"],
  },
  {
    title: "Rotify",
    subtitle: "Gen Z learning, reinvented",
    description:
      "Rotify revolutionizes learning for Gen Z by blending text with satisfying content.",
    image: "/images/rotifylogo.png",
    github: "https://github.com/josephleungg/Rotify",
    demo: "https://www.youtube.com/watch?v=PjXUOong-DI",
    finished: false,
    tech: ["JavaScript", "Next.js", "Express", "OpenAI"],
  },
  {
    title: "BuyBye",
    subtitle: "Your AI shopping partner",
    description:
      "Instead of doing thousand dollar hauls just to not love what you wear, BUYBYE lets you try on clothes in the comfort of your own home!",
    image: "/images/buybye.jpg",
    github: "https://github.com/danielp1218/HackTheValley2024",
    demo: "https://www.youtube.com/watch?v=h9YmYi-IjJU",
    finished: true,
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Puppeteer"],
  },
  {
    title: "EcoDex",
    subtitle: "Gamified waste management",
    description:
      "A gamified platform designed to help users understand and manage waste more effectively by scanning and contributing to environmental sustainability.",
    image: "/images/ecodex-trans-readme.png",
    github: "https://github.com/josephleungg/EcoDex",
    demo: "https://www.youtube.com/watch?v=7_p6hZmhYNA",
    finished: true,
    tech: ["JavaScript", "Python", "Next.js", "Flask", "MongoDB", "OpenAI"],
  },
  {
    title: "GymBro",
    subtitle: "AI workout & meal plans",
    description:
      "A full stack web application allowing users to create targeted workout routines and meal plans based on fitness goals.",
    image: "/images/gymbrologo.png",
    github: "https://github.com/josephleungg/GymBro",
    demo: "https://www.youtube.com/watch?v=1uaXmzfp09s",
    finished: true,
    tech: ["JavaScript", "Next.js", "Express", "Cohere"],
  },
  {
    title: "Donut Clicker",
    subtitle: "PyGame clicker (2021)",
    description:
      'A simple clicker game created using PyGame, an open-source Python library. Created in 2021 as my final project for my "Introduction to Computer Science" course.',
    image: "/images/donut-clicker.png",
    github: "https://github.com/josephleungg/Donut-Clicker",
    demo: "https://replit.com/@leungjoseph/Final-Game-Assignment",
    finished: true,
    tech: ["Python", "PyGame"],
  },
  {
    title: "Portfolio Website",
    subtitle: "This very site",
    description: "My website created using Next.js and Tailwind CSS.",
    image: "/images/logo.png",
    github: "https://github.com/josephleungg/josephleungg.github.io",
    demo: "https://jleungg.com",
    finished: true,
    tech: ["JavaScript", "Next.js"],
  },
];
