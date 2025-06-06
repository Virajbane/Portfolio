"use client";
import ProjectsSection from "@/components/Projects";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen text-white bg-transparent">
      <Head>
        <title>Viraj Bane | Full-Stack Web Developer</title>
        <meta
          name="description"
          content="Portfolio of Viraj Bane, a Full-Stack Web Developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with enhanced animations */}
        <section id="about" className="py-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="bg-transparent p-6"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-base"
            >
              <p className="leading-relaxed">
                These are my projects on which I try to work actively.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <div className="mb-12">
          <ProjectsSection showAll={true} />
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}

export default page;