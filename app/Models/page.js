"use client";
import ModelsPage from "@/components/Modelspage";
import AgentsPage from "@/components/Agentspage";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import AnimatedFooter from "@/components/Footer";

function HFBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4D4D8" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10.5c.4-.6.9-1 1.6-1s1.2.4 1.6 1" strokeLinecap="round" />
      <path d="M11.8 10.5c.4-.6.9-1 1.6-1s1.2.4 1.6 1" strokeLinecap="round" />
      <path d="M8.5 14c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon({ color = "#E4E4E7" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
      <path d="M13 3 5 13.5h6.2L11 21l8-10.5h-6.2L13 3z" strokeLinejoin="round" />
    </svg>
  );
}

function page() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Head>
        <title>Viraj Bane | AI / ML Models & Agents</title>
        <meta
          name="description"
          content="AI/ML models by Viraj Bane on Hugging Face, and AI agents built with n8n"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container max-w-4xl mx-auto px-4 py-24 relative z-10">
        {/* ============ MODELS HERO HEADER ============ */}
        <section className="py-2 mb-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "1px solid #666666",
                borderRadius: "8px",
                padding: "5px 14px",
                marginBottom: "16px",
              }}
            >
              <HFBadgeIcon />
              <span style={{
                color: "#D4D4D8",
                fontSize: "12px",
                fontFamily: "'Space Mono', monospace",
              }}>
                open-source · hugging face
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontSize: "clamp(36px, 6vw, 40px)",
                fontWeight: 500,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "12px",
                lineHeight: 1.1,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              ML Models
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{
                color: "#A1A1AA",
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: 0,
              }}
            >
              Transformer models fine-tuned and deployed on Hugging Face Hub. Built
              with PyTorch, distilBERT &amp; BERT for real-world NLP tasks.
            </motion.p>

            {/* HF Profile link */}
            <motion.a
              href="https://huggingface.co/Virajbane"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "transparent",
                border: "1px solid #666666",
                borderRadius: "8px",
                padding: "10px 18px",
                marginTop: "20px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#FFFFFF"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#666666"}
            >
              <HFBadgeIcon />
              <span style={{ color: "#D4D4D8", fontSize: "13px", fontFamily: "'Space Mono', monospace" }}>huggingface.co/</span>
              <span style={{
                color: "#FFFFFF",
                fontSize: "13px",
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
              }}>Virajbane</span>
              <span style={{ color: "#A1A1AA", fontSize: "11px", marginLeft: "4px" }}>↗</span>
            </motion.a>
          </motion.div>
        </section>

        {/* Models Content */}
        <div className="mb-12">
          <ModelsPage />
        </div>

        {/* Divider between sections */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #666666, transparent)",
            margin: "72px 0 56px",
          }}
        />

        {/* ============ AGENTS HERO HEADER ============ */}
        <section className="py-2 mb-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge — slightly brighter tone to distinguish from Models badge, still monochrome */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "1px solid #A1A1AA",
                borderRadius: "8px",
                padding: "5px 14px",
                marginBottom: "16px",
              }}
            >
              <BoltIcon />
              <span style={{
                color: "#E4E4E7",
                fontSize: "12px",
                fontFamily: "'Space Mono', monospace",
              }}>
                automation · n8n
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontSize: "clamp(36px, 6vw, 40px)",
                fontWeight: 500,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "12px",
                lineHeight: 1.1,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              AI Agents
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{
                color: "#A1A1AA",
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              Multi-step automation agents built in n8n that chain form triggers,
              LLM reasoning, and real-world integrations — from resume generation
              to AI-scored job tracking.
            </motion.p>

            {/* n8n chip */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "transparent",
                border: "1px solid #666666",
                borderRadius: "8px",
                padding: "10px 18px",
                marginTop: "20px",
              }}
            >
              <BoltIcon />
              <span style={{ color: "#D4D4D8", fontSize: "13px", fontFamily: "'Space Mono', monospace" }}>built with</span>
              <span style={{
                color: "#FFFFFF",
                fontSize: "13px",
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
              }}>n8n</span>
            </motion.span>
          </motion.div>
        </section>

        {/* Agents Content */}
        <div className="mb-12">
          <AgentsPage />
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}

export default page;