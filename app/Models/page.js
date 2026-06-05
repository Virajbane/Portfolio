"use client";
import ModelsPage from "@/components/Modelspage";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import AnimatedFooter from "@/components/Footer";

function page() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen text-white bg-transparent">
      <Head>
        <title>Viraj Bane | AI / ML Models</title>
        <meta
          name="description"
          content="AI and ML models by Viraj Bane, published on Hugging Face"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container max-w-4xl mx-auto px-4 py-24 relative z-10">
        {/* Hero Header */}
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
                background: "#6366f111",
                border: "1px solid #6366f133",
                borderRadius: "8px",
                padding: "5px 14px",
                marginBottom: "16px",
              }}
            >
              <span style={{
                color: "#818cf8",
                fontSize: "12px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                🤖 open-source · hugging face
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontSize: "clamp(36px, 6vw, 40px)",
                fontWeight: 800,
                color: "#f1f5f9",
                margin: 0,
                marginBottom: "12px",
                lineHeight: 1.1,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              AI / ML Models
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{
                color: "#64748b",
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
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "10px 18px",
                marginTop: "20px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#ff9d0044"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e293b"}
            >
              <span style={{ fontSize: "18px" }}>🤗</span>
              <span style={{ color: "#94a3b8", fontSize: "13px" }}>huggingface.co/</span>
              <span style={{
                color: "#ff9d00",
                fontSize: "13px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}>Virajbane</span>
              <span style={{ color: "#475569", fontSize: "11px", marginLeft: "4px" }}>↗</span>
            </motion.a>
          </motion.div>
        </section>

        {/* Models Content */}
        <div className="mb-12">
          <ModelsPage />
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}

export default page;