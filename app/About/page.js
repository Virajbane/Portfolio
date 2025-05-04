"use client";
import ProjectsSection from "@/components/Projects";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import TechStackSlideshow from "@/components/Slideshow";
import ExperienceTimeline from "@/components/experienceTimeline";
import ResumeTimeline from "@/components/StoryTimeline";
import AnimatedFooter from "@/components/Footer";

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
                <h1 className="text-5xl font-bold mb-6 text-white">
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
                  I'm <span className="font-bold text-white">Viraj Bane</span>, an{" "}
                  <span className="inline-block">
                    <motion.span
                      className="font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {text}
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      |
                    </motion.span>
                  </span>{" "}
                  <span className="font-bold text-white">recent diploma graduate</span> currently pursuing a{" "}
                  <span className="font-bold text-white">Bachelor of Engineering in Computer Science</span> at{" "}
                  <span className="font-bold text-white">Viva Institute of Technology</span>. With a solid
                  foundation in <span className="font-bold text-white">front-end development</span> using{" "}
                  <span className="font-bold text-white">ReactJS</span>, <span className="font-bold text-white">Next.js</span>, and{" "}
                  <span className="font-bold text-white">Tailwind CSS</span>, I'm expanding my skillset into{" "}
                  <span className="font-bold text-white">backend technologies</span> like{" "}
                  <span className="font-bold text-white">Node.js</span> and <span className="font-bold text-white">Express</span> to become
                  a <span className="font-bold text-white">full-stack developer</span>.
                </p>
                
                <motion.p 
                  className="leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                >
                  I <span className="font-bold text-white">thrive in team environments</span> and enjoy{" "}
                  <span className="font-bold text-white">solving real-world problems through code</span>. My
                  passion for technology led me to develop impactful projects like{" "}
                  <span className="font-bold text-white">EDU.AI</span>, an{" "}
                  <span className="font-bold text-white">AI-powered educational platform</span> recognized at
                  the <span className="font-bold text-white">world's largest hackathon</span>, and{" "}
                  <span className="font-bold text-white">Move On</span>, a{" "}
                  <span className="font-bold text-white">ride-hailing web app</span> similar to{" "}
                  <span className="font-bold text-white">Uber</span>.
                </motion.p>
                
                <motion.p 
                  className="leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.7 }}
                >
                  Beyond coding, I enjoy <span className="font-bold text-white">organizing tech events</span>,
                  contributing to <span className="font-bold text-white">open-source</span>, and exploring my{" "}
                  <span className="font-bold text-white">creative side</span> through{" "}
                  <span className="font-bold text-white">video editing</span> and <span className="font-bold text-white">photography</span>.
                  Whether building <span className="font-bold text-white">scalable web apps</span> or leading{" "}
                  <span className="font-bold text-white">multimedia projects</span>, I'm driven by{" "}
                  <span className="font-bold text-white">curiosity</span>, <span className="font-bold text-white">continuous learning</span>, 
                  and the desire to make{" "}
                  <span className="font-bold text-white">meaningful contributions</span>.
                </motion.p>
              </motion.div>
              
              {/* Connect with me section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="mt-8"
              >
                <div className="flex items-center space-x-6 justify-center md:justify-start">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/Virajbane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/in/virubane/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Experience Timeline Section */}
          <ExperienceTimeline />

          <ResumeTimeline/>

          {/* Other sections remain unchanged */}
        </main>

        <AnimatedFooter/>
      </div>
    </div>
  );
}

export default page;