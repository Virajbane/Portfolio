'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const certificates = [
  {
    id: 1,
    type: 'Professional',
    title: '3rd Place – Video Editing Competition',
    issuer: 'VIVA Institute of Technology',
    date: 'April 2025',
    image: '/Certificates1.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'Won 3rd place in the Video Editing Competition during INGENIOUS 2025. Created an impactful video highlighting the key features and real-world relevance of our project "Eyes.AI." The video demonstrated accessibility-focused tech innovations aimed at empowering the blind community.',
  },
  {
    id: 2,
    type: 'Professional',
    title: '3rd Place – Poster Presentation Competition',
    issuer: 'VIVA Institute of Technology',
    date: 'April 2025',
    image: '/Certificates2.png',
    linkedIn: 'https://linkedin.com/in/yourprofile',
    description: 'Secured 3rd place in the Poster Presentation Competition at INGENIOUS 2025. Designed a visually compelling poster to communicate the concept and social impact of "Eyes.AI," a voice-driven AI solution for the visually impaired.',
  },
  {
    id: 3,
    type: 'Participation',
    title: 'Algorithm 9.0 Hackathon',
    issuer: 'Anjuman-I-Islam Kalsekar Technical',
    date: 'August 2024',
    image: '/Certificates6.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'ALGORITHM 9.0, a national-level 32-hour hackathon bringing together tech enthusiasts from across the country to innovate, build, and compete in software development.',
  },
  {
    id: 4,
    type: 'Participation',
    title: 'COHERENCE 25',
    issuer: 'Vidyavardhini College of Engineering and Technology',
    date: 'March 2025',
    image: '/Certificate8.png',
    linkedIn: 'https://linkedin.com/in/yourprofile',
    description: 'Intercollegiate hackathon organized under the Microsoft Learn Students Club in partnership with the Department of Computer and AI-DS at VCET.',
  },
  {
    id: 5,
    type: 'Professional',
    title: 'Python Internship',
    issuer: 'Branding Catalyst',
    date: 'July 2022 – August 2022',
    image: '/Certificates3.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1715165301281/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q',
    description: 'Completed a 6-week internship working on Python-based automation scripts and backend utilities. Commended for being inquisitive, hardworking, and contributing actively to business-oriented development goals.',
  },
  {
    id: 6,
    type: 'Participation',
    title: "Mumbai Hacks – World's Largest Hackathon",
    issuer: 'Guinness World Records',
    date: 'November 2024',
    image: '/Certificates5.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'Guinness World Records™ attempt for "The most participants in a generative AI hackathon," organized by Tech Entrepreneurs Association of Mumbai.',
  },
  {
    id: 7,
    type: 'Participation',
    title: '20th Aavishkar Research Convention',
    issuer: 'University of Mumbai',
    date: 'December 2025',
    image: '/1736625196035-85498598-694d-4993-84b7-52d395f215da__community_file_page-0001.jpg',
    linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411447717/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q',
    description: 'Presented "Eyes.AI – A Multimodal AI Framework for Assistive Cross-Application Workflow and Desktop Interaction" at the 20th Aavishkar Inter-Collegiate Research Convention (Zonal Round).',
  },
  {
    id: 8,
    type: 'Professional',
    title: 'Deep Learning Certification',
    issuer: 'IIT Ropar (NPTEL)',
    date: 'July 2025 – October 2025',
    image: '/Deep Learning - IIT Ropar_page-0001.jpg',
    linkedIn: 'https://www.linkedin.com/in/virubane/overlay/1766411186006/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q',
    description: '12-week NPTEL-certified Deep Learning course by IIT Ropar. Earned Elite certification covering neural networks, CNNs, RNNs, and deep learning optimization techniques.',
  },
  {
    id: 9,
    type: 'Professional',
    title: 'Cyber Security Certification',
    issuer: 'Atos Prayas Foundation',
    date: 'July 2025 – August 2025',
    image: '/G4570-VIVA_Institute_of_Technology[1] (1)_page-0001.jpg',
    linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1766411347168/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q',
    description: 'Cyber Security training under Atos Prayas Foundation Youth Empowerment Initiative. Awarded Grade B for successful completion of assessments and hands-on learning.',
  },
];

