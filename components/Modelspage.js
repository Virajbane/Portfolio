"use client";
import { Fragment, useEffect, useRef, useState } from "react";

/* ============================================================
   TILT HELPER
   Cursor position -> small rotateX/rotateY lean + a glare that
   follows the mouse, springs back flat with a CSS transition on
   leave. Disabled on touch devices via a hover-capability check.
   ============================================================ */
function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return canHover;
}

function useTilt(max = 8) {
  const canHover = useHoverCapable();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [springBack, setSpringBack] = useState(false);

  const onMove = (e) => {
    if (!canHover) return;
    setSpringBack(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * max, ry: (px - 0.5) * max, gx: px * 100, gy: py * 100 });
  };

  const onLeave = () => {
    setSpringBack(true);
    setTilt(t => ({ ...t, rx: 0, ry: 0 }));
  };

  return { canHover, tilt, springBack, onMove, onLeave };
}

/* ============================================================
   HF ICON (monochrome, replaces colored emoji)
   ============================================================ */
function HFIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10.5c.4-.6.9-1 1.6-1s1.2.4 1.6 1" strokeLinecap="round" />
      <path d="M11.8 10.5c.4-.6.9-1 1.6-1s1.2.4 1.6 1" strokeLinecap="round" />
      <path d="M8.5 14c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   HUGGING FACE MODELS DATA
   Accents are grayscale to match the two flagship models used
   elsewhere in the portfolio.
   ============================================================ */
const models = [
  {
    id: "twitter-sentiment",
    hfId: "Virajbane/Twiiter-sentiment",
    hfUrl: "https://huggingface.co/Virajbane/Twiiter-sentiment",
    title: "Twitter Sentiment Analysis",
    subtitle: "DistilBERT fine-tuned on Sentiment140",
    type: "Text Classification",
    modelSize: "67M params",
    badge: "NLP",
    badgeColor: "#FFFFFF",
    accent: "#FFFFFF",
    description:
      "End-to-end sentiment classifier fine-tuned on a subset of the Sentiment140 dataset (~10K tweets). Classifies any text as Positive or Negative with 89% accuracy. Supports real-time inference via Hugging Face pipeline.",
    pipeline: "text-classification",
    baseModel: "distilbert-base-uncased",
    tags: ["PyTorch", "Transformers", "DistilBERT", "NLP", "Fine-Tuning"],
    metrics: [
      { label: "Accuracy", value: "89%" },
      { label: "Base Model", value: "DistilBERT" },
      { label: "Dataset", value: "Sentiment140" },
      { label: "Model Size", value: "67M params" },
    ],
    architecture: [
      "Twitter Dataset",
      "Data Cleaning",
      "Tokenization",
      "DistilBERT",
      "Classifier Head",
      "Sentiment Label",
    ],
    codeSnippet: `from transformers import pipeline

classifier = pipeline(
  "text-classification",
  model="Virajbane/Twiiter-sentiment"
)

result = classifier("I love this project!")
# [{'label': 'POSITIVE', 'score': 0.91}]`,
    demo: [
      { text: "I love this project!", label: "POSITIVE", score: 0.91, pos: true },
      { text: "Worst day ever", label: "NEGATIVE", score: 0.96, pos: false },
      { text: "This is absolutely amazing!", label: "POSITIVE", score: 0.88, pos: true },
    ],
    highlight: "Runs real-time on CPU with sub-100ms inference — light enough to embed directly in a product feature, not just a notebook demo.",
  },
  {
    id: "resume-bert",
    hfId: "Virajbane/resume-bert-model",
    hfUrl: "https://huggingface.co/Virajbane/resume-bert-model",
    title: "Resume–Job Matcher",
    subtitle: "BERT fine-tuned for semantic resume ranking",
    type: "Text Classification",
    modelSize: "110M params",
    badge: "NLP · Hiring AI",
    badgeColor: "#A1A1AA",
    accent: "#A1A1AA",
    description:
      "Fine-tuned BERT model that semantically compares a resume and job description, outputting a match probability. Goes beyond keyword matching — understands that 'REST APIs' means 'Backend Development'.",
    pipeline: "text-classification",
    baseModel: "bert-base-uncased",
    tags: ["PyTorch", "BERT", "Transfer Learning", "Recruitment AI", "Semantic Search"],
    metrics: [
      { label: "Task", value: "Match Score" },
      { label: "Base Model", value: "BERT" },
      { label: "Loss Fn", value: "Cross Entropy" },
      { label: "Model Size", value: "110M params" },
    ],
    architecture: [
      "Resume + JD",
      "Tokenizer",
      "BERT Encoder",
      "Classifier Layer",
      "Softmax",
      "Match %",
    ],
    codeSnippet: `from transformers import pipeline

matcher = pipeline(
  "text-classification",
  model="Virajbane/resume-bert-model"
)

result = matcher(resume + " [SEP] " + jd)
# [{'label': 'MATCH', 'score': 0.88}]`,
    demo: [
      { text: "React Dev Resume → React JD", label: "MATCH", score: 0.9, pos: true },
      { text: "Data Analyst → React JD", label: "NO MATCH", score: 0.36, pos: false },
      { text: "AI Engineer Resume → AI JD", label: "MATCH", score: 0.87, pos: true },
    ],
    highlight: "Trained to catch semantic overlap keyword matching misses — cuts manual resume screening time before a human ever opens the file.",
  },
];

