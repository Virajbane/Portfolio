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
import { ContactFormOnly } from "./ContactSection";
import AIMLHighlights from "./AIMLHighlights";
import FeaturedCertificate from "./FeaturedCertificate";

/* ---------------------------------------------------------------------
   DESIGN TOKENS
   Aligned to the shared design system: Playfair Display for display
   moments, Space Mono for body copy and labels, grayscale-only palette,
   transparent backgrounds, 8px radii throughout.
--------------------------------------------------------------------- */
const tokens = {
  color: {
    primary: "#111111",
    primaryTransparent: "rgba(17, 17, 17, 0.6)",
    surface: "rgba(102, 102, 102, 0.15)",
    surfaceSolid: "#111111",
    background: "transparent",
    textPrimary: "#FFFFFF",
    textSecondary: "#A1A1AA",
    border: "#666666",
  },
  font: {
    display: "'Playfair Display', serif",
    body: "'Space Mono', monospace",
    label: "'Space Mono', monospace",
  },
  radius: {
    card: "8px",
    control: "8px",
    pill: "9999px",
  },
  space: {
    base: "8px",
    gap: "16px",
    cardPadding: "24px",
    sectionPadding: "80px",
  },
};

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
  const [stars, setStars] = useState([]);

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
          fontFamily: tokens.font.label,
          fontSize: "12px",
          fontWeight: 600,
          color: tokens.color.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          lineHeight: "1.2",
          marginBottom: "12px",
        }}>
          Featured Work
        </p>
        <h2 style={{
          fontFamily: tokens.font.display,
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 500,
          color: tokens.color.textPrimary,
          margin: "0 0 16px",
          letterSpacing: "0",
          lineHeight: 1.05,
        }}>
          My Personal Projects
        </h2>
        <p style={{
          fontFamily: tokens.font.body,
          fontSize: "15px",
          fontWeight: 400,
          color: tokens.color.textSecondary,
          maxWidth: "400px",
          margin: "0 auto",
          lineHeight: 1.6,
        }}>
          These are my projects on which I try to work actively.
        </p>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        color: tokens.color.textPrimary,
        background: tokens.color.background,
        fontFamily: tokens.font.body,
      }}
    >
      <Head>
        <title>Viraj Bane | AI/ML Engineer</title>
        <meta
          name="description"
          content="Portfolio of Viraj Bane, an AI/ML Engineer specializing in LLMs, RAG systems, and full-stack AI application development"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: tokens.space.sectionPadding }}
      >
        {/* Hero Section */}
        <section
          id="about"
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
          style={{
            paddingTop: `calc(${tokens.space.sectionPadding} / 2)`,
            paddingBottom: `calc(${tokens.space.sectionPadding} / 2)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              background: tokens.color.surface,
              backdropFilter: "blur(6px)",
              border: `1px solid ${tokens.color.border}`,
              borderRadius: tokens.radius.card,
              padding: tokens.space.cardPadding,
            }}
          >
            <h1
              style={{
                fontFamily: tokens.font.display,
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 500,
                lineHeight: "1.04",
                letterSpacing: "0",
                color: tokens.color.textPrimary,
                marginBottom: tokens.space.gap,
              }}
            >
              Viraj Bane
            </h1>
            <p
              style={{
                color: tokens.color.textSecondary,
                marginBottom: tokens.space.gap,
                fontFamily: tokens.font.label,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
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
            <p
              style={{
                fontFamily: tokens.font.body,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.7,
                color: tokens.color.textPrimary,
                marginBottom: tokens.space.gap,
              }}
            >
              AI/ML Engineer with a strong foundation in Python, Machine Learning,
              Deep Learning, LLMs, and Retrieval-Augmented Generation (RAG) —
              skilled in building AI-powered applications with FastAPI, Next.js,
              and modern AI frameworks. Built 5+ AI applications, including a
              multi-agent RAG platform and a multilingual NL-to-SQL interface,
              with full-stack development experience.
            </p>
            <div className="flex" style={{ gap: tokens.space.gap }}>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:virajbane2004@gmail.com"
                style={{
                  background: tokens.color.primaryTransparent,
                  border: `1px solid ${tokens.color.border}`,
                  borderRadius: tokens.radius.pill,
                  padding: "8px",
                }}
              >
                <FaEnvelope className="w-5 h-5" style={{ color: tokens.color.textPrimary }} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Virajbane"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: tokens.color.primaryTransparent,
                  border: `1px solid ${tokens.color.border}`,
                  borderRadius: tokens.radius.pill,
                  padding: "8px",
                }}
              >
                <FaGithub className="w-5 h-5" style={{ color: tokens.color.textPrimary }} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/virubane"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: tokens.color.primaryTransparent,
                  border: `1px solid ${tokens.color.border}`,
                  borderRadius: tokens.radius.pill,
                  padding: "8px",
                }}
              >
                <FaLinkedin className="w-5 h-5" style={{ color: tokens.color.textPrimary }} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/_.virajbane._/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: tokens.color.primaryTransparent,
                  border: `1px solid ${tokens.color.border}`,
                  borderRadius: tokens.radius.pill,
                  padding: "8px",
                }}
              >
                <FaInstagram className="w-5 h-5" style={{ color: tokens.color.textPrimary }} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/Viraj_Bane_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: tokens.color.primaryTransparent,
                  border: `1px solid ${tokens.color.border}`,
                  borderRadius: tokens.radius.pill,
                  padding: "8px 18px",
                  color: tokens.color.textPrimary,
                  fontFamily: tokens.font.label,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6" />
                </svg>
                View Resume
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* What I work with section */}
        <TechStackSlideshow />

        {/* Experience section */}
        <ExperienceTimeline />

        {/* My work section */}
        <section
          id="projects"
          style={{
            paddingTop: `calc(${tokens.space.sectionPadding} / 2)`,
            paddingBottom: `calc(${tokens.space.sectionPadding} / 2)`,
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: tokens.font.display,
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              textAlign: "center",
              color: tokens.color.textPrimary,
              marginBottom: tokens.space.gap,
            }}
          >
            My work
          </motion.h2>

          <WorksSection />
        </section>

        {/* My personal projects */}
        <section style={{ paddingTop: tokens.space.base, paddingBottom: tokens.space.base }}>
          <SectionHeader />
          <ProjectsSection showAll={false} />
        </section>

        {/* AI/ML highlights — top model + top agent, links to /Models */}
        <section
          id="ai-ml"
          style={{
            paddingTop: `calc(${tokens.space.sectionPadding} / 2)`,
            paddingBottom: `calc(${tokens.space.sectionPadding} / 2)`,
          }}
        >
          <AIMLHighlights />
        </section>

        {/* Most relevant credential to the AI/ML role, links to /Achievements */}
        <FeaturedCertificate />

        {/* Quick contact form */}
        <section id="contact-quick" style={{ paddingTop: tokens.space.base }}>
          <ContactFormOnly title="Have a project in mind?" />
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}