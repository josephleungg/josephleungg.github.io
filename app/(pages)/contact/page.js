export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center my-32 md:my-0 md:min-h-screen min-w-screen">

            <p className="text-secondary font-montserrat font-black text-2xl md:text-3xl">CONTACT ME</p>
            <p className="font-roboto font-medium text-lg md:text-xl pb-8">Feel free to contact me here</p>

            {/* icons */}
            <div className="flex flex-row items-center gap-5">
                
                <a href="https://www.linkedin.com/in/josephleung1/" target="_blank" rel="noopener noreferrer">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="2.4rem"
                        width="2.4rem"
                    >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>

                <a href="https://github.com/josephleungg" target="_blank" rel="noopener noreferrer">
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="2.8em"
                        width="2.8em"    
                    >
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                    </svg>
                </a>

                <a href="mailto:leung.joseph2@gmail.com" target="_blank" rel="noopener noreferrer">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="2.8em"
                        width="2.8em"
                    >
                        <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                    </svg>
                </a>

            </div>

        </div>
    );
}