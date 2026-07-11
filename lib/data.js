// Central data for the Experience timeline and the Life "fun zone".
// Kept separate from lib/utils.js (which holds the projects list + cn helper).

export const experiences = [
    {
        title: "Software Developer Intern",
        company: "RBC (Royal Bank of Canada)",
        short: "RBC",
        location: "Toronto, ON",
        duration: "Jan 2025 — Dec 2025",
        // monogram fallback color if no logo image is present
        accent: "#0051A5",
        logo: "/images/logos/rbc.png",
        description: [
            "Maintained 25+ APIs supporting money transfer and ATM functionalities, fixing bugs and vulnerabilities to keep the platform compliant and reliable.",
            "Deployed API updates across several applications through CI/CD workflows using GitHub Actions for smooth production releases.",
            "Migrated cloud deployment pipelines to GitHub Actions on OpenShift Container Platform for building, testing and deployment.",
            "Optimized performance with parallel processing, cutting processing time by 20%.",
        ],
        skills: ["Java", "SQL", "Spring Boot", "Red Hat OCP", "GitHub Actions", "Postman"],
    },
    {
        title: "Web Developer",
        company: "TMU Chinese Student Association",
        short: "TMU CSA",
        location: "Toronto, ON",
        duration: "Jul 2025 — Present",
        accent: "#E4002B",
        logo: "/images/logos/tmucsa.png",
        description: [
            "Developed and maintained the official website for the TMU Chinese Student Association.",
            "Collaborated with the design team to implement responsive UI/UX designs.",
            "Managed website content updates and ensured user accessibility.",
        ],
        skills: ["JavaScript", "Next.js", "Firebase", "Git", "Figma"],
    },
    {
        title: "Jr. Technical Analyst Intern",
        company: "Ministry of Transportation",
        short: "MTO",
        location: "Toronto, ON",
        duration: "Sep 2024 — Dec 2024",
        accent: "#008542",
        logo: "/images/logos/mto.png",
        description: [
            "Identified, troubleshot and resolved bugs across multiple projects, improving user experience and application performance.",
            "Contributed to web applications built on the Apache Struts framework for Java, adhering to the Ontario Disabilities Act.",
            "Enhanced project documentation with clear, comprehensive descriptions of features and technical details.",
            "Developed an internal system to aid 5+ million Ontarians.",
        ],
        skills: ["Java", "Weblogic", "SQL", "Apache Struts", "Python"],
    },
    {
        title: "Small Business Owner",
        company: "Self Employed",
        short: "SNKR",
        location: "Markham, ON",
        duration: "Nov 2021 — Jan 2025",
        accent: "#111111",
        logo: null,
        description: [
            "Owned and operated a small sneaker business.",
            "Managed day-to-day operations: buying, selling, restoration and market research.",
            "Organized financial records — tracking sales, expenses and margins.",
            "Negotiated and closed deals; ran social media marketing and promotion.",
        ],
        skills: ["Photoshop", "Premiere Pro", "Excel", "Communication", "Negotiation"],
    },
    {
        title: "Jr. Innovation Analyst Co-op",
        company: "RBC (Royal Bank of Canada)",
        short: "RBC",
        location: "Remote",
        duration: "Nov 2020 — Feb 2021",
        accent: "#0051A5",
        logo: "/images/logos/rbc.png",
        description: [
            "Worked in a team of 5 on an 8-week project for the Technology & Operations team.",
            "Crafted an innovative solution using the Design Thinking process.",
            "Took the leadership role during the design thinking process and led most presentations.",
            "Pitched the prototype to stakeholders and professionals at RBC.",
        ],
        skills: ["Photoshop", "Figma", "Leadership", "Communication"],
    },
];

// Skills shown as a quiet marquee/row in the About section.
export const skills = [
    "Python", "JavaScript", "TypeScript", "Java", "React", "Next.js",
    "React Native", "Express", "Spring Boot", "Flask", "Django",
    "Tailwind CSS", "MongoDB", "PostgreSQL", "SQL", "Postman",
    "GitHub Actions", "Red Hat OCP", "Azure",
];

// ---- Life / fun zone ----

export const nowPlaying = {
    track: "Before You Forget",
    artist: "The Kid LAROI",
    album: "Before You Forget",
    cover: "/images/laroi-album.jpg",
    // static progress bar position (0-1)
    progress: 0.41,
    length: "2:58",
    elapsed: "1:13",
};

export const car = {
    name: "2023 GR Supra",
    subtitle: "Stratosphere Blue",
    image: "/images/car.jpg",
    facts: [
        { label: "Power", value: "~500 HP · Stage 2" },
        { label: "Mods", value: "Catless downpipe" },
        { label: "Engine", value: "B58 turbo I6" },
        { label: "Best therapy", value: "Late-night pulls" },
    ],
};

export const sports = [
    { name: "Basketball", note: "Weekend runs & pickup games", emoji: "🏀" },
    { name: "Badminton", note: "Doubles, mostly for the smashes", emoji: "🏸" },
];

export const nowList = [
    { label: "Building", value: "This portfolio + a few side projects" },
    { label: "Lifting", value: "Chasing new PRs at the gym" },
    { label: "Watching", value: "Whatever I can binge between deadlines" },
    { label: "Learning", value: "Cloud & backend systems" },
];
