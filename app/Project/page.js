//app/Project/page.js
"use client";
import ProjectsSection from "@/components/Projects";
import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedFooter from "@/components/Footer";

/* ─── Animated entrance hook ───────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Section Header ───────────────────────────────────────── */
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
        Projects
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

      <main className="container max-w-4xl mx-auto px-4 py-14 relative z-10">
        {/* Hero Section with enhanced animations */}

        {/* Projects Section */}
        <div className="mb-4 mt-16">
          <SectionHeader />
          <ProjectsSection showAll={true} />
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}

export default page;