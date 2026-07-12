// components/Projects.js
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─── Project Data ─────────────────────────────────────────── */
const projects = [
  {
    title: "Adaptive RAG 2.0",
    subtitle: "Agentic AI document assistant",
    category: "AI / Generative AI",
    accentColor: "#ff6b6b",
    glowColor: "rgba(255, 107, 107, 0.15)",
    glowRGB: "255, 107, 107",
    gradientBg: "radial-gradient(ellipse at 30% 60%, rgba(255,107,107,0.12) 0%, transparent 65%)",
    image: "/AdaptiveRAG.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
      </svg>
    ),
    problem: "Users struggle to extract accurate information from large document collections, often wasting time manually searching through PDFs and scattered knowledge sources.",
    solution: "An adaptive Retrieval-Augmented Generation (RAG) system that intelligently routes queries, retrieves relevant context from uploaded PDFs, and generates accurate, source-backed responses using local LLMs.",
    technologies: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Ollama",
      "Qdrant",
      "Redis",
      "MongoDB",
      "Docker"
    ],
    link: "https://github.com/Virajbane/AdaptiveRAG-v2",
    featured: true,
    highlight: "Adaptive routing cuts irrelevant retrievals significantly compared to naive RAG — answers stay grounded even across messy, real-world PDFs.",
  },
  {
    title: "AI DB Agent",
    subtitle: "Natural language database interface",
    category: "AI / Dev Tool",
    accentColor: "#4a9eff",
    glowColor: "rgba(74, 158, 255, 0.15)",
    glowRGB: "74, 158, 255",
    gradientBg: "radial-gradient(ellipse at 30% 60%, rgba(74,158,255,0.12) 0%, transparent 65%)",
    image: "/ai-db-agent.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a9eff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    problem: "Developers and non-technical users waste hours writing SQL queries — a steep barrier when working across multiple DB types simultaneously.",
    solution: "A multi-DB agent that translates plain English, Hindi, or Marathi into queries across MongoDB, PostgreSQL, MySQL, Redis, and Supabase.",
    technologies: ["Next.js", "Ollama", "Python", "Multi-DB"],
    link: "https://github.com/Virajbane/ai-db-agent",
    featured: true,
    highlight: "One agent replaces five separate DB clients — query in plain English regardless of which database actually backs the app.",
  },
  {
    title: "Flow Forge",
    subtitle: "Visual AI workflow automation platform",
    category: "AI / Automation",
    accentColor: "#7c5cff",
    glowColor: "rgba(124, 92, 255, 0.15)",
    glowRGB: "124, 92, 255",
    gradientBg: "radial-gradient(ellipse at 30% 60%, rgba(124,92,255,0.12) 0%, transparent 65%)",
    image: "/flow-forge.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M8 6h8" />
        <path d="M7.5 7.5l3 8" />
        <path d="M16.5 7.5l-3 8" />
      </svg>
    ),
    problem:
      "Building AI workflows often requires writing custom backend logic and manually integrating multiple AI models, APIs, and services, making automation complex and time-consuming.",
    solution:
      "A visual drag-and-drop workflow builder that enables users to create, connect, and execute AI pipelines with LLMs, APIs, databases, and automation tools without extensive coding.",
    technologies: [
      "Next.js",
      "React Flow",
      "FastAPI",
      "Python",
      "Ollama",
      "MongoDB"
    ],
    link: "https://github.com/Virajbane/Flow-Forge",
    featured: true,
    highlight: "Turns a multi-day integration effort into a five-minute drag-and-drop pipeline — no backend code required to wire up a new automation.",
  },
  {
    title: "Multi PDF RAG",
    subtitle: "AI-powered document question answering",
    category: "Generative AI",
    accentColor: "#ff6b6b",
    glowColor: "rgba(255, 107, 107, 0.15)",
    glowRGB: "255, 107, 107",
    gradientBg: "radial-gradient(ellipse at 70% 40%, rgba(255,107,107,0.12) 0%, transparent 65%)",
    image: "/multi-pdf-rag.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),
    problem:
      "Searching for relevant information across multiple PDF documents is slow and inefficient, requiring users to manually browse large volumes of content.",
    solution:
      "A Retrieval-Augmented Generation (RAG) system that indexes multiple PDF documents, performs semantic search, and generates accurate answers with source citations using local AI models.",
    technologies: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Ollama",
      "ChromaDB",
      "Python"
    ],
    link: "https://github.com/Virajbane/Multi-PDF-RAG",
    featured: true,
    highlight: "Cross-references dozens of PDFs at once and cites exactly which document backs each answer — no more manually re-reading source files.",
  },
  {
    title: "Move On",
    subtitle: "Smart travel companion app",
    category: "Travel",
    accentColor: "#5dcaa5",
    glowColor: "rgba(93, 202, 165, 0.15)",
    glowRGB: "93, 202, 165",
    gradientBg: "radial-gradient(ellipse at 70% 30%, rgba(93,202,165,0.12) 0%, transparent 65%)",
    image: "/app6.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5dcaa5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    problem: "Travelers struggle to coordinate seamlessly across locations, losing time to fragmented, disconnected tools with no unified experience.",
    solution: "A travel platform enabling effortless connections between commuters and explorers — route-aware, real-time, confidence-first design.",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://github.com/Virajbane/Move-on",
    featured: false,
    highlight: "Coordinates real-time travel plans in one place instead of juggling five disconnected transit apps.",
  },
  {
    title: "To-Do List App",
    subtitle: "Real-time collaboration tool",
    category: "Productivity",
    accentColor: "#9f77dd",
    glowColor: "rgba(159, 119, 221, 0.15)",
    glowRGB: "159, 119, 221",
    gradientBg: "radial-gradient(ellipse at 30% 70%, rgba(159,119,221,0.12) 0%, transparent 65%)",
    image: "/App7.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9f77dd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    problem: "Students and developers lack a lightweight, real-time collaboration tool that syncs tasks without friction across devices and teams.",
    solution: "A Firebase-backed task manager with real-time sync, team collaboration, and a clean UI built for solo focus and group projects alike.",
    technologies: ["React", "Firebase", "Tailwind"],
    link: "https://github.com/Virajbane/To-do-list",
    featured: false,
    highlight: "Real-time sync means no more 'wait, did you see my update?' across devices or teammates.",
  },
  {
    title: "Agro-Farm",
    subtitle: "Digital platform for farmers",
    category: "AgriTech",
    accentColor: "#97c459",
    glowColor: "rgba(151, 196, 89, 0.15)",
    glowRGB: "151, 196, 89",
    gradientBg: "radial-gradient(ellipse at 60% 60%, rgba(151,196,89,0.12) 0%, transparent 65%)",
    image: "/App10.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#97c459" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z" />
        <path d="M12 12C12 12 17 10 19 6c-4 0-7 2-7 6z" />
        <path d="M5 22h14" />
      </svg>
    ),
    problem: "Farmers have no accessible digital space to troubleshoot crop issues, get expert advice, or sell crops directly — leaving them dependent on middlemen.",
    solution: "A platform where farmers post daily issues, receive community solutions, and list crops for direct sale — cutting out the middleman entirely.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Virajbane/Agro-Farm",
    featured: false,
    highlight: "Cuts out the middleman entirely — farmers list and sell crops directly to buyers through the platform.",
  },
  {
    title: "VIRRMART",
    subtitle: "Amazon-inspired storefront clone",
    category: "E-Commerce",
    accentColor: "#ef9f27",
    glowColor: "rgba(239, 159, 39, 0.15)",
    glowRGB: "239, 159, 39",
    gradientBg: "radial-gradient(ellipse at 70% 40%, rgba(239,159,39,0.12) 0%, transparent 65%)",
    image: "/App9.png",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef9f27" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
      </svg>
    ),
    problem: "Learning e-commerce UI from scratch is overwhelming without a real-world reference to reverse-engineer how the big platforms are truly built.",
    solution: "A fully hand-crafted Amazon-inspired storefront with product listings, nav, and cart UI — built purely in vanilla HTML, CSS, and JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Virajbane/VIRRMART.com",
    featured: false,
    highlight: "A ground-up rebuild of e-commerce UX patterns in vanilla JS — no framework shortcuts, every interaction hand-built.",
  },
];

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

