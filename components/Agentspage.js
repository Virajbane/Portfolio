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
   N8N AGENTS DATA
   Accents are now grayscale — each agent keeps a distinct shade
   of white so the two cards still read as separate, without
   introducing hue.
   ============================================================ */
const agents = [
  {
    id: "jd-to-resume",
    title: "JD → Resume Generator",
    subtitle: "Auto-tailors your resume to any job description and exports a PDF",
    badge: "Automation · n8n",
    badgeColor: "#ffffff",
    accent: "#ffffff",
    type: "Form → LLM → PDF",
    description:
      "An n8n agent that takes a job description and your existing resume (PDF upload), extracts the resume text, and prompts an LLM to rewrite a tailored version matched to the JD — restructured summary, reordered skills, and rewritten bullet points. The tailored JSON is rendered into a styled HTML resume, then converted to a downloadable PDF via a headless Chromium service.",
    stats: [
      { label: "Trigger", value: "Form Submit" },
      { label: "LLM", value: "Llama 3.3 70B" },
      { label: "Nodes", value: "7" },
      { label: "Output", value: "PDF Resume" },
    ],
    tags: ["n8n", "Groq", "Llama 3.3 70B", "PDF Generation", "Prompt Engineering", "HTML Templating"],
    nodes: [
      { icon: "📝", name: "On Form Submission", type: "Form Trigger" },
      { icon: "📄", name: "Extract from File", type: "PDF → Text" },
      { icon: "💻", name: "Build Prompt", type: "Code (JS)" },
      { icon: "🌐", name: "Groq Chat Completion", type: "HTTP Request" },
      { icon: "💻", name: "Generate HTML Resume", type: "Code (JS)" },
      { icon: "📦", name: "Convert to File", type: "JSON → HTML File" },
      { icon: "🌐", name: "Chromium Render", type: "HTTP Request → PDF" },
    ],
    codeSnippet: `// Build the LLM prompt from form + parsed resume
const jd = $('On form submission')
  .item.json['Job Description'].slice(0, 2000);
const resumeText = $('Extract from File')
  .item.json.text.slice(0, 3000);

const body = {
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system",
      content: "You are an expert resume writer. " +
               "Return ONLY valid JSON, no markdown." },
    { role: "user",
      content: \`JD: \${jd}\\n\\nResume: \${resumeText}\\n\\n
Create a tailored resume JSON with keys: name, summary,
skills, experience, projects, education, certifications\` }
  ]
};

return [{ json: { body: JSON.stringify(body) } }];`,
    demo: [
      { label: "Input", value: "JD + existing resume PDF" },
      { label: "Rewritten Summary", value: "Tailored to JD keywords" },
      { label: "Experience Bullets", value: "3–4 per role, JD-aligned" },
      { label: "Output Format", value: "Formatted PDF (Chromium)" },
    ],
    highlight: "Turns a 20-minute manual resume rewrite into a single form submission — tailored, formatted, and PDF-ready in under 30 seconds.",
  },
  {
    id: "jd-tracker",
    title: "JD Application Tracker",
    subtitle: "Analyzes job fit with Gemini and logs it straight to Google Sheets",
    badge: "Automation · n8n",
    badgeColor: "#a1a1aa",
    accent: "#a1a1aa",
    type: "Form → LLM Analysis → Sheets",
    description:
      "An n8n agent that turns pasting a job description into a fully logged application. It sends the JD alongside your resume to Gemini, which extracts company, role, compensation, location, and a 0–100 match score, plus missing keywords and key requirements. The parsed result is appended as a new row to a Google Sheet — a self-updating job application tracker with AI-scored fit for every role.",
    stats: [
      { label: "Trigger", value: "Form Submit" },
      { label: "LLM", value: "Gemini 3.5 Flash" },
      { label: "Nodes", value: "5" },
      { label: "Output", value: "Google Sheets Row" },
    ],
    tags: ["n8n", "Gemini", "Google Sheets API", "JSON Parsing", "Job Match Scoring"],
    nodes: [
      { icon: "📝", name: "On Form Submission", type: "Form Trigger" },
      { icon: "⚙️", name: "Add Resume Text", type: "Set / Edit Fields" },
      { icon: "🌐", name: "Ask Gemini to Analyze JD", type: "HTTP Request" },
      { icon: "💻", name: "Parse AI Response", type: "Code (JS)" },
      { icon: "📊", name: "Add Row to Google Sheet", type: "Google Sheets" },
    ],
    codeSnippet: `// Parse Gemini's structured JSON response
const raw = item.json.candidates?.[0]
  ?.content?.parts?.[0]?.text || '';
const cleaned = raw.replace(/\`\`\`json|\`\`\`/g, '').trim();
const parsed = JSON.parse(cleaned);

return [{
  json: {
    'Date Applied': new Date().toISOString().split('T')[0],
    'Company': parsed.company,
    'Role': parsed.role,
    'Match Score (%)': parsed.match_score,
    'Missing Keywords': parsed.missing_keywords.join(', '),
    'Key Requirements': parsed.key_requirements.join(', '),
    'Notes': parsed.notes
  }
}];`,
    demo: [
      { label: "Match Score", value: "82 / 100" },
      { label: "Missing Keywords", value: "Kubernetes, GraphQL" },
      { label: "Key Requirements", value: "5–8 extracted per JD" },
      { label: "Logged To", value: "Google Sheets (auto row)" },
    ],
    highlight: "Replaces a manually-updated spreadsheet with a zero-touch tracker — paste a JD once and get a scored, searchable application log for free.",
  },
];

