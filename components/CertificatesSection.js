'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const certificates = [
  { id: 1, type: 'Professional', title: '3rd Place – Video Editing Competition', issuer: 'VIVA Institute of Technology', date: 'April 2025', image: '/Certificates1.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'Won 3rd place in the Video Editing Competition during INGENIOUS 2025. Created an impactful video highlighting the key features and real-world relevance of our project "Eyes.AI." The video demonstrated accessibility-focused tech innovations aimed at empowering the blind community.', accent: '#818cf8' },
  { id: 2, type: 'Professional', title: '3rd Place – Poster Presentation Competition', issuer: 'VIVA Institute of Technology', date: 'April 2025', image: '/Certificates2.png', linkedIn: 'https://linkedin.com/in/yourprofile', description: 'Secured 3rd place in the Poster Presentation Competition at INGENIOUS 2025. Designed a visually compelling poster to communicate the concept and social impact of "Eyes.AI," a voice-driven AI solution for the visually impaired.', accent: '#38bdf8' },
  { id: 3, type: 'Participation', title: 'Algorithm 9.0 Hackathon', issuer: 'Anjuman-I-Islam Kalsekar Technical', date: 'August 2024', image: '/Certificates6.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'ALGORITHM 9.0, a national-level 32-hour hackathon bringing together tech enthusiasts from across the country to innovate, build, and compete in software development.', accent: '#a1a1aa' },
  { id: 4, type: 'Participation', title: 'COHERENCE 25', issuer: 'Vidyavardhini College of Engineering and Technology', date: 'March 2025', image: '/Certificate8.png', linkedIn: 'https://linkedin.com/in/yourprofile', description: 'Intercollegiate hackathon organized under the Microsoft Learn Students Club in partnership with the Department of Computer and AI-DS at VCET.', accent: '#a1a1aa' },
  { id: 5, type: 'Professional', title: 'Python Internship', issuer: 'Branding Catalyst', date: 'July 2022 – August 2022', image: '/Certificates3.png', linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1715165301281/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Completed a 6-week internship working on Python-based automation scripts and backend utilities. Commended for being inquisitive, hardworking, and contributing actively to business-oriented development goals.', accent: '#34d399' },
  { id: 6, type: 'Participation', title: "Mumbai Hacks – World's Largest Hackathon", issuer: 'Guinness World Records', date: 'November 2024', image: '/Certificates5.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'Guinness World Records™ attempt for "The most participants in a generative AI hackathon," organized by Tech Entrepreneurs Association of Mumbai.', accent: '#a1a1aa' },
  { id: 7, type: 'Participation', title: '20th Aavishkar Research Convention', issuer: 'University of Mumbai', date: 'December 2025', image: '/1736625196035-85498598-694d-4993-84b7-52d395f215da__community_file_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411447717/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Presented "Eyes.AI – A Multimodal AI Framework for Assistive Cross-Application Workflow and Desktop Interaction" at the 20th Aavishkar Inter-Collegiate Research Convention (Zonal Round).', accent: '#a1a1aa' },
  { id: 8, type: 'Professional', title: 'Deep Learning Certification', issuer: 'IIT Ropar (NPTEL)', date: 'July 2025 – October 2025', image: '/Deep Learning - IIT Ropar_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411186006/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: '12-week NPTEL-certified Deep Learning course by IIT Ropar. Earned Elite certification covering neural networks, CNNs, RNNs, and deep learning optimization techniques.', accent: '#fbbf24' },
  { id: 9, type: 'Professional', title: 'Cyber Security Certification', issuer: 'Atos Prayas Foundation', date: 'July 2025 – August 2025', image: '/G4570-VIVA_Institute_of_Technology[1] (1)_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1766411347168/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Cyber Security training under Atos Prayas Foundation Youth Empowerment Initiative. Awarded Grade B for successful completion of assessments and hands-on learning.', accent: '#fb7185' },
];

// ── Info-only credential card (no image) ────────────────────────────────
function CertCard({ cert, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(cert)}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #050505 100%)',
        border: `1px solid ${hovered ? cert.accent + '55' : '#181818'}`,
        borderLeft: `3px solid ${cert.accent}`,
        boxShadow: hovered ? `0 12px 32px -12px ${cert.accent}33` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="h-56 w-80 shrink-0 rounded-xl cursor-pointer p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            style={{
              background: cert.type === 'Professional' ? `${cert.accent}22` : '#ffffff0d',
              color: cert.type === 'Professional' ? cert.accent : '#a1a1aa',
              border: `1px solid ${cert.type === 'Professional' ? cert.accent + '44' : '#ffffff1a'}`,
            }}
            className="text-[10px] font-mono tracking-wide rounded-md px-2 py-1"
          >
            {cert.type === 'Professional' ? '🏆 WINNER' : '🎯 PARTICIPATION'}
          </span>
        </div>
        <h3 className="text-white font-bold text-base leading-snug mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          {cert.title}
        </h3>
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
          {cert.issuer}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-[11px] text-zinc-500 font-mono">{cert.date}</span>
        <span
          style={{ color: cert.accent }}
          className="text-[11px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100"
        >
          View →
        </span>
      </div>
    </motion.div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div className="max-w-7xl relative mx-auto pt-40 pb-16 md:pt-56 md:pb-24 px-4 w-full">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, letterSpacing: '0.15em' }}
        transition={{ duration: 0.7 }}
        className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4 font-mono"
      >
        Credentials & Recognition
      </motion.p>
      <h1 className="text-3xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
        My <br /> Achievements
      </h1>
      <p className="max-w-2xl text-sm md:text-lg mt-6 text-zinc-400">
        A collection of certifications, hackathon wins, and competition results
        that mark my journey through AI, development, and research.
      </p>
    </div>
  );
}