/* ─── Global Spotlight (from MagicBento) ──────────────────── */
const GlobalSpotlight = ({ sectionRef }) => {
  useEffect(() => {
    if (!sectionRef?.current) return;

    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(120, 160, 255, 0.10) 0%,
        rgba(120, 160, 255, 0.05) 20%,
        rgba(120, 160, 255, 0.02) 40%,
        transparent 65%
      );
      z-index: 0;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease;
      will-change: left, top, opacity;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        spotlight.style.opacity = "0";
        return;
      }

      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
      spotlight.style.opacity = "1";

      const cards = section.querySelectorAll(".project-glow-card");
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const proximity = 280;
        const fadeDistance = 480;

        let intensity = 0;
        if (distance <= proximity) {
          intensity = 1;
        } else if (distance <= fadeDistance) {
          intensity = (fadeDistance - distance) / (fadeDistance - proximity);
        }

        card.style.setProperty("--glow-x", `${relX}%`);
        card.style.setProperty("--glow-y", `${relY}%`);
        card.style.setProperty("--glow-intensity", intensity.toString());
      });
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = "0";
      sectionRef.current?.querySelectorAll(".project-glow-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [sectionRef]);

  return null;
};

/* ─── Impact Toggle (expandable highlight, matches Models/Agents cards) ─── */
const ImpactToggle = ({ label = "Why it matters", content, accent }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((o) => !o);
  };

  return (
    <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        onClick={handleToggle}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none", position: "relative", zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{
            width: "20px", height: "20px", borderRadius: "50%",
            border: `1px solid ${accent}55`, display: "flex",
            alignItems: "center", justifyContent: "center",
            color: accent, fontSize: "12px", fontWeight: 700, lineHeight: 1,
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            background: open ? `${accent}18` : "transparent",
          }}>+</span>
          <span style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 600 }}>{label}</span>
        </div>
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: open ? accent : "#333",
          boxShadow: open ? `0 0 8px ${accent}aa` : "none",
          transition: "all 0.3s ease",
        }} />
      </div>
      <div style={{
        maxHeight: open ? "160px" : "0px",
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease",
        marginTop: open ? "10px" : "0px",
      }}>
        <p style={{ color: "#999", fontSize: "12px", lineHeight: 1.65, margin: 0 }}>
          {content}
        </p>
      </div>
    </div>
  );
};

