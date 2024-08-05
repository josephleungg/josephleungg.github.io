import react, { useState, useEffect } from 'react';

export default function CycleTitle() {
    const [currWord, setCurrWord] = useState("");
    const [currWordIndex, setCurrWordIndex] = useState(0);
  
    const tags = ["3rd Year Student", "Software Developer", "Full-Stack Developer", "Computer Scientist", "Programmer"];
  
    // looping the changing titles
    useEffect(() => {
      const timeouts = [];
    
      // Append characters first
      for (let i = 0; i < tags[currWordIndex].length; i++) {
        const timeoutId = setTimeout(() => {
          setCurrWord(prev => prev + tags[currWordIndex][i]);
        }, 80 * i);
        timeouts.push(timeoutId);
      }
  
      // Delete characters after appending is complete
      const deleteStartTime = 80 * tags[currWordIndex].length + 1200; // Start deleting 1000ms later
      for (let i = tags[currWordIndex].length - 1; i >= 0; i--) {
        const timeoutId = setTimeout(() => {
          setCurrWord(prev => prev.slice(0, i));
        }, deleteStartTime + 100 * (tags[currWordIndex].length - i)); // Slower deletion with 100ms delay
        timeouts.push(timeoutId);
      }
  
      // Update currWordIndex immediately after deletion is complete
      const updateIndexTimeout = setTimeout(() => {
        setCurrWordIndex((prevIndex) => (prevIndex + 1) % tags.length);
      }, deleteStartTime + 100 * tags[currWordIndex].length + 200); // Update index right after deletion
      timeouts.push(updateIndexTimeout);
    
      // Cleanup function to clear timeouts
      return () => {
        timeouts.forEach(timeoutId => clearTimeout(timeoutId));
      };
    }, [currWordIndex]);

    return (
        <p className="text-3xl">I'm a <span className="">{currWord}</span></p>
    );
}