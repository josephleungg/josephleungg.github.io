'use client';
import React, { useEffect } from 'react';
import "./globals.css";
import MenuBar from './components/menuBar';

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleLinkClick = (event) => {
      if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const contentSection = document.querySelector('#content');

        if (targetElement && contentSection) {
          if (window.location.hash === targetId) {
            return;
          }

          contentSection.classList.add('fade-out');

          setTimeout(() => {
            window.location.hash = targetId;
            contentSection.classList.remove('fade-out');
            contentSection.classList.add('fade-in');

            setTimeout(() => {
              contentSection.classList.remove('fade-in');
            }, 500);
          }, 500);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col md:flex-row bg-primary text-white font-lato">
        <div className="md:min-w-[15%] md:min-h-screen h-[10vh] fixed min-w-full">
          <MenuBar />
        </div>

        <div id="content" className="md:ml-[15%] md:min-w-[85%] min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}