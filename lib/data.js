// Central data for the Experience deck and the Hobbies section.
// Kept separate from lib/utils.js (which holds the projects list + cn helper).

export const experiences = [
    {
        title: "Software Developer Co-Op (Investor Services Innovation)",
        company: "RBC (Royal Bank of Canada)",
        short: "RBC",
        location: "Toronto, ON",
        duration: "May 2026 — Present",
        summary: "Building an MCP server and AI-powered tools for wealth management and investor services.",
        // monogram fallback color if no logo image is present
        accent: "#0051A5",
        logo: "/images/logos/rbc.png",
        description: [
            "Built an MCP server enabling investors to securely access multi-million dollar investment portfolios, integrating with Investor Services financial APIs to deliver real-time account and holdings data.",
            "Developed a full-stack React application powered by a LangGraph-based research agent for Wealth Management Europe, surfacing tailored product recommendations for advisors based on client profiles, driving up to a 30% increase in qualified leads.",
            "Led a hackathon team in developing an innovative solution to address dormant account challenges, collaborating on problem-solving and presenting the proposed solution and its potential business impact to senior leaders within Investor Services.",
            "Collaborated on the development of a data processing ETL pipeline using Spring and Amazon S3, supporting the extraction, transformation, and processing of data within a scalable cloud-based architecture.",
        ],
        skills: ["Python", "LangGraph", "MCP", "TypeScript", "React", "Claude Code"],
    },
    {
        title: "Software Developer Co-Op",
        company: "RBC (Royal Bank of Canada)",
        short: "RBC",
        location: "Toronto, ON",
        duration: "Jan 2025 — Dec 2025",
        summary: "Maintained money transfer and ATM APIs, shipping updates through GitHub Actions CI/CD.",
        // monogram fallback color if no logo image is present
        accent: "#0051A5",
        logo: "/images/logos/rbc.png",
        description: [
            "Maintained and enhanced APIs supporting money transfer and ATM functionalities, resolving bugs and security vulnerabilities to improve system reliability.",
            "Deployed API updates across multiple applications through CI/CD pipelines using GitHub Actions, ensuring smooth and efficient production releases.",
            "Migrated cloud deployment pipelines to GitHub Actions leveraging OpenShift Container Platform for streamlined building, testing, and deployment.",
            "Delivered API features through Agile sprints, maintaining alignment with the Software Development Lifecycle and business objectives.",
        ],
        skills: ["Java", "SQL", "Spring Boot", "Red Hat OCP", "GitHub Actions", "Postman"],
    },
    {
        title: "Web Developer",
        company: "TMU Chinese Student Association",
        short: "TMU CSA",
        location: "Toronto, ON",
        duration: "Jul 2025 — Present",
        summary: "Built and maintain the official website for TMU's Chinese Student Association.",
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
        summary: "Fixed bugs and built accessible web features for an internal system used by millions of Ontarians.",
        accent: "#008542",
        logo: "/images/logos/mto.png",
        // crops the white corners baked into this PNG
        logoZoom: 1.35,
        description: [
            "Identified, troubleshot, and resolved bugs across multiple projects, ensuring smooth user experience and enhancing overall application performance.",
            "Contributed to developing web applications using the Apache Struts framework for Java, assisting in building and adhering to the Ontario Disabilities Act.",
            "Contributed to the project documentation, ensuring clear, comprehensive, and accurate descriptions of the application's features and technical details.",
            "Contributed to developing an internal system to aid 5+ million Ontarians.",
        ],
        skills: ["Java", "Weblogic", "SQL", "Apache Struts", "Python"],
    },
    {
        title: "Small Business Owner",
        company: "Self Employed",
        short: "SNKR",
        location: "Markham, ON",
        duration: "Nov 2021 — Jan 2025",
        summary: "Owned and operated a small sneaker business — sales, restoration, and marketing.",
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
        summary: "Led a design-thinking team that pitched an innovative prototype to RBC stakeholders.",
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
    "React Native", "Express", "Spring Boot", "FastAPI", "Django",
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Postman",
    "GitHub Actions", "Red Hat OCP", "MCP", "Claude Code", "LangGraph"
];

// ---- Hobbies ----

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

export const sports = [
    { name: "Basketball", emoji: "🏀" },
    { name: "Badminton", emoji: "🏸" },
];