/* ─── Connector (decorative diagonal accent between featured card and grid) ─── */
const SectionConnector = ({ accent }) => (
  <div style={{ position: "relative", height: "32px", margin: "-6px 0 0", pointerEvents: "none" }}>
    <svg width="100%" height="32" style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}>
      <line
        x1="6%" y1="0" x2="22%" y2="32"
        stroke={accent} strokeWidth="1.5" strokeDasharray="3 5"
        strokeLinecap="round" opacity="0.4"
      />
      <circle cx="22%" cy="32" r="2.5" fill={accent} opacity="0.55" />
    </svg>
  </div>
);


const ProjectCard = ({ project, index, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const [cardRef, visible] = useInView(0.1);

  const cardStyle = {
    position: "relative",
    display: "block",
    background: hovered
      ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)"
      : "rgba(255,255,255,0.02)",
    borderRadius: "16px",
    overflow: "hidden",
    textDecoration: "none",
    cursor: "pointer",
    transform: visible
      ? hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)"
      : "translateY(30px)",
    opacity: visible ? 1 : 0,
    transition: `opacity 0.6s ease ${delay}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    "--glow-x": "50%",
    "--glow-y": "50%",
    "--glow-intensity": "0",
    "--glow-color": project.glowRGB,
    border: `1px solid ${hovered ? project.accentColor + "44" : "rgba(255,255,255,0.07)"}`,
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-glow-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        .project-glow-card {
          --glow-radius: 220px;
        }
        .project-glow-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 35%,
            transparent 60%
          );
          border-radius: 16px;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* Glow orb on hover */}
      <div style={{
        position: "absolute",
        top: "-40px",
        right: "-40px",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        background: project.glowColor,
        filter: "blur(40px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Image / gradient area */}
      <div style={{
        position: "relative",
        width: "100%",
        height: project.featured ? "200px" : "150px",
        backgroundImage: project.image ? "none" : project.gradientBg,
        backgroundColor: "#0a0a0a",
        overflow: "hidden",
        transition: "height 0.4s ease",
      }}>
        {/* Project screenshot */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              opacity: hovered ? 1 : 0.85,
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "all 0.4s ease",
              zIndex: 0,
            }}
          />
        )}

        {/* Animated grid lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }} />

        {/* Bottom fade */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, #080808)",
        }} />

        {/* Category tag */}
        <div style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 12px",
          borderRadius: "9999px",
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${project.accentColor}44`,
          fontSize: "11px",
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "0.02em",
          zIndex: 2,
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: project.accentColor,
            boxShadow: `0 0 6px ${project.accentColor}`,
            display: "inline-block",
            animation: "pulse-dot 2s ease-in-out infinite",
          }} />
          {project.category}
        </div>

        {/* Icon badge */}
        <div style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${project.accentColor}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          backdropFilter: "blur(8px)",
          transform: hovered ? "rotate(5deg) scale(1.1)" : "rotate(0) scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {project.icon}
        </div>

        {/* Index watermark */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          right: "14px",
          fontSize: "48px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          letterSpacing: "-2px",
          userSelect: "none",
          zIndex: 1,
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "18px 20px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
          <p style={{
            fontSize: project.featured ? "19px" : "16px",
            fontWeight: 600,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.3px",
          }}>
            {project.title}
          </p>
          <ExternalLink
            size={14}
            style={{
              color: project.accentColor,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translate(0, 0)" : "translate(-4px, 4px)",
              transition: "all 0.3s ease",
              flexShrink: 0,
              marginTop: "3px",
            }}
          />
        </div>

        <p style={{ fontSize: "12px", color: "#555", marginBottom: "14px", margin: "0 0 14px" }}>
          {project.subtitle}
        </p>

        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, ${project.accentColor}44, transparent)`,
          marginBottom: "14px",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s",
        }} />

        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#444",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 5px",
        }}>
          Problem
        </p>
        <p style={{
          fontSize: "12.5px",
          color: "#777",
          lineHeight: 1.6,
          margin: "0 0 12px",
        }}>
          {project.problem}
        </p>

        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          color: project.accentColor,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 5px",
          opacity: 0.9,
        }}>
          What we built
        </p>
        <p style={{
          fontSize: "12.5px",
          color: "#bbb",
          lineHeight: 1.6,
          margin: "0 0 14px",
        }}>
          {project.solution}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {project.technologies.map((tech, i) => (
            <span key={i} style={{
              fontSize: "10px",
              fontWeight: 500,
              padding: "3px 9px",
              borderRadius: "9999px",
              background: hovered ? `${project.accentColor}14` : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? project.accentColor + "44" : "rgba(255,255,255,0.1)"}`,
              color: hovered ? project.accentColor : "#666",
              transition: "all 0.3s ease",
              transitionDelay: `${i * 30}ms`,
            }}>
              {tech}
            </span>
          ))}
        </div>

        {project.highlight && (
          <ImpactToggle content={project.highlight} accent={project.accentColor} />
        )}

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{
            fontSize: "12px",
            color: hovered ? project.accentColor : "#555",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "color 0.3s, gap 0.3s",
            fontWeight: 500,
          }}>
            View on GitHub
            <ArrowRight
              size={13}
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            />
          </span>
          <span style={{ fontSize: "11px", color: "#2a2a2a", fontWeight: 600 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </a>
  );
};

