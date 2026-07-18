"use client"
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAnimate } from 'framer-motion';

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = { left: [BOTTOM_RIGHT_CLIP, NO_CLIP], bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP], top: [BOTTOM_RIGHT_CLIP, NO_CLIP], right: [TOP_LEFT_CLIP, NO_CLIP] };
const EXIT_KEYFRAMES = { left: [NO_CLIP, TOP_RIGHT_CLIP], bottom: [NO_CLIP, TOP_RIGHT_CLIP], top: [NO_CLIP, TOP_RIGHT_CLIP], right: [NO_CLIP, BOTTOM_LEFT_CLIP] };

const CONTACT_EMAIL = 'virajbane2004@gmail.com';

const LinkBox = ({ Icon, href, label }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    return [
      { proximity: Math.abs(box.left - e.clientX), side: "left" },
      { proximity: Math.abs(box.right - e.clientX), side: "right" },
      { proximity: Math.abs(box.top - e.clientY), side: "top" },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" },
    ].sort((a, b) => a.proximity - b.proximity)[0].side;
  };

  const handleMouseEnter = (e) => animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] });
  const handleMouseLeave = (e) => animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] });

  const Content = ({ inverted }) => (
    <div className="flex flex-col items-center gap-1.5">
      {Icon && <Icon size={28} style={{ color: inverted ? '#111111' : '#FFFFFF' }} />}
      {label && (
        <span style={{ color: inverted ? '#111111aa' : '#A1A1AA', fontFamily: "'Space Mono', monospace" }} className="text-[10px] tracking-wide">
          {label}
        </span>
      )}
    </div>
  );

  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      className="relative grid h-20 sm:h-24 w-full place-content-center overflow-hidden"
      style={{ background: '#111111' }}
    >
      <Content inverted={false} />
      <div ref={scope} style={{ clipPath: BOTTOM_RIGHT_CLIP, background: '#FFFFFF' }} className="absolute inset-0 grid place-content-center">
        <Content inverted={true} />
      </div>
    </a>
  );
};

const ClipPathLinks = () => (
  <div className="grid grid-cols-4 divide-x" style={{ borderColor: '#666666', border: '1px solid #666666', borderRadius: '8px', overflow: 'hidden' }}>
    <LinkBox Icon={Mail} href={`mailto:${CONTACT_EMAIL}`} label="Mail" />
    <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/virubane/" label="LinkedIn" />
    <LinkBox Icon={Github} href="https://github.com/Virajbane" label="GitHub" />
    <LinkBox Icon={Instagram} href="https://www.instagram.com/_.virajbane._/" label="Insta" />
  </div>
);

