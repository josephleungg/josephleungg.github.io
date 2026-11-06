import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Projects as named objects. `subtitle` is a short one-liner for the list row;
// `description` is the fuller text shown in the hover card.
export const projects = [
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
];