// ── Row with its own scroll trigger ─────────────────────────────────────
function CertRow({ certs, direction, reverse, onSelect }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 55%'],
  });

  const springConfig = { stiffness: 260, damping: 30 };
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [direction * 220, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={`group flex ${reverse ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-8 mb-8 w-max max-w-full mx-auto`}
    >
      {certs.map(cert => (
        <CertCard key={cert.id} cert={cert} onSelect={onSelect} />
      ))}
    </motion.div>
  );
}

function CertParallax({ onSelect }) {
  const row1 = certificates.slice(0, 3);
  const row2 = certificates.slice(3, 6);
  const row3 = certificates.slice(6, 9);

  return (
    <div className="relative z-0 overflow-hidden antialiased">
      <Header />
      <div className="pb-8">
        <CertRow certs={row1} direction={1}  reverse={true}  onSelect={onSelect} />
        <CertRow certs={row2} direction={-1} reverse={false} onSelect={onSelect} />
        <CertRow certs={row3} direction={1}  reverse={true}  onSelect={onSelect} />
      </div>
    </div>
  );
}

// ── Modal (still shows image here, for verification) ────────────────────
function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-black flex items-center justify-center p-4 min-h-56">
            <img src={cert.image} alt={cert.title} className="max-h-72 w-full object-contain rounded-lg" />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <span
                style={{
                  background: cert.type === 'Professional' ? `${cert.accent}22` : '#ffffff1a',
                  color: cert.type === 'Professional' ? cert.accent : '#d4d4d8',
                }}
                className="text-xs font-mono px-2 py-0.5 rounded-full mb-3 inline-block"
              >
                {cert.type}
              </span>
              <h3 className="text-white font-bold text-xl leading-tight mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                {cert.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-4">{cert.issuer} · {cert.date}</p>
              <div className="h-px bg-white/10 mb-4" />
              <p className="text-zinc-300 text-sm leading-relaxed">{cert.description}</p>
            </div>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <a
                href={cert.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                View on LinkedIn
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Mobile list (info-only, no image) ────────────────────────────────────
function MobileGrid({ onSelect }) {
  return (
    <div className="px-4 pt-32 pb-16">
      <div className="text-center mb-10">
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
          Credentials & Recognition
        </p>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>My Achievements</h2>
        <div className="h-px w-16 mx-auto" style={{ background: 'linear-gradient(to right, transparent, #818cf8, transparent)' }} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => onSelect(cert)}
            style={{
              background: 'linear-gradient(135deg, #000000 0%, #050505 100%)',
              border: '1px solid #181818',
              borderLeft: `3px solid ${cert.accent}`,
            }}
            className="rounded-xl p-4 cursor-pointer"
          >
            <span
              style={{
                background: cert.type === 'Professional' ? `${cert.accent}22` : '#ffffff0d',
                color: cert.type === 'Professional' ? cert.accent : '#a1a1aa',
              }}
              className="text-[10px] font-mono tracking-wide rounded-md px-2 py-1 inline-block mb-2"
            >
              {cert.type === 'Professional' ? '🏆 WINNER' : '🎯 PARTICIPATION'}
            </span>
            <h3 className="text-white font-semibold text-sm leading-tight mb-1">{cert.title}</h3>
            <p className="text-zinc-400 text-xs mb-2">{cert.issuer}</p>
            <p className="text-zinc-500 text-[11px] font-mono">{cert.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────
export default function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="w-full text-white relative">
      <div className="hidden md:block">
        <CertParallax onSelect={setSelected} />
      </div>
      <div className="block md:hidden">
        <MobileGrid onSelect={setSelected} />
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}