/* ============================================================
   ARCHITECTURE FLOW
   ============================================================ */
function ArchFlow({ steps, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              padding: "5px 18px",
              borderRadius: "8px",
              fontSize: "11px",
              fontFamily: "'Space Mono', monospace",
              border: i === 0 || i === steps.length - 1
                ? `1px solid ${accent}55`
                : "1px solid #66666633",
              background: i === 0 || i === steps.length - 1
                ? `${accent}18`
                : "transparent",
              color: i === 0 || i === steps.length - 1 ? accent : "#D4D4D8",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <div style={{ color: "#666666", fontSize: "12px", lineHeight: 1, padding: "1px 0" }}>↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   IMPACT TOGGLE (expandable highlight, interactive accent)
   ============================================================ */
function ImpactToggle({ label = "Highlight", content, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #666666" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            width: "22px", height: "22px", borderRadius: "50%",
            border: `1px solid ${accent}55`, display: "flex",
            alignItems: "center", justifyContent: "center",
            color: accent, fontSize: "13px", fontWeight: 700, lineHeight: 1,
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            background: open ? `${accent}18` : "transparent",
          }}>+</span>
          <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600 }}>{label}</span>
        </div>
        <span style={{
          width: "9px", height: "9px", borderRadius: "50%",
          background: open ? accent : "#666666",
          boxShadow: open ? `0 0 10px ${accent}aa` : "none",
          transition: "all 0.3s ease",
        }} />
      </div>
      <div style={{
        maxHeight: open ? "160px" : "0px",
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease",
        marginTop: open ? "12px" : "0px",
      }}>
        <p style={{ color: "#D4D4D8", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
          {content}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   CARD CONNECTOR (decorative diagonal line between stacked cards)
   ============================================================ */
function CardConnector({ accent, flip }) {
  return (
    <div style={{ position: "relative", height: "26px", margin: "-2px 0", pointerEvents: "none" }}>
      <svg width="100%" height="26" style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}>
        <line
          x1={flip ? "72%" : "8%"}
          y1="0"
          x2={flip ? "38%" : "42%"}
          y2="26"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <circle
          cx={flip ? "38%" : "42%"}
          cy="26"
          r="2.5"
          fill={accent}
          opacity="0.6"
        />
      </svg>
    </div>
  );
}


function ModelCard({ model, index }) {
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const { canHover, tilt, springBack, onMove, onLeave } = useTilt(6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`,
        perspective: "1200px",
      }}
    >
      <div
        style={{
          transform: `translateY(${hovered ? -4 : 0}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: springBack
            ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease"
            : "transform 0.1s linear, border-color 0.3s ease, box-shadow 0.3s ease",
          background: "transparent",
          border: `1px solid ${hovered ? model.accent + "55" : "#666666"}`,
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered ? `0 12px 32px -12px ${model.accent}33` : "none",
        }}
      >
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${model.accent}88, transparent)`,
      }} />
      {canHover && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 0.06 : 0,
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, #FFFFFF, transparent 55%)`,
            transition: springBack ? "opacity 0.6s ease" : "opacity 0.2s ease",
          }}
        />
      )}

      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #666666" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{
                background: `${model.badgeColor}22`,
                color: model.accent,
                border: `1px solid ${model.accent}44`,
                borderRadius: "8px",
                padding: "3px 10px",
                fontSize: "11px",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.05em",
              }}>{model.badge}</span>
              <span style={{ color: "#A1A1AA", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>{model.type}</span>
            </div>
            <h2 style={{
              fontSize: "22px", fontWeight: 500, color: "#FFFFFF",
              fontFamily: "'Playfair Display', serif", margin: 0, marginBottom: "4px",
            }}>{model.title}</h2>
            <p style={{ color: "#A1A1AA", fontSize: "13px", margin: 0 }}>{model.subtitle}</p>
          </div>
          <a
            href={model.hfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "transparent", border: "1px solid #666666",
              borderRadius: "8px", padding: "8px 14px",
              color: "#D4D4D8", fontSize: "12px", textDecoration: "none",
              fontFamily: "'Space Mono', monospace",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = model.accent;
              e.currentTarget.style.color = model.accent;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#666666";
              e.currentTarget.style.color = "#D4D4D8";
            }}
          >
            <HFIcon color="currentColor" /> {model.hfId}
          </a>
        </div>

        <div style={{ display: "flex", gap: "4px", marginTop: "20px" }}>
          {["overview", "architecture", "code", "demo"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "none",
                background: tab === t ? `${model.accent}22` : "transparent",
                color: tab === t ? model.accent : "#A1A1AA",
                fontSize: "12px", cursor: "pointer", fontFamily: "'Space Mono', monospace",
                borderBottom: tab === t ? `2px solid ${model.accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        {tab === "overview" && (
          <div>
            <p style={{ color: "#D4D4D8", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              {model.description}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {model.metrics.map((m, i) => (
                <div key={i} style={{
                  background: "transparent", border: "1px solid #666666",
                  borderRadius: "8px", padding: "12px 14px",
                }}>
                  <div style={{ color: "#A1A1AA", fontSize: "11px", marginBottom: "4px", fontFamily: "'Space Mono', monospace" }}>{m.label}</div>
                  <div style={{ color: model.accent, fontSize: "15px", fontWeight: 700 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {model.tags.map((tag, i) => (
                <span key={i} style={{
                  background: "transparent", border: "1px solid #666666",
                  borderRadius: "8px", padding: "4px 10px",
                  color: "#A1A1AA", fontSize: "11px",
                  fontFamily: "'Space Mono', monospace",
                }}>{tag}</span>
              ))}
            </div>
            {model.highlight && (
              <ImpactToggle label="Why it matters" content={model.highlight} accent={model.accent} />
            )}
          </div>
        )}

        {tab === "architecture" && (
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
            <ArchFlow steps={model.architecture} accent={model.accent} />
          </div>
        )}

        {tab === "code" && (
          <div>
            <pre style={{
              background: "transparent",
              border: "1px solid #666666",
              borderRadius: "8px",
              padding: "20px",
              fontSize: "12px",
              fontFamily: "'Space Mono', monospace",
              color: "#D4D4D8",
              overflowX: "auto",
              lineHeight: 1.7,
              margin: 0,
            }}>
              <code style={{ color: "#FFFFFF" }}>{model.codeSnippet}</code>
            </pre>
          </div>
        )}

        {tab === "demo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ color: "#A1A1AA", fontSize: "12px", marginBottom: "4px", fontFamily: "'Space Mono', monospace" }}>
              Sample inference outputs (illustrative):
            </p>
            {model.demo.map((d, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "transparent", border: "1px solid #666666",
                borderRadius: "8px", padding: "12px 16px",
                flexWrap: "wrap", gap: "8px",
              }}>
                <span style={{ color: "#D4D4D8", fontSize: "13px", fontStyle: "italic" }}>"{d.text}"</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    background: "transparent",
                    color: d.pos ? "#FFFFFF" : "#A1A1AA",
                    border: `1px solid ${d.pos ? "#FFFFFF66" : "#66666666"}`,
                    borderRadius: "8px", padding: "3px 10px", fontSize: "11px",
                    fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  }}>{d.pos ? "✓ " : "✗ "}{d.label}</span>
                  <span style={{ color: model.accent, fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>
                    {Math.round(d.score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT (no internal hero header — parent page provides it)
   ============================================================ */
export default function ModelsPage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeaderVisible(true), 100); }, []);

  const skills = [
    { name: "Python", level: 92 },
    { name: "PyTorch", level: 80 },
    { name: "Transformers (HF)", level: 85 },
    { name: "BERT / DistilBERT", level: 82 },
    { name: "NLP / Text Classification", level: 88 },
    { name: "Fine-Tuning / MLOps", level: 78 },
    { name: "Transfer Learning", level: 80 },
    { name: "Hugging Face Hub", level: 85 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        .models-page {
          min-height: auto;
          background: transparent;
          font-family: 'Space Mono', monospace;
          position: relative;
        }
        .inner {
          position: relative;
          z-index: 1;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 10px;
          margin-top: 16px;
        }
        .skill-pill {
          background: transparent;
          border: 1px solid #666666;
          border-radius: 8px;
          padding: 12px 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .skill-pill:hover {
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="models-page">
        <div className="inner">

          {/* Model Cards */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "64px" }}>
            {models.map((model, i) => (
              <Fragment key={model.id}>
                <ModelCard model={model} index={i} />
                {i < models.length - 1 && (
                  <CardConnector accent={model.accent} flip={i % 2 === 1} />
                )}
              </Fragment>
            ))}
          </div>

          {/* Skills Section */}
          <div style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{
                color: "#A1A1AA", fontSize: "11px",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>AI &amp; ML Skills</span>
            </div>
            <h3 style={{
              color: "#FFFFFF", fontSize: "20px", fontWeight: 500,
              fontFamily: "'Playfair Display', serif", marginBottom: "4px",
            }}>
              Technical Stack
            </h3>
            <p style={{ color: "#A1A1AA", fontSize: "13px", marginBottom: "16px" }}>
              Tools and frameworks used across these projects
            </p>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i} className="skill-pill">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ color: "#D4D4D8", fontSize: "12px" }}>{skill.name}</span>
                    <span style={{ color: "#FFFFFF", fontSize: "11px", fontFamily: "'Space Mono', monospace" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "2px", background: "#666666", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{
                      width: headerVisible ? `${skill.level}%` : "0%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "2px",
                      transition: `width 1.2s ease ${0.5 + i * 0.07}s`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}