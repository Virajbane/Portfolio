'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  { id: 1, type: 'Professional', title: '3rd Place – Video Editing Competition', issuer: 'VIVA Institute of Technology', date: 'April 2025', image: '/Certificates1.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'Won 3rd place in the Video Editing Competition during INGENIOUS 2025. Created an impactful video highlighting the key features and real-world relevance of our project "Eyes.AI." The video demonstrated accessibility-focused tech innovations aimed at empowering the blind community.', accent: '#f5f5f5' },
  { id: 2, type: 'Professional', title: '3rd Place – Poster Presentation Competition', issuer: 'VIVA Institute of Technology', date: 'April 2025', image: '/Certificates2.png', linkedIn: 'https://linkedin.com/in/yourprofile', description: 'Secured 3rd place in the Poster Presentation Competition at INGENIOUS 2025. Designed a visually compelling poster to communicate the concept and social impact of "Eyes.AI," a voice-driven AI solution for the visually impaired.', accent: '#e4e4e7' },
  { id: 3, type: 'Participation', title: 'Algorithm 9.0 Hackathon', issuer: 'Anjuman-I-Islam Kalsekar Technical', date: 'August 2024', image: '/Certificates6.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'A national-level 32-hour hackathon bringing together tech enthusiasts from across the country to innovate, build, and compete in software development.', accent: '#a1a1aa' },
  { id: 4, type: 'Participation', title: 'COHERENCE 25', issuer: 'Vidyavardhini College of Engineering and Technology', date: 'March 2025', image: '/Certificate8.png', linkedIn: 'https://linkedin.com/in/yourprofile', description: 'Intercollegiate hackathon organized under the Microsoft Learn Students Club in partnership with the Department of Computer and AI-DS at VCET.', accent: '#a1a1aa' },
  { id: 5, type: 'Professional', title: 'Python Internship', issuer: 'Branding Catalyst', date: 'July 2022 – August 2022', image: '/Certificates3.png', linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1715165301281/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Completed a 6-week internship working on Python-based automation scripts and backend utilities. Commended for being inquisitive, hardworking, and contributing actively to business-oriented development goals.', accent: '#d4d4d8' },
  { id: 6, type: 'Participation', title: "Mumbai Hacks – World's Largest Hackathon", issuer: 'Guinness World Records', date: 'November 2024', image: '/Certificates5.png', linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/', description: 'Guinness World Records™ attempt for "The most participants in a generative AI hackathon," organized by the Tech Entrepreneurs Association of Mumbai.', accent: '#a1a1aa' },
  { id: 7, type: 'Participation', title: '20th Aavishkar Research Convention', issuer: 'University of Mumbai', date: 'December 2025', image: '/1736625196035-85498598-694d-4993-84b7-52d395f215da__community_file_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411447717/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Presented "Eyes.AI – A Multimodal AI Framework for Assistive Cross-Application Workflow and Desktop Interaction" at the Zonal Round of the Aavishkar Inter-Collegiate Research Convention.', accent: '#a1a1aa' },
  { id: 8, type: 'Professional', title: 'Deep Learning Certification', issuer: 'IIT Ropar (NPTEL)', date: 'July 2025 – October 2025', image: '/Deep Learning - IIT Ropar_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411186006/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'A 12-week NPTEL-certified Deep Learning course by IIT Ropar. Earned Elite certification covering neural networks, CNNs, RNNs, and deep learning optimization techniques.', accent: '#f4f4f5' },
  { id: 9, type: 'Professional', title: 'Cyber Security Certification', issuer: 'Atos Prayas Foundation', date: 'July 2025 – August 2025', image: '/G4570-VIVA_Institute_of_Technology[1] (1)_page-0001.jpg', linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1766411347168/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q', description: 'Cyber Security training under the Atos Prayas Foundation Youth Empowerment Initiative. Awarded Grade B for successful completion of assessments and hands-on learning.', accent: '#d4d4d8' },
];

const FILTERS = ['All', 'Wins', 'Participation'];

function filterMatches(filter, cert) {
  if (filter === 'All') return true;
  if (filter === 'Wins') return cert.type === 'Professional';
  return cert.type === 'Participation';
}

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

// Ranges like "July 2025 – October 2025" are sorted by their end date.
function parseDateValue(dateStr) {
  const parts = dateStr.split(/[–-]/).map(s => s.trim());
  const latest = parts[parts.length - 1];
  const match = latest.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!match) return 0;
  const month = MONTHS[match[1].toLowerCase()] ?? 0;
  const year = parseInt(match[2], 10);
  return year * 12 + month;
}

const sortedCertificates = [...certificates].sort(
  (a, b) => parseDateValue(b.date) - parseDateValue(a.date)
);

// ── Header ──────────────────────────────────────────────────────────────
function Header({ filter, setFilter, counts }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-14 md:pt-44 md:pb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
        <div>
          <p className="text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4 font-mono">
            Credentials &amp; Recognition
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-white leading-[0.95]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Achievements
          </h2>
        </div>
        <p className="max-w-sm text-sm md:text-base text-zinc-400 leading-relaxed md:text-right">
          Competitions, certifications, and research presentations from across my work in AI and software development.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          {FILTERS.map(f => {
            const active = filter === f;
            const count = f === 'All' ? counts.total : f === 'Wins' ? counts.wins : counts.participation;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  color: active ? '#ffffff' : '#71717a',
                  borderBottom: active ? '1px solid #ffffff' : '1px solid transparent',
                }}
                className="text-xs font-mono uppercase tracking-wider pb-2 px-1 transition-colors hover:text-white"
              >
                {f} <span className="text-zinc-600">({count})</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] font-mono text-zinc-600 tracking-wide">
          {counts.total} credentials logged
        </p>
      </div>
    </div>
  );
}

// ── Single ledger row ─────────────────────────────────────────────────────
function CertRow({ cert, index, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[28px_1fr] md:grid-cols-[92px_28px_1fr] gap-x-4 md:gap-x-6 py-7"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* date column (desktop only) */}
      <div className="hidden md:block pt-1">
        <span className="text-[11px] font-mono text-zinc-500 tracking-wide">{cert.date}</span>
      </div>

      {/* rail + node */}
      <div className="relative flex justify-center">
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />
        <span
          className="relative mt-1.5 w-2.5 h-2.5 rounded-full"
          style={{
            background: '#050505',
            border: `2px solid ${cert.accent}`,
          }}
        />
      </div>

      {/* content */}
      <div>
        <div className="flex items-center gap-3 mb-2 md:hidden">
          <span className="text-[11px] font-mono text-zinc-500 tracking-wide">{cert.date}</span>
        </div>
        <span
          style={{ color: cert.type === 'Professional' ? cert.accent : '#a1a1aa' }}
          className="text-[10px] font-mono uppercase tracking-[0.15em]"
        >
          {cert.type === 'Professional' ? 'Winner' : 'Participant'}
        </span>

        <h3
          className="text-white font-semibold text-lg md:text-xl leading-snug mt-2 mb-1.5"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {cert.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-3">{cert.issuer}</p>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mb-4">
          {cert.description}
        </p>

        <button
          onClick={() => onSelect(cert)}
          style={{ color: cert.accent }}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity"
        >
          View certificate
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </motion.div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-[#050505] rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        initial={{ scale: 0.96, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 16, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-black flex items-center justify-center p-6 min-h-56">
            <img src={cert.image} alt={cert.title} className="max-h-72 w-full object-contain rounded-md" />
          </div>
          <div
            className="md:w-1/2 p-7 flex flex-col justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderLeft: 'none' }}
          >
            <div>
              <span
                style={{ color: cert.type === 'Professional' ? cert.accent : '#a1a1aa' }}
                className="text-[10px] font-mono uppercase tracking-[0.15em] mb-3 inline-block"
              >
                {cert.type === 'Professional' ? 'Winner' : 'Participant'}
              </span>
              <h3
                className="text-white font-bold text-xl leading-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {cert.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-4">{cert.issuer} · {cert.date}</p>
              <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <p className="text-zinc-300 text-sm leading-relaxed">{cert.description}</p>
            </div>
            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <a
                href={cert.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                style={{ background: cert.accent, color: '#050505' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                View on LinkedIn
              </a>
              <button
                onClick={onClose}
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white text-sm transition-colors"
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

// ── Root export ───────────────────────────────────────────────────────────
export default function Achievements() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const counts = useMemo(() => ({
    total: sortedCertificates.length,
    wins: sortedCertificates.filter(c => c.type === 'Professional').length,
    participation: sortedCertificates.filter(c => c.type === 'Participation').length,
  }), []);

  const visible = useMemo(
    () => sortedCertificates.filter(c => filterMatches(filter, c)),
    [filter]
  );

  return (
    <section className="w-full text-white relative">
      <Header filter={filter} setFilter={setFilter} counts={counts} />

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <AnimatePresence mode="popLayout">
          {visible.map((cert, i) => (
            <CertRow key={cert.id} cert={cert} index={i} onSelect={setSelected} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}