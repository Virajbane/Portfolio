"use client";

import { useEffect, useRef, useState } from "react";
import TimelineItem from "./Timelineitem";

export default function ExperienceTimeline() {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();

      const timelineTop = rect.top;
      const timelineBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      if (timelineBottom < 0 || timelineTop > windowHeight) {
        setScrollProgress(0);
        return;
      }

      const adjustedProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - timelineTop) / (windowHeight + rect.height),
        ),
      );

      setScrollProgress(adjustedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="relative py-6 md:py-10 bg-transparent text-white"
      ref={timelineRef}
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-16 text-center">
        Experience
      </h2>

      <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative px-4 md:px-0">
        {/* Timeline vertical line */}
        <div
          className={`absolute ${isMobile ? "left-4 sm:left-8" : "left-1/2 transform -translate-x-1/2"} h-full w-0.5 bg-gray-700`}
        >
          <div
            className="absolute w-full bg-linear-to-b from-blue-500 via-purple-500 to-pink-500"
            style={{
              height: `${scrollProgress * 100}%`,
              transition: "height 0.1s ease-out",
            }}
          />
        </div>

        {/* Item 1 */}
        <TimelineItem
          title="Branding Catalyst"
          subtitle="Python Developer Intern"
          date="July 2022 – August 2022"
          description="Python development internship at Branding Catalyst Pvt. Ltd., Mumbai."
          position={isMobile ? "right" : "right"}
          animationProgress={scrollProgress >= 0.17 ? 1 : scrollProgress / 0.17}
          isMobile={isMobile}
        />

        <TimelineItem
          title="HuggingFace Models"
          subtitle="ML Engineer · Open Source"
          date="2024 – Present"
          description="Fine-tuned DistilBERT & BERT models for sentiment analysis and resume matching. Deployed on Hugging Face Hub."
          position={isMobile ? "right" : "left"}
          animationProgress={
            scrollProgress >= 0.34 ? 1 : (scrollProgress - 0.17) / 0.17
          }
          isMobile={isMobile}
        />

        <TimelineItem
          title="AI DB Agent"
          subtitle="Full-Stack AI Project"
          date="2025"
          description="NL-to-database interface in English, Hindi & Marathi. Supports 5 databases. Powered by Ollama + Next.js."
          position={isMobile ? "right" : "right"}
          animationProgress={
            scrollProgress >= 0.51 ? 1 : (scrollProgress - 0.34) / 0.17
          }
          isMobile={isMobile}
        />

        <TimelineItem
          title="Research & Publications"
          subtitle="Author · Presenter"
          date="Dec 2025 – Mar 2026"
          description="Published EYES.AI paper at Aavishkar (Univ. of Mumbai) & NCRENB 2026. In VIVA-TECH IJRI."
          position={isMobile ? "right" : "left"}
          animationProgress={
            scrollProgress >= 0.68 ? 1 : (scrollProgress - 0.51) / 0.17
          }
          isMobile={isMobile}
        />

        <TimelineItem
          title="NPTEL Deep Learning"
          subtitle="Elite Cert · IIT Ropar · SWAYAM"
          date="July – October 2025"
          description="12-week Deep Learning course by IIT Ropar. Elite badge, 61% score."
          position={isMobile ? "right" : "right"}
          animationProgress={
            scrollProgress >= 0.75 ? 1 : (scrollProgress - 0.68) / 0.17
          }
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
