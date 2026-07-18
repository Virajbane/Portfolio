'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const highlights = [
  {
    tag: 'Elite Certification',
    title: 'Deep Learning Certification',
    issuer: 'IIT Ropar (NPTEL)',
    date: 'Jul – Oct 2025',
    description: '12-week Elite-certified course covering neural networks, CNNs, RNNs, and deep learning optimization.',
    accent: '#FFFFFF',
    icon: 'certificate',
  },
  {
    tag: 'Research Presentation',
    title: '20th Aavishkar Research Convention',
    issuer: 'University of Mumbai',
    date: 'Dec 2025',
    description: 'Presented Eyes.AI, a multimodal AI framework for assistive cross-application workflow and desktop interaction.',
    accent: '#A1A1AA',
    icon: 'paper',
  },
  {
    tag: 'Participant',
    title: "Mumbai Hacks – World's Largest Hackathon",
    issuer: 'Guinness World Records attempt',
    date: 'Nov 2024',
    description: 'Built an AI-powered EduTech platform using Ollama and Llama 3.2 among 5000+ developers nationwide.',
    accent: '#A1A1AA',
    icon: 'trophy',
  },
  {
    tag: 'Grade B',
    title: 'Cyber Security Certification',
    issuer: 'Atos Prayas Foundation',
    date: 'Jul – Aug 2025',
    description: 'Youth Empowerment Initiative training in cyber security fundamentals, assessments, and hands-on labs.',
    accent: '#D4D4D8',
    icon: 'shield',
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

function CertificateIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M7 8h10" />
      <path d="M7 11h6" />
      <circle cx="9" cy="18.5" r="2.3" />
      <path d="M7.5 20.3 6.8 23l2.2-1.1L11.2 23l-.7-2.7" />
    </svg>
  );
}

function PaperIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 13h5" />
      <path d="M9.5 16.5h5" />
      <path d="M9.5 9.5h2" />
    </svg>
  );
}

function ShieldIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M12 3.5 19 6.5v5.5c0 4.6-3 7.9-7 8.5-4-0.6-7-3.9-7-8.5V6.5L12 3.5z" />
      <path d="M9.2 12.3l1.9 1.9 3.7-3.9" />
    </svg>
  );
}

const ICONS = {
  trophy: TrophyIcon,
  certificate: CertificateIcon,
  paper: PaperIcon,
  shield: ShieldIcon,
};

export default function FeaturedCertificate() {
  return (
    <section className="py-10 sm:py-14" style={{ background: 'transparent' }}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}
          >
            Honors &amp; Certifications
          </p>
          <h2
            className="text-2xl sm:text-3xl mb-8"
            style={{ color: '#FFFFFF', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            Credentials that back this up
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {highlights.map((item, i) => {
              const Icon = ICONS[item.icon] || TrophyIcon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex gap-4"
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center"
                    style={{ border: `1px solid ${item.accent}55`, borderRadius: '8px', background: 'transparent' }}
                  >
                    <Icon color={item.accent} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: item.accent, fontFamily: "'Space Mono', monospace" }}
                      >
                        {item.tag}
                      </span>
                      <span style={{ color: '#666666' }}>·</span>
                      <span className="text-[10px]" style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}>
                        {item.date}
                      </span>
                    </div>
                    <h3
                      className="text-base leading-snug mb-1"
                      style={{ color: '#FFFFFF', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: '#A1A1AA' }}>{item.issuer}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            className="mt-10 pt-6 flex justify-center md:justify-start"
            style={{ borderTop: '1px solid #666666' }}
          >
            <Link
              href="/Achievements"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide transition-colors"
              style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
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