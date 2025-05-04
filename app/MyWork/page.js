"use client";
import ProjectsSection from "@/components/Projects";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import TechStackSlideshow from "@/components/Slideshow";
import ExperienceTimeline from "@/components/experienceTimeline";
import ResumeTimeline from "@/components/StoryTimeline";
import AnimatedFooter from "@/components/Footer";
import WorksSection from "@/components/Works";

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

        <main className="container w-3xl mx-auto px-4 pb-16 relative z-10">
          {/* Hero Section with enhanced animations */}
          <section id="about" className="py-10 mt-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className=" bg-transparent  p-8 shadow-2xl"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <h1 className="text-5xl font-bold mb-2 text-white">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    About me
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="space-y-6 text-lg"
              >
                <p className="leading-relaxed">
                Some websites that I've worked on.
                </p>
                
                
                
                
              </motion.div>
              
              {/* Connect with me section */}
              
            </motion.div>
          </section>

          {/* Experience Timeline Section */}
          <WorksSection/>

          

          {/* Other sections remain unchanged */}
        </main>

        <AnimatedFooter/>
      </div>
    </div>
  );
}

export default page;