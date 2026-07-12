// ContactSection.js
"use client"
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';
import { useAnimate } from 'framer-motion';
import AnimatedFooter from './Footer';

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

// ─── HuggingFace SVG icon ──────────────────────────────────────────────────
const HuggingFaceIcon = ({ className }) => (
  <svg viewBox="0 0 95 88" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M47.5 0C21.3 0 0 19.7 0 44c0 24.3 21.3 44 47.5 44S95 68.3 95 44C95 19.7 73.7 0 47.5 0z" fill="currentColor" opacity="0.15"/>
    <text x="50%" y="62" textAnchor="middle" fontSize="52" fontFamily="Arial">🤗</text>
  </svg>
);

// ─── LinkBox component ─────────────────────────────────────────────────────
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

  const handleMouseEnter = (e) => {
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] });
  };
  const handleMouseLeave = (e) => {
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] });
  };

  const Content = ({ inverted }) => (
    <div className="flex flex-col items-center gap-1.5">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          className={`${imgClassName ?? 'h-8 w-auto object-contain'} ${inverted ? 'brightness-0 invert' : ''}`}
        />
      ) : (
        Icon && (
          <Icon
            size={32}
            className={inverted ? 'text-black' : 'text-white'}
          />
        )
      )}
      {label && (
        <span className={`text-[11px] font-mono tracking-wide ${inverted ? 'text-black/70' : 'text-white/50'}`}>
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
      className="relative grid h-24 sm:h-32 md:h-36 w-full place-content-center bg-black overflow-hidden"
    >
      <Content inverted={false} />
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white"
      >
        <Content inverted={true} />
      </div>
    </a>
  );
};

// ─── ClipPathLinks grid ────────────────────────────────────────────────────
const ClipPathLinks = () => (
  <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
    {/* Row 1: Email + LinkedIn */}
    <div className="grid grid-cols-2 divide-x divide-white/10">
      <LinkBox Icon={Mail}     href="https://mail.google.com/mail/?view=cm&to=virajbane2004@gmail.com"          label="Email"    />
      <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/virubane/"   label="LinkedIn" />
    </div>

    {/* Row 2: GitHub + Instagram */}
    <div className="grid grid-cols-2 divide-x divide-white/10">
      <LinkBox Icon={Github}    href="https://github.com/Virajbane"                label="GitHub"    />
      <LinkBox Icon={Instagram} href="https://www.instagram.com/_.virajbane._/"    label="Instagram" />
    </div>

    {/* Row 3: Hugging Face full width */}
    <div className="grid grid-cols-1">
      <LinkBox
        href="https://huggingface.co/Virajbane"
        imgSrc="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
        label="Hugging Face"
        imgClassName="h-8 w-auto object-contain"
      />
    </div>
  </div>
);

// ─── Main ContactMeComponent ───────────────────────────────────────────────
export default function ContactMeComponent() {
  const [isVisible,      setIsVisible]      = useState(false);
  const [titleVisible,   setTitleVisible]   = useState(false);
  const [subtitleVisible,setSubtitleVisible]= useState(false);
  const [cardsVisible,   setCardsVisible]   = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const t1 = setTimeout(() => setTitleVisible(true),    300);
    const t2 = setTimeout(() => setSubtitleVisible(true), 600);
    const t3 = setTimeout(() => setCardsVisible(true),    900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className={`w-full max-w-6xl mt-20 mx-auto p-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative rounded-2xl overflow-hidden p-8 bg-transparent border border-gray-800 shadow-2xl">

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-purple-500/30 to-transparent animate-float" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-linear-to-tl from-blue-500/30 to-transparent animate-float-delayed" />
        </div>

        <div className="relative z-10">
          {/* Title */}
          <h2 className={`text-4xl font-bold text-white mb-3 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block animate-shimmer bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Contact me
            </span>
          </h2>

          {/* Subtitle */}
          <p className={`text-gray-300 mb-10 transition-all duration-700 delay-200 ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            You can reach me via Email, LinkedIn, GitHub, Instagram or Hugging Face. I usually respond within a day.
          </p>

          {/* Clip-path link grid */}
          <div className={`transition-all duration-700 delay-300 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ClipPathLinks />
          </div>
        </div>
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0)    translateX(0);   }
          50%     { transform: translateY(-10px) translateX(10px);}
        }
        @keyframes float-delayed {
          0%,100% { transform: translateY(0)   translateX(0);    }
          50%     { transform: translateY(10px) translateX(-10px);}
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-float         { animation: float          6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed  8s ease-in-out infinite; }
      `}</style>

      <AnimatedFooter />
    </div>
  );
}