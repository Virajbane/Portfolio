"use client";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   N8N AGENTS DATA
   ============================================================ */
const agents = [
  {
    id: "jd-to-resume",
    title: "JD → Resume Generator",
    subtitle: "Auto-tailors your resume to any job description and exports a PDF",
    badge: "Automation · n8n",
    badgeColor: "#ff6d5a",
    accent: "#ff8a75",
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
  },
  {
    id: "jd-tracker",
    title: "JD Application Tracker",
    subtitle: "Analyzes job fit with Gemini and logs it straight to Google Sheets",
    badge: "Automation · n8n",
    badgeColor: "#f97316",
    accent: "#fb923c",
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
              background: "#0f172a",
              border: `1px solid ${accent}33`,
              borderLeft: `3px solid ${accent}`,
              borderRadius: "8px",
              padding: "10px 14px",
              minWidth: "150px",
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>{n.icon}</span>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                {n.name}
              </div>
              <div
                style={{
                  color: "#64748b",
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
            <span style={{ color: "#334155", fontSize: "16px" }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   AGENT CARD
   ============================================================ */
function AgentCard({ agent, index }) {
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
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${agent.accent}88, transparent)`,
      }} />

      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid #1e293b" }}>
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
              <span style={{ color: "#475569", fontSize: "12px" }}>{agent.type}</span>
            </div>
            <h2 style={{
              fontSize: "22px", fontWeight: 700, color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif", margin: 0, marginBottom: "4px",
            }}>{agent.title}</h2>
            <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{agent.subtitle}</p>
          </div>
          <span
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#1e293b", border: "1px solid #334155",
              borderRadius: "8px", padding: "8px 14px",
              color: "#94a3b8", fontSize: "12px",
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
                color: tab === t ? agent.accent : "#475569",
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
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              {agent.description}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {agent.stats.map((m, i) => (
                <div key={i} style={{
                  background: "#0f172a", border: "1px solid #1e293b",
                  borderRadius: "10px", padding: "12px 14px",
                }}>
                  <div style={{ color: "#475569", fontSize: "11px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>{m.label}</div>
                  <div style={{ color: agent.accent, fontSize: "15px", fontWeight: 700 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {agent.tags.map((tag, i) => (
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
          <div style={{ padding: "12px 0" }}>
            <AgentNodeFlow nodes={agent.nodes} accent={agent.accent} />
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
              <code style={{ color: "#e2e8f0" }}>{agent.codeSnippet}</code>
            </pre>
          </div>
        )}

        {tab === "demo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
              Sample run output (illustrative):
            </p>
            {agent.demo.map((d, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#0f172a", border: "1px solid #1e293b",
                borderRadius: "10px", padding: "12px 16px",
                flexWrap: "wrap", gap: "8px",
              }}>
                <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>{d.label}</span>
                <span style={{ color: agent.accent, fontSize: "13px", fontWeight: 700 }}>{d.value}</span>
              </div>
            ))}
          </div>
        )}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {agents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}