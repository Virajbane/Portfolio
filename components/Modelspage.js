"use client";
import { useEffect, useRef, useState } from "react";

const models = [
  {
    id: "twitter-sentiment",
    hfId: "Virajbane/Twiiter-sentiment",
    hfUrl: "https://huggingface.co/Virajbane/Twiiter-sentiment",
    title: "Twitter Sentiment Analysis",
    subtitle: "DistilBERT fine-tuned on Sentiment140",
    type: "Text Classification",
    downloads: "67M",
    badge: "NLP",
    badgeColor: "#6366f1",
    accent: "#818cf8",
    description:
      "End-to-end sentiment classifier fine-tuned on 1.6M real tweets. Classifies any text as Positive or Negative with 89% accuracy. Supports real-time inference via Hugging Face pipeline.",
    pipeline: "text-classification",
    baseModel: "distilbert-base-uncased",
    tags: ["PyTorch", "Transformers", "DistilBERT", "NLP", "Fine-Tuning"],
    metrics: [
      { label: "Accuracy", value: "89%" },
      { label: "Base Model", value: "DistilBERT" },
      { label: "Dataset", value: "Sentiment140" },
      { label: "Downloads", value: "67M+" },
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
      { text: "Worst day ever 😞", label: "NEGATIVE", score: 0.96, pos: false },
      { text: "This is absolutely amazing!", label: "POSITIVE", score: 0.88, pos: true },
    ],
  },
  {
    id: "resume-bert",
    hfId: "Virajbane/resume-bert-model",
    hfUrl: "https://huggingface.co/Virajbane/resume-bert-model",
    title: "Resume–Job Matcher",
    subtitle: "BERT fine-tuned for semantic resume ranking",
    type: "Text Classification",
    downloads: "0.1B",
    badge: "NLP · Hiring AI",
    badgeColor: "#0ea5e9",
    accent: "#38bdf8",
    description:
      "Fine-tuned BERT model that semantically compares a resume and a job description, outputting a match probability. Goes beyond keyword matching — understands that 'REST APIs' means 'Backend Development'.",
    pipeline: "text-classification",
    baseModel: "bert-base-uncased",
    tags: ["PyTorch", "BERT", "Transfer Learning", "Recruitment AI", "Semantic Search"],
    metrics: [
      { label: "Task", value: "Match Score" },
      { label: "Base Model", value: "BERT" },
      { label: "Loss Fn", value: "Cross Entropy" },
      { label: "Output", value: "0–100%" },
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
  },
];

function ArchFlow({ steps, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              padding: "5px 18px",
              borderRadius: "6px",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              border: i === 0 || i === steps.length - 1
                ? `1px solid ${accent}55`
                : "1px solid #ffffff15",
              background: i === 0 || i === steps.length - 1
                ? `${accent}18`
                : "#ffffff08",
              color: i === 0 || i === steps.length - 1 ? accent : "#94a3b8",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <div style={{ color: "#334155", fontSize: "12px", lineHeight: 1, padding: "1px 0" }}>↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

function ModelCard({ model, index }) {
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.2}s, transform 0.7s ease ${index * 0.2}s`,
        background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
        border: "1px solid #1e293b",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Accent glow top */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${model.accent}88, transparent)`,
      }} />

      {/* Header */}
      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{
                background: `${model.badgeColor}22`,
                color: model.accent,
                border: `1px solid ${model.accent}44`,
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.05em",
              }}>{model.badge}</span>
              <span style={{ color: "#475569", fontSize: "12px" }}>{model.type}</span>
            </div>
            <h2 style={{
              fontSize: "22px", fontWeight: 700, color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif", margin: 0, marginBottom: "4px",
            }}>{model.title}</h2>
            <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{model.subtitle}</p>
          </div>
          <a
            href={model.hfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: "8px", padding: "8px 14px",
              color: "#94a3b8", fontSize: "12px", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = model.accent;
              e.currentTarget.style.color = model.accent;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            🤗 {model.hfId}
          </a>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginTop: "20px" }}>
          {["overview", "architecture", "code", "demo"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "none",
                background: tab === t ? `${model.accent}22` : "transparent",
                color: tab === t ? model.accent : "#475569",
                fontSize: "12px", cursor: "pointer", fontFamily: "inherit",
                borderBottom: tab === t ? `2px solid ${model.accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: "24px 32px" }}>
        {tab === "overview" && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              {model.description}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {model.metrics.map((m, i) => (
                <div key={i} style={{
                  background: "#0f172a", border: "1px solid #1e293b",
                  borderRadius: "10px", padding: "12px 14px",
                }}>
                  <div style={{ color: "#475569", fontSize: "11px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
                  <div style={{ color: model.accent, fontSize: "15px", fontWeight: 700 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {model.tags.map((tag, i) => (
                <span key={i} style={{
                  background: "#1e293b", border: "1px solid #334155",
                  borderRadius: "6px", padding: "4px 10px",
                  color: "#64748b", fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{tag}</span>
              ))}
            </div>
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
              background: "#080d16",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "20px",
              fontSize: "12px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#94a3b8",
              overflowX: "auto",
              lineHeight: 1.7,
              margin: 0,
            }}>
              <code style={{ color: "#e2e8f0" }}>{model.codeSnippet}</code>
            </pre>
          </div>
        )}

        {tab === "demo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
              Sample inference outputs:
            </p>
            {model.demo.map((d, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: "10px", padding: "12px 16px",
                flexWrap: "wrap", gap: "8px",
              }}>
                <span style={{ color: "#94a3b8", fontSize: "13px", fontStyle: "italic" }}>"{d.text}"</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    background: d.pos ? "#16a34a22" : "#dc262622",
                    color: d.pos ? "#4ade80" : "#f87171",
                    border: `1px solid ${d.pos ? "#16a34a44" : "#dc262644"}`,
                    borderRadius: "6px", padding: "3px 10px", fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                  }}>{d.label}</span>
                  <span style={{ color: model.accent, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                    {Math.round(d.score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModelsPage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeaderVisible(true), 100); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .models-page {
          min-height: 100vh;
          background: transparent;
          padding: 60px 24px 80px;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hf-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 10px 18px;
          width: fit-content;
          margin-bottom: 32px;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .hf-strip:hover { border-color: #ff9d0044; }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 10px;
          margin-top: 16px;
        }
        .skill-pill {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 10px;
          padding: 12px 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .skill-pill:hover {
          border-color: #334155;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="models-page">
        <div className="inner">

          {/* Model Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "64px" }}>
            {models.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} />
            ))}
          </div>

          {/* Skills Section */}
          <div style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <div style={{ marginBottom: "8px" }}>
              <span style={{
                color: "#475569", fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>AI &amp; ML Skills</span>
            </div>
            <h3 style={{ color: "#e2e8f0", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>
              Technical Stack
            </h3>
            <p style={{ color: "#475569", fontSize: "13px", marginBottom: "16px" }}>
              Tools and frameworks used across these projects
            </p>
            <div className="skills-grid">
              {[
                { name: "Python", level: 92, color: "#818cf8" },
                { name: "PyTorch", level: 80, color: "#f97316" },
                { name: "Transformers (HF)", level: 85, color: "#38bdf8" },
                { name: "BERT / DistilBERT", level: 82, color: "#34d399" },
                { name: "NLP / Text Classification", level: 88, color: "#a78bfa" },
                { name: "Fine-Tuning / MLOps", level: 78, color: "#fb7185" },
                { name: "Transfer Learning", level: 80, color: "#fbbf24" },
                { name: "Hugging Face Hub", level: 85, color: "#ff9d00" },
              ].map((skill, i) => (
                <div key={i} className="skill-pill">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ color: "#94a3b8", fontSize: "12px" }}>{skill.name}</span>
                    <span style={{ color: skill.color, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "2px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{
                      width: headerVisible ? `${skill.level}%` : "0%",
                      height: "100%",
                      background: skill.color,
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