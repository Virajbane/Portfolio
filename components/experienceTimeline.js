// components/ExperienceTimeline.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import TimelineItem from './Timelineitem';

export default function ExperienceTimeline() {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      
      // Calculate how much of the timeline is visible
      const timelineTop = rect.top;
      const timelineBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      
      // Start animation when the timeline enters the viewport
      if (timelineBottom < 0 || timelineTop > windowHeight) {
        setScrollProgress(0);
        return;
      }
      
      // Calculate progress percentage (0 to 1)
      const visibleHeight = Math.min(timelineBottom, windowHeight) - Math.max(timelineTop, 0);
      const totalHeight = Math.min(rect.height, windowHeight);
      const progress = visibleHeight / totalHeight;
      
      // Adjust progress based on how far the element has traveled through the viewport
      const adjustedProgress = Math.max(0, Math.min(1, 
        (windowHeight - timelineTop) / (windowHeight + rect.height)
      ));
      
      setScrollProgress(adjustedProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="relative py-16 bg-transparent text-white" ref={timelineRef}>
      <h2 className="text-4xl font-bold mb-16 text-center">Experience</h2>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700">
          {/* Animated gradient overlay */}
          <div 
            className="absolute w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            style={{ 
              height: `${scrollProgress * 100}%`,
              transition: 'height 0.1s ease-out'
            }}
          />
        </div>
        
        {/* Timeline items */}
        <TimelineItem 
          title="Branding Catalyst"
          subtitle="Python development internship"
          date="July, 2022 - August, 2022"
          description="Various activities in Python development"
          position="right"
          animationProgress={scrollProgress >= 0.3 ? 1 : scrollProgress / 0.3}
        />
        
        <TimelineItem 
          title="OpenSource"
          subtitle="github.com/jzitnik-dev"
          date="May 2023 - Present"
          description="I actively try to contribute to Open Source on my GitHub."
          position="left"
          animationProgress={scrollProgress >= 0.6 ? 1 : (scrollProgress - 0.3) / 0.3}
        />
      </div>
    </div>
  );
}