/* ============================================================
   N8N-STYLE NODE FLOW
   ============================================================ */
function AgentNodeFlow({ nodes, accent }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "8px 0",
      }}
    >
      {nodes.map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#000000",
              border: `1px solid ${accent}33`,
              borderLeft: `3px solid ${accent}`,
              borderRadius: "8px",
              padding: "10px 14px",
              minWidth: "150px",
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>{n.icon}</span>
            <div>
              <div style={{ color: "#f5f5f5", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                {n.name}
              </div>
              <div
                style={{
                  color: "#a1a1aa",
                  fontSize: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                  whiteSpace: "nowrap",
                }}
              >
                {n.type}
              </div>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <span style={{ color: "#262626", fontSize: "16px" }}>→</span>
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
    <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #181818" }}>
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
          <span style={{ color: "#f5f5f5", fontSize: "13px", fontWeight: 600 }}>{label}</span>
        </div>
        <span style={{
          width: "9px", height: "9px", borderRadius: "50%",
          background: open ? accent : "#262626",
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
        <p style={{ color: "#d4d4d8", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
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

/* ============================================================
   AGENT CARD
   ============================================================ */
function AgentCard({ agent, index }) {
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
          background: "linear-gradient(135deg, #000000 0%, #050505 100%)",
          border: `1px solid ${hovered ? agent.accent + "55" : "#181818"}`,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered ? `0 12px 32px -12px ${agent.accent}33` : "none",
        }}
      >
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${agent.accent}88, transparent)`,
      }} />
      {canHover && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 0.06 : 0,
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, #ffffff, transparent 55%)`,
            transition: springBack ? "opacity 0.6s ease" : "opacity 0.2s ease",
          }}
        />
      )}

      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #181818" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{
                background: `${agent.badgeColor}22`,
                color: agent.accent,
                border: `1px solid ${agent.accent}44`,
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.05em",
              }}>{agent.badge}</span>
              <span style={{ color: "#71717a", fontSize: "12px" }}>{agent.type}</span>
            </div>
            <h2 style={{
              fontSize: "22px", fontWeight: 700, color: "#fafafa",
              fontFamily: "'Syne', sans-serif", margin: 0, marginBottom: "4px",
            }}>{agent.title}</h2>
            <p style={{ color: "#a1a1aa", fontSize: "13px", margin: 0 }}>{agent.subtitle}</p>
          </div>
          <span
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#181818", border: "1px solid #262626",
              borderRadius: "8px", padding: "8px 14px",
              color: "#d4d4d8", fontSize: "12px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ⚡ n8n workflow
          </span>
        </div>

        <div style={{ display: "flex", gap: "4px", marginTop: "20px" }}>
          {["overview", "architecture", "code", "demo"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "none",
                background: tab === t ? `${agent.accent}22` : "transparent",
                color: tab === t ? agent.accent : "#71717a",
                fontSize: "12px", cursor: "pointer", fontFamily: "inherit",
                borderBottom: tab === t ? `2px solid ${agent.accent}` : "2px solid transparent",
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
            <p style={{ color: "#d4d4d8", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              {agent.description}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {agent.stats.map((m, i) => (
                <div key={i} style={{
                  background: "#000000", border: "1px solid #181818",
                  borderRadius: "10px", padding: "12px 14px",
                }}>
                  <div style={{ color: "#71717a", fontSize: "11px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
                  <div style={{ color: agent.accent, fontSize: "15px", fontWeight: 700 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {agent.tags.map((tag, i) => (
                <span key={i} style={{
                  background: "#181818", border: "1px solid #262626",
                  borderRadius: "6px", padding: "4px 10px",
                  color: "#a1a1aa", fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{tag}</span>
              ))}
            </div>
            {agent.highlight && (
              <ImpactToggle label="Why it matters" content={agent.highlight} accent={agent.accent} />
            )}
          </div>
        )}

        {tab === "architecture" && (
          <div style={{ padding: "12px 0" }}>
            <AgentNodeFlow nodes={agent.nodes} accent={agent.accent} />
          </div>
        )}

        {tab === "code" && (
          <div>
            <pre style={{
              background: "#000000",
              border: "1px solid #181818",
              borderRadius: "12px",
              padding: "20px",
              fontSize: "12px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#d4d4d8",
              overflowX: "auto",
              lineHeight: 1.7,
              margin: 0,
            }}>
              <code style={{ color: "#f5f5f5" }}>{agent.codeSnippet}</code>
            </pre>
          </div>
        )}

        {tab === "demo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ color: "#71717a", fontSize: "12px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
              Sample run output (illustrative):
            </p>
            {agent.demo.map((d, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#000000", border: "1px solid #181818",
                borderRadius: "10px", padding: "12px 16px",
                flexWrap: "wrap", gap: "8px",
              }}>
                <span style={{ color: "#a1a1aa", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>{d.label}</span>
                <span style={{ color: agent.accent, fontSize: "13px", fontWeight: 700 }}>{d.value}</span>
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
export default function AgentsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .agents-page {
          min-height: auto;
          background: transparent;
          font-family: 'Syne', sans-serif;
          position: relative;
        }
        .inner {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="agents-page">
        <div className="inner">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {agents.map((agent, i) => (
              <Fragment key={agent.id}>
                <AgentCard agent={agent} index={i} />
                {i < agents.length - 1 && (
                  <CardConnector accent={agent.accent} flip={i % 2 === 1} />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}