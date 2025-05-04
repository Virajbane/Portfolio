"use client";
import ProjectsSection from "@/components/Projects";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import TechStackSlideshow from "@/components/Slideshow";
import ExperienceTimeline from "@/components/experienceTimeline";
import ResumeTimeline from "@/components/StoryTimeline";
import AnimatedFooter from "@/components/Footer";
import Achievements from "@/components/CertificatesSection";

function page() {
  // For typing animation effect
  const [text, setText] = useState("");
  const fullText = "aspiring web developer and problem solver";
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div>
      <div className="min-h-screen text-white bg-transparent">
        {/* Space background with stars */}
        

        <Head>
          <title>Viraj Bane | Full-Stack Web Developer</title>
          <meta
            name="description"
            content="Portfolio of Viraj Bane, a Full-Stack Web Developer"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        
        <Achievements/>

        <AnimatedFooter/>
      </div>
    </div>
  );
}

export default page;