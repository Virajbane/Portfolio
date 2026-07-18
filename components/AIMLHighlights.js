"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const highlight = {
  model: {
    title: "Twitter Sentiment Analysis",
    subtitle: "DistilBERT fine-tuned on Sentiment140",
    badge: "NLP · Hugging Face",
    accent: "#818cf8",
    metric: { label: "Accuracy", value: "89%" },
    tags: ["PyTorch", "Transformers", "DistilBERT"],
    emoji: "🤗",
  },
  agent: {
    title: "JD → Resume Generator",
    subtitle: "Auto-tailors your resume to any job description",
    badge: "Automation · n8n",
    accent: "#ff8a75",
    metric: { label: "Output", value: "PDF in <30s" },
    tags: ["n8n", "Groq", "Llama 3.3 70B"],
    emoji: "⚡",
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

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        background: "linear-gradient(135deg, #000000 0%, #050505 100%)",
        border: `1px solid ${hovered ? item.accent + "55" : "#181818"}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: hovered ? `0 12px 32px -12px ${item.accent}33` : "none",
        flex: "1 1 300px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "16px" }}>{item.emoji}</span>
        <span style={{
          background: `${item.accent}22`,
          color: item.accent,
          border: `1px solid ${item.accent}44`,
          borderRadius: "6px",
          padding: "3px 10px",
          fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.05em",
        }}>{item.badge}</span>
      </div>

      <h3 style={{
        fontSize: "18px", fontWeight: 700, color: "#fafafa",
        margin: 0, marginBottom: "6px",
      }}>{item.title}</h3>
      <p style={{ color: "#a1a1aa", fontSize: "13px", margin: 0, marginBottom: "16px", lineHeight: 1.5 }}>
        {item.subtitle}
      </p>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "16px", paddingTop: "14px", borderTop: "1px solid #181818",
      }}>
        <span style={{ color: "#71717a", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
          {item.metric.label}
        </span>
        <span style={{ color: item.accent, fontSize: "14px", fontWeight: 700 }}>
          {item.metric.value}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {item.tags.map((tag, i) => (
          <span key={i} style={{
            background: "#181818", border: "1px solid #262626",
            borderRadius: "6px", padding: "3px 9px",
            color: "#a1a1aa", fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function AIMLHighlights() {
  const [headerRef, headerVisible] = useInView(0.2);

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
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
          fontSize: "11px", fontWeight: 600, color: "#4a9eff",
          textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px",
        }}>
          AI / ML
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 700, color: "#fff",
          margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1,
        }}>
          Models & Agents
        </h2>
        <p style={{ fontSize: "15px", color: "#71717a", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
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
            background: "#181818", border: "1px solid #262626",
            borderRadius: "10px", padding: "10px 20px",
            color: "#f5f5f5", fontSize: "13px", fontWeight: 600,
            textDecoration: "none", transition: "all 0.2s",
            fontFamily: "'JetBrains Mono', monospace",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#4a9eff";
            e.currentTarget.style.color = "#4a9eff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "#262626";
            e.currentTarget.style.color = "#f5f5f5";
          }}
        >
          See More Models & Agents
          <span style={{ fontSize: "14px" }}>→</span>
        </Link>
      </div>
    </div>
  );
}