const UnderlineField = ({ label, ...props }) => (
  <div className="group relative w-full">
    <label
      className="block text-[11px] tracking-[0.2em] mb-2 transition-colors"
      style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}
    >
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-transparent border-b py-3 text-base focus:outline-none transition-colors"
      style={{ borderColor: '#666666', color: '#FFFFFF' }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
      onBlur={(e) => (e.currentTarget.style.borderColor = '#666666')}
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
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message, _subject: `Portfolio message from ${formData.name}` }),
      });
      if (res.ok) { setStatus('sent'); setFormData({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return { formData, status, handleChange, handleSubmit };
}

export function ContactFormOnly({ title = "Have a project in mind?" }) {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div style={{ border: '1px solid #666666', background: '', borderRadius: '8px', fontFamily: "'Space Mono', monospace" }} className="text-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #666666' }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#666666' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#666666' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#666666' }} />
          </div>
          <span className="text-xs" style={{ color: '#A1A1AA' }}>contact.sh</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-xs mb-2" style={{ color: '#A1A1AA' }}># {title}</p>

          {[
            { label: 'name', type: 'text', name: 'name', placeholder: 'type here...' },
            { label: 'email', type: 'email', name: 'email', placeholder: 'you@somewhere.com' },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs" style={{ color: '#FFFFFF' }}>
                <span style={{ color: '#666666' }}>$</span> {f.label} <span style={{ color: '#666666' }}>--input</span>
              </label>
              <input
                type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange}
                placeholder={f.placeholder} required
                className="w-full mt-1.5 bg-transparent px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ border: '1px solid #666666', borderRadius: '8px', color: '#FFFFFF' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#666666')}
              />
            </div>
          ))}

          <div>
            <label className="text-xs" style={{ color: '#FFFFFF' }}>
              <span style={{ color: '#666666' }}>$</span> message <span style={{ color: '#666666' }}>--input</span>
            </label>
            <textarea
              name="message" rows={3} value={formData.message} onChange={handleChange}
              placeholder="what are we building..." required
              className="w-full mt-1.5 bg-transparent px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none"
              style={{ border: '1px solid #666666', borderRadius: '8px', color: '#FFFFFF' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#666666')}
            />
          </div>

          <button
            type="submit" disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 disabled:opacity-50 text-xs py-3 transition-colors"
            style={{ background: '#666666', border: '1px solid #666666', borderRadius: '8px', color: '#FFFFFF' }}
          >
            <span style={{ color: '#A1A1AA' }}>$</span>
            {status === 'sending' ? 'sending...' : 'send --message'}
          </button>

          {status === 'sent' && <p className="text-xs" style={{ color: '#FFFFFF' }}>✓ 200 OK — message delivered, talk soon.</p>}
          {status === 'error' && <p className="text-xs" style={{ color: '#A1A1AA' }}>✗ 500 — email me directly at {CONTACT_EMAIL} instead.</p>}
        </form>
      </div>
    </div>
  );
}

export default function ContactMeComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  useEffect(() => { setIsVisible(true); }, []);

  return (
    <div
      className={`w-full max-w-4xl mt-20 mx-auto px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: '' }}
    >
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-4 py-1.5" style={{ border: '1px solid #666666', background: '#111111', borderRadius: '9999px' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FFFFFF' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FFFFFF' }} />
          </span>
          <span className="text-[11px] tracking-wider" style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}>
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>

      <h2
        className="text-center text-4xl md:text-6xl leading-[1.1] mb-4"
        style={{ color: '#FFFFFF', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
      >
        Let's talk about
        <br />
        your next project.
      </h2>
      <p className="text-center mb-16 max-w-md mx-auto" style={{ color: '#A1A1AA' }}>
        No forms with dropdowns, no "select an inquiry type." Just tell me what you're building.
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-10 mb-24">
        <UnderlineField label="NAME" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
        <UnderlineField label="EMAIL" type="email" name="email" placeholder="you@somewhere.com" value={formData.email} onChange={handleChange} required />
        <div className="group relative w-full">
          <label className="block text-[11px] tracking-[0.2em] mb-2" style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}>
            MESSAGE
          </label>
          <textarea
            name="message" rows={3} placeholder="What are we building?"
            value={formData.message} onChange={handleChange} required
            className="w-full bg-transparent border-b py-3 text-lg focus:outline-none transition-colors resize-none"
            style={{ borderColor: '#666666', color: '#FFFFFF' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#666666')}
          />
        </div>

        <button
          type="submit" disabled={status === 'sending'}
          className="group w-full flex items-center justify-between pt-6 disabled:opacity-50"
          style={{ borderTop: '1px solid #666666' }}
        >
          <span className="text-sm tracking-widest" style={{ color: '#FFFFFF', fontFamily: "'Space Mono', monospace" }}>
            {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
          </span>
          <span
            className="flex items-center justify-center w-10 h-10 group-hover:translate-x-1 transition-transform"
            style={{ background: '#FFFFFF', color: '#111111', borderRadius: '9999px' }}
          >
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        {status === 'sent' && (
          <p className="flex items-center gap-2 text-sm" style={{ color: '#FFFFFF', fontFamily: "'Space Mono', monospace" }}>
            <CheckCircle2 className="w-4 h-4" /> sent — talk soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm" style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}>
            didn't go through — email me directly at {CONTACT_EMAIL}
          </p>
        )}
      </form>

      <p className="text-center text-[11px] tracking-widest mb-4" style={{ color: '#666666', fontFamily: "'Space Mono', monospace" }}>
        OR FIND ME HERE
      </p>
      <ClipPathLinks />
    </div>
  );
}