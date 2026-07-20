//
import { useState } from 'react';

const TechBadge = ({ name }) => (
  <span
    className="px-3 py-1 text-sm font-medium transition-all duration-300"
    style={{
      background: 'transparent',
      color: '#FFFFFF',
      border: '1px solid #666666',
      borderRadius: '9999px',
      fontFamily: "'Space Mono', monospace",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFFFFF'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#666666'; }}
  >
    {name}
  </span>
);

/* ─── Impact Toggle (matches Models / Agents / Projects cards) ─── */
const ImpactToggle = ({ label = 'Why it matters', content, accent }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((o) => !o);
  };

  return (
    <div
      className="mt-4 pt-4"
      style={{ borderTop: '1px solid #666666' }}
    >
      <div
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: `1px solid ${accent}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accent,
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: 1,
              transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              background: open ? `${accent}22` : 'transparent',
              flexShrink: 0,
            }}
          >
            +
          </span>
          <span className="text-sm font-medium" style={{ color: '#FFFFFF', fontFamily: "'Space Mono', monospace" }}>{label}</span>
        </div>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: open ? accent : '#666666',
            boxShadow: open ? `0 0 8px ${accent}aa` : 'none',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          maxHeight: open ? '160px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease',
          marginTop: open ? '10px' : '0px',
        }}
      >
        <p className="text-sm font-light leading-relaxed m-0" style={{ color: '#A1A1AA' }}>
          {content}
        </p>
      </div>
    </div>
  );
};

/* ─── Connector (decorative diagonal accent between stacked cards) ─── */
const CardConnector = ({ accent, flip }) => (
  <div style={{ position: 'relative', height: '28px', margin: '-6px 0', pointerEvents: 'none' }}>
    <svg width="100%" height="28" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
      <line
        x1={flip ? '72%' : '8%'}
        y1="0"
        x2={flip ? '38%' : '42%'}
        y2="28"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx={flip ? '38%' : '42%'} cy="28" r="2.5" fill={accent} opacity="0.6" />
    </svg>
  </div>
);

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full h-96 overflow-hidden rounded-lg transition-all duration-700 shadow-xl block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '8px',
        border: `1px solid ${isHovered ? project.accentColor + '55' : '#666666'}`,
        boxShadow: isHovered ? `0 12px 32px -12px ${project.accentColor}55` : 'none',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Full background image with zoom effect */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ${
          isHovered ? 'scale-110 filter-none' : 'scale-100'
        }`}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
        isHovered ? 'opacity-90' : 'opacity-70'
      }`} />

      {/* Accent glow orb on hover, matches Models/Agents/Projects cards */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `${project.accentColor}33`,
          filter: 'blur(50px)',
          opacity: isHovered ? 1 : 0,
          zIndex: 1,
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Title */}
        <h3
          className="text-2xl mb-2 line-clamp-2"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}
        >
          {project.title}
        </h3>

        {/* Description - always visible */}
        <p className="mb-4 font-light text-base line-clamp-3" style={{ color: '#D4D4D8' }}>
          {project.description}
        </p>

        {/* Tech stack badges - always visible */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} name={tech} />
          ))}
        </div>

        {/* Why it matters - expandable, matches Models/Agents/Projects cards */}
        {project.highlight && (
          <ImpactToggle content={project.highlight} accent={project.accentColor} />
        )}

        {/* View project button - only this fades in on hover */}
        <div className={`mt-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span
            className="inline-flex items-center pb-1 transition-all font-medium text-base"
            style={{ color: '#FFFFFF', fontFamily: "'Space Mono', monospace" }}
            aria-label={`View ${project.title} project`}
          >
            View Project
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default function WorksSection() {
  const projects = [
    {
      title: 'EduTech',
      technologies: ['Next.js', 'Python', 'Tailwind', 'TypeScript'],
      description: 'AI to personalize learning. It offers tools for students to get tailored content and study plans, while teachers manage classes, quizzes, and track student performance.',
      image: '/App11.png',
      link: 'https://github.com/Mohammed6903/mumbaihacks',
      accentColor: '#FFFFFF',
      highlight: 'Built at a hackathon to replace one-size-fits-all coursework with study plans that adapt to how each student is actually performing.',
    },
    {
      title: 'ATS Rankify',
      technologies: ['Next.js', 'Python', 'TypeScript', 'Tailwind'],
      description: 'Let AI analyze and rank your resume based on job descriptions, skills, and experience requirements to maximize your chances of getting noticed.',
      image: '/app2.png',
      link: 'https://github.com/MohammedYaseenRon/COHERENCE-25_CodeWizard_AIML',
      accentColor: '#A1A1AA',
      highlight: 'Scores a resume against a real job description the same way an ATS filter would — surfacing gaps before a recruiter ever sees them.',
    },
  ];

  return (
    <section className="py-2 bg-transparent">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Single column layout for all screen sizes */}
          <div className="w-full flex flex-col">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="transform transition-all duration-500 hover:-translate-y-2 w-full">
                  <ProjectCard project={project} />
                </div>
                {index < projects.length - 1 && (
                  <CardConnector accent={project.accentColor} flip={index % 2 === 1} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}