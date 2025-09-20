"use client";
// pages/index.js
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import { FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { NavbarDemo } from "./responsive-navbar";
import TechStackSlideshow from "./Slideshow";
import ExperienceTimeline from "./experienceTimeline";
import { ShootingStarsAndStarsBackgroundDemo } from "./StarBackground";
import WorksSection from "./Works";
import ProjectsSection from "./Projects";
import AnimatedFooter from "./Footer";
import BlogInsights from "./BlogInsight";

export default function Start() {
  // State for animation of stars
  const [stars, setStars] = useState([]);

  // Generate random stars for the background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 1,
          animationDuration: `${Math.random() * 5 + 3}s`,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Technology icons data with monochrome logo styles
  const technologies = [
    { name: "HTML", logo: "html5" },
    { name: "CSS", logo: "css3" },
    { name: "JavaScript", logo: "javascript" },
    { name: "TypeScript", logo: "typescript" },
    { name: "Hugo", logo: "hugo" },
    { name: "React", logo: "react" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "MariaDB", logo: "mariadb" },
    { name: "Node.js", logo: "nodejs" },
    { name: "Rust", logo: "rust" },
    { name: "Git", logo: "git" },
    { name: "Java", logo: "java" },
    { name: "Spring", logo: "spring" },
  ];

  // Experience data
  const experiences = [
    {
      company: "Branding Catalyst",
      role: "Python development internship",
      period: "July, 2022 - August, 2022",
      description: "Various activities in Python development",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      date: "24.12.2024",
      title: "Contributing less to opensource",
      description: "I contribute less to opensource. Why?",
    },
    {
      date: "17.11.2024",
      title: "Why this site will not be open source?",
      description:
        "Will this site ever be open-source? And why is it not open-source now.",
    },
    {
      date: "5.10.2024",
      title: "My opinion on Hugo",
      description: "Is Hugo a good static site generator? Should I use it?",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Head>
        <title>viraj bane | Full-Stack Web Developer</title>
        <meta
          name="description"
          content="Portfolio of Viraj Bane, a Full-Stack Web Developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated stars background stays as is */}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section - Made responsive with padding adjustments */}
        <section id="about" className="py-8 sm:py-12 md:py-16 mt-16 sm:mt-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-transparent border border-zinc-800 rounded-lg p-4 sm:p-6 md:p-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Viraj Bane</h1>
            <p className="text-zinc-400 mb-4">
              <span className="inline-flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Virar, Maharashtra
              </span>
            </p>
            <p className="text-base sm:text-lg mb-6">
              I'm 21-year-old Aspiring Web Developer. I thrive on learning new
              technologies and pushing the boundaries of what's possible on the
              web.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:your-virajbane2004@gmail.com"
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaEnvelope className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Virajbane"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/_.virajbane._/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* What I work with section */}
        <TechStackSlideshow />

        {/* Experience section */}
        <ExperienceTimeline />

        {/* My work section - Adjusted spacing */}
        <section id="projects" className="py-8 sm:py-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
          >
            My work
          </motion.h2>

          <WorksSection />
        </section>

        {/* My personal projects - Adjusted spacing */}
        <section className="py-8 sm:py-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center"
          >
            My personal projects
          </motion.h2>

          <ProjectsSection showAll={false} />
        </section>

        {/* Latest blog posts - Adjusted spacing */}
        <section id="posts" className="py-8 sm:py-12">
          <BlogInsights isHomePage={true} />
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}