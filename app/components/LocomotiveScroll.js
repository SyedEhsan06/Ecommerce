"use client"
import React, { useRef, useEffect } from 'react';
import locomotiveScroll from 'locomotive-scroll'; // Import Locomotive Scroll

function LocomotiveScroll() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Initialize Locomotive Scroll directly
      const scroll = new locomotiveScroll({
        el: scrollContainerRef.current,
        // Add your Locomotive Scroll options here
      });
    }
  }, []);

  return (
    <div ref={scrollContainerRef}>
      {/* Your content goes here */}
    </div>
  );
}

export default LocomotiveScroll;



