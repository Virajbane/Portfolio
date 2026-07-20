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
  const [text, setText] = useState("");
  const fullText = "aspiring AI Engineer and Full-Stack Developer";
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
    <div style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="min-h-screen text-white bg-transparent">
        <Head>
          <title>Viraj Bane | Full-Stack Web Developer</title>
          <meta
            name="description"
            content="Portfolio of Viraj Bane, a Full-Stack Web Developer"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="max-w-3xl mx-auto px-4 pb-16 relative z-10 overflow-hidden">
          {/* Hero / About Section */}
          <section id="about" className="py-10 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="bg-transparent p-6 sm:p-8 shadow-2xl"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  <span className="bg-linear-to-r from-white to-[#A1A1AA] bg-clip-text text-transparent">
                    About me
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg"
                style={{ color: "#D4D4D8" }}
              >
                {/* Paragraph 1 — Intro */}
                <p className="leading-relaxed">
                  I'm <span className="font-bold text-white">Viraj Bane</span>, a{" "}
                  <span className="font-bold text-white">Computer Science Engineering</span> student
                  at <span className="font-bold text-white">Viva Institute of Technology</span> and
                  an{" "}
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
                  </span>
                  . I enjoy building intelligent solutions that combine{" "}
                  <span className="font-bold text-white">
                    Artificial Intelligence, Machine Learning
                  </span>
                  , and modern web technologies to solve real-world problems.
                </p>

                {/* Paragraph 2 — Skills */}
                <motion.p
                  className="leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.7 }}
                >
                  My technical skills include{" "}
                  <span className="font-bold text-white">
                    Python, JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB,
                  </span>{" "}
                  and <span className="font-bold text-white">MySQL</span>, along with hands-on
                  experience in{" "}
                  <span className="font-bold text-white">
                    Machine Learning, Deep Learning, and Natural Language Processing
                  </span>
                  .
                </motion.p>

                {/* Paragraph 3 — Projects */}
                <motion.p
                  className="leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.7 }}
                >
                  I have worked on projects such as{" "}
                  <span className="font-bold text-white">EDU.AI</span>, an AI-powered personalized
                  learning platform developed during{" "}
                  <span className="font-bold text-white">Mumbai Hack 2024</span>,{" "}
                  <span className="font-bold text-white">Move-On</span>, a ride-hailing web
                  application with real-time tracking, and{" "}
                  <span className="font-bold text-white">AI DB Agent</span>, a multilingual natural
                  language database assistant that enables users to interact with databases without
                  writing SQL.
                </motion.p>

                {/* Paragraph 4 — Research & Goals */}
                <motion.p
                  className="leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.7 }}
                >
                  Beyond development, I have presented research at the{" "}
                  <span className="font-bold text-white">
                    Aavishkar Research Convention, University of Mumbai
                  </span>
                  , and co-authored{" "}
                  <span className="font-bold text-white">EYES.AI</span>, an assistive AI system for
                  visually impaired individuals. I am passionate about{" "}
                  <span className="font-bold text-white">
                    continuous learning, innovation,
                  </span>{" "}
                  and building impactful AI-driven products that bridge the gap between{" "}
                  <span className="font-bold text-white">
                    research and real-world applications
                  </span>
                  .
                </motion.p>
              </motion.div>

              {/* Connect buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="mt-6 sm:mt-8"
              >
                <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/Virajbane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium flex items-center space-x-2 hover:bg-[#D4D4D8] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>GitHub</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/in/virubane/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium flex items-center space-x-2 hover:bg-[#D4D4D8] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <ExperienceTimeline />
          <ResumeTimeline />
        </main>

        <AnimatedFooter />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Mono:wght@400;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default page;