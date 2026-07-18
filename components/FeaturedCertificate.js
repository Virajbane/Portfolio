'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

// The 4 credentials most relevant to an AI/ML Engineer role, pulled from
// the full achievements list. Swap entries here if a stronger one comes along.
const highlights = [
  {
    tag: 'Elite Certification',
    title: 'Deep Learning Certification',
    issuer: 'IIT Ropar (NPTEL)',
    date: 'Jul – Oct 2025',
    description:
      '12-week Elite-certified course covering neural networks, CNNs, RNNs, and deep learning optimization.',
    accent: '#fbbf24',
  },
  {
    tag: 'Research Presentation',
    title: '20th Aavishkar Research Convention',
    issuer: 'University of Mumbai',
    date: 'Dec 2025',
    description:
      'Presented Eyes.AI, a multimodal AI framework for assistive cross-application workflow and desktop interaction.',
    accent: '#818cf8',
  },
  {
    tag: 'Participant',
    title: "Mumbai Hacks – World's Largest Hackathon",
    issuer: 'Guinness World Records attempt',
    date: 'Nov 2024',
    description:
      'Built an AI-powered EduTech platform using Ollama and Llama 3.2 among 5000+ developers nationwide.',
    accent: '#a1a1aa',
  },
  {
    tag: 'Grade B',
    title: 'Cyber Security Certification',
    issuer: 'Atos Prayas Foundation',
    date: 'Jul – Aug 2025',
    description:
      'Youth Empowerment Initiative training in cyber security fundamentals, assessments, and hands-on labs.',
    accent: '#fb7185',
  },
];

function TrophyIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
      <path d="M8 4H5a2 2 0 0 0 2 4" />
      <path d="M16 4h3a2 2 0 0 1-2 4" />
      <path d="M12 12v3" />
      <path d="M9 19h6" />
      <path d="M9.5 15h5l.5 4h-6l.5-4z" />
    </svg>
  );
}

export default function FeaturedCertificate() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3 text-indigo-400">
            Honors &amp; Certifications
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-8"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Credentials that back this up
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <div
                  className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center"
                  style={{ border: `1px solid ${item.accent}55` }}
                >
                  <TrophyIcon color={item.accent} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider"
                      style={{ color: item.accent }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-[10px] font-mono text-zinc-600">{item.date}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mb-2">{item.issuer}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-10 pt-6 flex justify-center md:justify-start"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Link
              href="/Achievements"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-zinc-300 hover:text-white transition-colors"
            >
              See all achievements
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}