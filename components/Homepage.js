"use client";
// pages/index.js
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavbarDemo } from "./responsive-navbar";
import TechStackSlideshow from "./Slideshow";
import ExperienceTimeline from "./experienceTimeline";
import { ShootingStarsAndStarsBackgroundDemo } from "./StarBackground";
import WorksSection from "./Works";
import ProjectsSection from "./Projects";
import AnimatedFooter from "./Footer";
import BlogInsights from "./BlogInsight";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
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
      role: "Python Developer Intern",
      period: "July 2022 - August 2022",
      description: "Wrote Python automation scripts to streamline routine tasks and improve workflow efficiency; debugged, tested, and optimized Python applications to improve reliability and performance.",
    },
  ];
  const SectionHeader = () => {
  const [ref, visible] = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        marginBottom: "56px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "#4a9eff",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: "12px",
      }}>
        Featured Work
      </p>
      <h2 style={{
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 700,
        color: "#fff",
        margin: "0 0 16px",
        letterSpacing: "-1.5px",
        lineHeight: 1.05,
      }}>
        My Personal Projects
      </h2>
      <p style={{
        fontSize: "15px",
        color: "#555",
        maxWidth: "400px",
        margin: "0 auto",
        lineHeight: 1.6,
      }}>
        These are my projects on which I try to work actively.
      </p>
    </div>
  );
};

  // Blog posts data

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Head>
        <title>Viraj Bane | AI/ML Engineer</title>
        <meta
          name="description"
          content="Portfolio of Viraj Bane, an AI/ML Engineer specializing in LLMs, RAG systems, and full-stack AI application development"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated stars background stays as is */}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section - Made responsive with padding adjustments */}
        <section
          id="about"
          className="py-8 sm:py-12 md:py-16 mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-transparent border border-zinc-800 rounded-lg p-4 sm:p-6 md:p-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Viraj Bane
            </h1>
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
                Mumbai, Maharashtra, India
              </span>
            </p>
            <p className="text-base sm:text-lg mb-6">
              AI/ML Engineer with a strong foundation in Python, Machine Learning,
              Deep Learning, LLMs, and Retrieval-Augmented Generation (RAG) —
              skilled in building AI-powered applications with FastAPI, Next.js,
              and modern AI frameworks. Built 5+ AI applications, including a
              multi-agent RAG platform and a multilingual NL-to-SQL interface,
              with full-stack development experience.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:virajbane2004@gmail.com"
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
                href="https://linkedin.com/in/virubane"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaLinkedin className="w-5 h-5 text-white" />
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
        <section className="py-4 sm:py-1">
          <SectionHeader />

          <ProjectsSection showAll={false} />
        </section>

        {/* Latest blog posts - Adjusted spacing */}
        <section id="posts" className="py-2 sm:py-1">
          <BlogInsights isHomePage={true} />
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}