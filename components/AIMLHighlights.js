"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function ModelIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <circle cx="9" cy="13.5" r="1.2" fill={color} stroke="none" />
      <circle cx="15" cy="13.5" r="1.2" fill={color} stroke="none" />
      <path d="M10 17h4" />
    </svg>
  );
}

function AgentIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
      <path d="M13 3 5 13.5h6.2L11 21l8-10.5h-6.2L13 3z" strokeLinejoin="round" />
    </svg>
  );
}

const highlight = {
  model: {
    title: "Twitter Sentiment Analysis",
    subtitle: "DistilBERT fine-tuned on Sentiment140",
    badge: "NLP · Hugging Face",
    accent: "#FFFFFF",
    metric: { label: "Accuracy", value: "89%" },
    tags: ["PyTorch", "Transformers", "DistilBERT"],
    Icon: ModelIcon,
  },
  agent: {
    title: "JD → Resume Generator",
    subtitle: "Auto-tailors your resume to any job description",
    badge: "Automation · n8n",
    accent: "#A1A1AA",
    metric: { label: "Output", value: "PDF in <30s" },
    tags: ["n8n", "Groq", "Llama 3.3 70B"],
    Icon: AgentIcon,
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

function MiniCard({ item, index }) {
  const [ref, visible] = useInView(0.2);
  const [hovered, setHovered] = useState(false);
  const Icon = item.Icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        background: "transparent",
        border: `1px solid ${hovered ? item.accent + "55" : "#666666"}`,
        borderRadius: "8px",
        padding: "24px",
        boxShadow: hovered ? `0 12px 32px -12px ${item.accent}33` : "none",
        flex: "1 1 300px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <Icon color={item.accent} />
        </span>
        <span style={{
          background: `${item.accent}22`,
          color: item.accent,
          border: `1px solid ${item.accent}44`,
          borderRadius: "8px",
          padding: "3px 10px",
          fontSize: "11px",
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.05em",
        }}>{item.badge}</span>
      </div>

      <h3 style={{
        fontSize: "18px", fontWeight: 500, color: "#FFFFFF",
        fontFamily: "'Playfair Display', serif",
        margin: 0, marginBottom: "6px",
      }}>{item.title}</h3>
      <p style={{ color: "#A1A1AA", fontSize: "13px", margin: 0, marginBottom: "16px", lineHeight: 1.5 }}>
        {item.subtitle}
      </p>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "16px", paddingTop: "14px", borderTop: "1px solid #666666",
      }}>
        <span style={{ color: "#A1A1AA", fontSize: "11px", fontFamily: "'Space Mono', monospace" }}>
          {item.metric.label}
        </span>
        <span style={{ color: item.accent, fontSize: "14px", fontWeight: 700 }}>
          {item.metric.value}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {item.tags.map((tag, i) => (
          <span key={i} style={{
            background: "transparent", border: "1px solid #666666",
            borderRadius: "8px", padding: "3px 9px",
            color: "#A1A1AA", fontSize: "10px",
            fontFamily: "'Space Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function AIMLHighlights() {
  const [headerRef, headerVisible] = useInView(0.2);

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", background: "transparent" }}>
      <div
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p style={{
          fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
          fontFamily: "'Space Mono', monospace",
          textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px",
        }}>
          AI / ML
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 500, color: "#FFFFFF",
          fontFamily: "'Playfair Display', serif",
          margin: "0 0 16px", letterSpacing: "0", lineHeight: 1.04,
        }}>
          Models & Agents
        </h2>
        <p style={{ fontSize: "15px", color: "#A1A1AA", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
          Fine-tuned transformer models on Hugging Face and multi-step automation agents built with n8n.
        </p>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "32px" }}>
        <MiniCard item={highlight.model} index={0} />
        <MiniCard item={highlight.agent} index={1} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href="/Models"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "transparent", border: "1px solid #666666",
            borderRadius: "8px", padding: "10px 20px",
            color: "#FFFFFF", fontSize: "13px", fontWeight: 600,
            textDecoration: "none", transition: "all 0.2s",
            fontFamily: "'Space Mono', monospace",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#FFFFFF";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "#666666";
            e.currentTarget.style.color = "#FFFFFF";
          }}
        >
          See More Models & Agents
          <span style={{ fontSize: "14px" }}>→</span>
        </Link>
      </div>
    </div>
  );
}