/* ─── Section Header ───────────────────────────────────────── */


/* ─── Main Export ──────────────────────────────────────────── */
export default function ProjectsSection({ showAll = false }) {
  const router = useRouter();
  const [btnHovered, setBtnHovered] = useState(false);
  const sectionRef = useRef(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const featuredProject = visibleProjects[0];
  const restProjects = visibleProjects.slice(1);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "80px 0 40px", background: "transparent", position: "relative" }}
    >
      <GlobalSpotlight sectionRef={sectionRef} />

      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,158,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "5%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(159,119,221,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "0 1.25rem",
        position: "relative",
        zIndex: 1,
      }}>
        

        {featuredProject && (
          <div style={{ marginBottom: "16px" }}>
            <ProjectCard project={featuredProject} index={0} delay={0} />
          </div>
        )}

        {restProjects.length > 0 && (
          <SectionConnector accent={featuredProject?.accentColor || "#4a9eff"} />
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {restProjects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i + 1} delay={(i + 1) * 80} />
          ))}
        </div>

        {!showAll && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "52px", marginBottom: "80px" }}>
            <button
              onClick={() => router.push("/Project")}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                padding: "13px 32px",
                background: btnHovered
                  ? "rgba(74,158,255,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${btnHovered ? "rgba(74,158,255,0.5)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: "9999px",
                color: btnHovered ? "#4a9eff" : "#aaa",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
                boxShadow: btnHovered ? "0 0 24px rgba(74,158,255,0.15)" : "none",
              }}
            >
              View More Projects
              <ArrowRight
                size={14}
                style={{
                  transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}