// ── Card ──────────────────────────────────────────────────────────────────
function CertCard({ cert, translate, onSelect }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/card h-80 w-96 relative shrink-0 cursor-pointer rounded-2xl overflow-hidden"
      onClick={() => onSelect(cert)}
    >
      <img
        src={cert.image}
        alt={cert.title}
        className="object-cover object-center absolute h-full w-full inset-0"
      />

      {/* dark overlay on hover */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/card:opacity-80 bg-black pointer-events-none transition-opacity duration-300" />

      {/* info revealed on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit mb-2 ${
          cert.type === 'Professional'
            ? 'bg-indigo-500 text-white'
            : 'bg-white/20 text-white'
        }`}>
          {cert.type === 'Professional' ? '🏆 Winner' : '🎯 Participation'}
        </span>
        <h3 className="text-white font-bold text-base leading-snug">{cert.title}</h3>
        <p className="text-gray-300 text-xs mt-1">{cert.issuer} · {cert.date}</p>
      </div>
    </motion.div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, letterSpacing: '0.15em' }}
        transition={{ duration: 0.7 }}
        className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4"
      >
        Credentials & Recognition
      </motion.p>
      <h1 className="text-3xl md:text-6xl font-bold text-white">
        My <br /> Achievements
      </h1>
      <p className="max-w-2xl text-sm md:text-lg mt-6 text-gray-300">
        A collection of certifications, hackathon wins, and competition results
        that mark my journey through AI, development, and research.
      </p>
    </div>
  );
}

// ── Parallax container ────────────────────────────────────────────────────
function CertParallax({ onSelect }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  const row1 = certificates.slice(0, 3);
  const row2 = certificates.slice(3, 6);
  const row3 = certificates.slice(6, 9);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* Row 1 — moves right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {row1.map(cert => (
            <CertCard key={cert.id} cert={cert} translate={translateX} onSelect={onSelect} />
          ))}
        </motion.div>

        {/* Row 2 — moves left */}
        <motion.div className="flex flex-row space-x-20 mb-20">
          {row2.map(cert => (
            <CertCard key={cert.id} cert={cert} translate={translateXReverse} onSelect={onSelect} />
          ))}
        </motion.div>

        {/* Row 3 — moves right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {row3.map(cert => (
            <CertCard key={cert.id} cert={cert} translate={translateX} onSelect={onSelect} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
          {/* image */}
          <div className="md:w-1/2 bg-black flex items-center justify-center p-4 min-h-56">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-72 w-full object-contain rounded-lg"
            />
          </div>

          {/* info */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block ${
                cert.type === 'Professional'
                  ? 'bg-indigo-500/30 text-indigo-300'
                  : 'bg-white/10 text-gray-300'
              }`}>
                {cert.type}
              </span>
              <h3 className="text-white font-bold text-xl leading-tight mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{cert.issuer} · {cert.date}</p>
              <div className="h-px bg-white/10 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
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
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
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

// ── Mobile grid ───────────────────────────────────────────────────────────
function MobileGrid({ onSelect }) {
  return (
    <div className="px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
          Credentials & Recognition
        </p>
        <h2 className="text-3xl font-bold text-white mb-4">My Achievements</h2>
        <div
          className="h-px w-16 mx-auto"
          style={{ background: 'linear-gradient(to right, transparent, #818cf8, transparent)' }}
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => onSelect(cert)}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-white/10"
            style={{ aspectRatio: '16/9' }}
          >
            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 inline-block ${
                cert.type === 'Professional' ? 'bg-indigo-500 text-white' : 'bg-white/20 text-white'
              }`}>
                {cert.type === 'Professional' ? '🏆 Winner' : '🎯 Participation'}
              </span>
              <h3 className="text-white font-semibold text-sm leading-tight">{cert.title}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{cert.date}</p>
            </div>
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