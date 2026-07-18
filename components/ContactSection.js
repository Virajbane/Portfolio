// ContactSection.js
"use client"
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Instagram, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAnimate } from 'framer-motion';



// ─── Clip-path constants ───────────────────────────────────────────────────
const NO_CLIP          = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP   = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP    = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left:   [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top:    [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right:  [TOP_LEFT_CLIP,     NO_CLIP],
};
const EXIT_KEYFRAMES = {
  left:   [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top:    [NO_CLIP, TOP_RIGHT_CLIP],
  right:  [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const CONTACT_EMAIL = 'virajbane2004@gmail.com';

// ─── LinkBox ────────────────────────────────────────────────────────────────
const LinkBox = ({ Icon, href, label, imgSrc, imgClassName }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    return [
      { proximity: Math.abs(box.left   - e.clientX), side: "left"   },
      { proximity: Math.abs(box.right  - e.clientX), side: "right"  },
      { proximity: Math.abs(box.top    - e.clientY), side: "top"    },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" },
    ].sort((a, b) => a.proximity - b.proximity)[0].side;
  };

  const handleMouseEnter = (e) => animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] });
  const handleMouseLeave = (e) => animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] });

  const Content = ({ inverted }) => (
    <div className="flex flex-col items-center gap-1.5">
      {imgSrc ? (
        <img src={imgSrc} alt={label} className={`${imgClassName ?? 'h-8 w-auto object-contain'} ${inverted ? 'brightness-0 invert' : ''}`} />
      ) : (
        Icon && <Icon size={28} className={inverted ? 'text-black' : 'text-white'} />
      )}
      {label && (
        <span className={`text-[10px] font-mono tracking-wide ${inverted ? 'text-black/70' : 'text-white/50'}`}>
          {label}
        </span>
      )}
    </div>
  );

  return (
    <a
    
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 sm:h-24 w-full place-content-center bg-black overflow-hidden"
    >
      <Content inverted={false} />
      <div ref={scope} style={{ clipPath: BOTTOM_RIGHT_CLIP }} className="absolute inset-0 grid place-content-center bg-white">
        <Content inverted={true} />
      </div>
    </a>
  );
};

const ClipPathLinks = () => (
  <div className="grid grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-lg overflow-hidden">
    <LinkBox Icon={Mail}      href={`mailto:${CONTACT_EMAIL}`}                label="Mail" />
    <LinkBox Icon={Linkedin}  href="https://www.linkedin.com/in/virubane/"     label="LinkedIn" />
    <LinkBox Icon={Github}    href="https://github.com/Virajbane"              label="GitHub" />
    <LinkBox Icon={Instagram} href="https://www.instagram.com/_.virajbane._/"  label="Insta" />
  </div>
);

// ─── Underline input — shared by both full section and form-only version ──
// ContactSection.js — updated ContactFormOnly + shared pieces


// ... (keep LinkBox, ClipPathLinks, CONTACT_EMAIL, clip-path constants exactly as before) ...

// ─── Underline input, monochrome focus state ────────────────────────────────
const UnderlineField = ({ label, ...props }) => (
  <div className="group relative w-full">
    <label className="block text-[11px] font-mono tracking-[0.2em] text-white/45 mb-2 group-focus-within:text-white transition-colors">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-white/15 py-3 text-base text-white placeholder:text-white/25 focus:outline-none focus:border-white transition-colors"
    />
  </div>
);

function useContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio message from ${formData.name}`,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  return { formData, status, handleChange, handleSubmit };
}

// Terminal-style contact form — replaces ContactFormOnly in ContactSection.js

export function ContactFormOnly({ title = "Have a project in mind?" }) {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="rounded-lg border border-white/10 bg-[#0a0a0a] font-mono text-sm overflow-hidden">

        {/* Fake terminal title bar — real detail, not decoration */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-white/40 text-xs">contact.sh</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-white/40 text-xs mb-2"># {title}</p>

          <div>
            <label className="text-white/70 text-xs">
              <span className="text-white/30">$</span> name <span className="text-white/30">--input</span>
            </label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="type here..." required
              className="w-full mt-1.5 bg-transparent border border-white/10 rounded px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          <div>
            <label className="text-white/70 text-xs">
              <span className="text-white/30">$</span> email <span className="text-white/30">--input</span>
            </label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="you@somewhere.com" required
              className="w-full mt-1.5 bg-transparent border border-white/10 rounded px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          <div>
            <label className="text-white/70 text-xs">
              <span className="text-white/30">$</span> message <span className="text-white/30">--input</span>
            </label>
            <textarea
              name="message" rows={3} value={formData.message} onChange={handleChange}
              placeholder="what are we building..." required
              className="w-full mt-1.5 bg-transparent border border-white/10 rounded px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 text-white text-xs py-3 rounded transition-colors"
          >
            <span className="text-white/70">$</span>
            {status === 'sending' ? 'sending...' : 'send --message'}
          </button>

          {status === 'sent' && (
            <p className="text-zinc-300 text-xs">✓ 200 OK — message delivered, talk soon.</p>
          )}
          {status === 'error' && (
            <p className="text-zinc-400 text-xs">✗ 500 — email me directly at {CONTACT_EMAIL} instead.</p>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Full ContactMeComponent (used on /contact page) ───────────────────────
export default function ContactMeComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  useEffect(() => { setIsVisible(true); }, []);

  return (
    <div className={`w-full max-w-4xl mt-20 mx-auto px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Status pill */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-[11px] font-mono tracking-wider text-white/60">
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>

      {/* Big centered headline */}
      <h2 className="text-center text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-4">
        Let's talk about
        <br />
        <span className="animate-shimmer bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          your next project.
        </span>
      </h2>
      <p className="text-center text-gray-400 mb-16 max-w-md mx-auto">
        No forms with dropdowns, no "select an inquiry type." Just tell me what you're building.
      </p>

      {/* Underline-style form, single column, generous spacing */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-10 mb-24">
        <UnderlineField
          label="NAME" type="text" name="name" placeholder="Your name"
          value={formData.name} onChange={handleChange} required
        />
        <UnderlineField
          label="EMAIL" type="email" name="email" placeholder="you@somewhere.com"
          value={formData.email} onChange={handleChange} required
        />
        <div className="group relative w-full">
          <label className="block text-[11px] font-mono tracking-[0.2em] text-white/35 mb-2 group-focus-within:text-white/70 transition-colors">
            MESSAGE
          </label>
          <textarea
            name="message" rows={3} placeholder="What are we building?"
            value={formData.message} onChange={handleChange} required
            className="w-full bg-transparent border-b border-white/15 py-3 text-lg text-white placeholder:text-white/25 focus:outline-none focus:border-white transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group w-full flex items-center justify-between border-t border-white/10 pt-6 disabled:opacity-50"
        >
          <span className="text-sm font-mono tracking-widest text-white">
            {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
          </span>
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        {status === 'sent' && (
          <p className="flex items-center gap-2 text-zinc-300 text-sm font-mono">
            <CheckCircle2 className="w-4 h-4" /> sent — talk soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-zinc-400 text-sm font-mono">
            didn't go through — email me directly at {CONTACT_EMAIL}
          </p>
        )}
      </form>

      {/* Divider label */}
      <p className="text-center text-[11px] font-mono tracking-widest text-white/30 mb-4">
        OR FIND ME HERE
      </p>
      <ClipPathLinks />

      <style jsx global>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}