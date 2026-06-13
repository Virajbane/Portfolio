'use client';
import { useEffect, useRef } from 'react';

const row1 = [
  { name: 'Python',      src: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java',        src: 'https://cdn.worldvectorlogo.com/logos/java-4.svg' },
 { name: 'SQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'React.js',    src: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
  { name: 'Next.js',     src: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg' },
  { name: 'Node.js',     src: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
  { name: 'Tailwind CSS',src: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
];

const row2 = [
  { name: 'PyTorch',          src: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg' },
  { name: 'Scikit-learn',     src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'Pandas',           src: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg' },
  { name: 'NumPy',            src: 'https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg' },
  { name: 'HuggingFace',      src: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
  { name: 'BERT',             src: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
  { name: 'NLP',              src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'Transformer Models',src: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
];

const row3 = [
  { name: 'MongoDB',   src: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
  { name: 'MySQL',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Supabase',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'Git',       src: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
  { name: 'GitHub',    src: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg' },
  { name: 'Vercel',    src: 'https://cdn.worldvectorlogo.com/logos/vercel.svg' },
  { name: 'Netlify',   src: 'https://cdn.worldvectorlogo.com/logos/netlify.svg' },
  { name: 'Ollama',    src: 'https://ollama.com/public/ollama.png' },
];

const SMOOTH_TAU = 0.18;
const BG = 'transparent';

const styles = {
  wrapper: {
    backgroundColor: BG,
    padding: '40px 24px',
    maxWidth: '1024px',
    margin: '0 auto',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#f1f5f9',
    marginBottom: '28px',
  },
  rowWrap: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    marginBottom: '16px',
  },
  fadeLeft: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0,
    width: '80px',
    pointerEvents: 'none',
    zIndex: 10,
    background: `linear-gradient(to right, ${BG} 0%, transparent 100%)`,
  },
  fadeRight: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0,
    width: '80px',
    pointerEvents: 'none',
    zIndex: 10,
    background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
  },
  track: {
    display: 'flex',
    width: 'max-content',
    willChange: 'transform',
    userSelect: 'none',
  },
};

function useLoopAnimation(trackRef, items, speed, direction) {
  const hoveredRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const targetVel = direction === 'left' ? speed : -speed;
    let seqW = 0;
    let offset = 0;
    let vel = 0;
    let raf = null;
    let last = null;

    function buildList() {
      const ul = document.createElement('ul');
      Object.assign(ul.style, {
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: '0',
        padding: '0',
      });

      items.forEach(t => {
        const li = document.createElement('li');
        Object.assign(li.style, {
          flexShrink: '0',
          marginRight: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        });

        const box = document.createElement('div');
        Object.assign(box.style, {
          width: '52px',
          height: '52px',
          borderRadius: '10px',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: '0',
        });

        const img = document.createElement('img');
        Object.assign(img.style, {
          width: '28px',
          height: '28px',
          objectFit: 'contain',
          pointerEvents: 'none',
          WebkitUserDrag: 'none',
        });
        img.src = t.src;
        img.alt = t.name;
        img.loading = 'lazy';

        const span = document.createElement('span');
        Object.assign(span.style, {
          fontSize: '13px',
          color: '#cbd5e1',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        });
        span.textContent = t.name;

        box.appendChild(img);
        li.appendChild(box);
        li.appendChild(span);
        ul.appendChild(li);
      });

      return ul;
    }

    function populate() {
      track.innerHTML = '';
      const seq = buildList();
      track.appendChild(seq);

      requestAnimationFrame(() => {
        seqW = seq.scrollWidth;
        const containerW = track.parentElement?.clientWidth ?? 800;
        const copies = Math.ceil(containerW / seqW) + 3;
        for (let i = 1; i < copies; i++) track.appendChild(buildList());
        startAnim();
      });
    }

    function startAnim() {
      if (raf) cancelAnimationFrame(raf);
      function frame(ts) {
        if (!last) last = ts;
        const dt = Math.min((ts - last) / 1000, 0.05);
        last = ts;
        const target = hoveredRef.current ? 0 : targetVel;
        const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
        vel += (target - vel) * ease;
        if (seqW > 0) {
          let next = offset + vel * dt;
          next = ((next % seqW) + seqW) % seqW;
          offset = next;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    const onEnter = () => { hoveredRef.current = true; };
    const onLeave = () => { hoveredRef.current = false; };
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    populate();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, [trackRef, items, speed, direction]);
}

function LoopRow({ items, speed, direction }) {
  const trackRef = useRef(null);
  useLoopAnimation(trackRef, items, speed, direction);

  return (
    <div style={styles.rowWrap}>
      <div style={styles.fadeLeft} />
      <div style={styles.fadeRight} />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={trackRef} style={styles.track} />
      </div>
    </div>
  );
}

export default function TechStackSlideshow() {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>What I work with</h2>
      <LoopRow items={row1} speed={55} direction="left" />
      <LoopRow items={row2} speed={45} direction="right" />
      <LoopRow items={row3} speed={60} direction="left" />
    </div>
  );
}