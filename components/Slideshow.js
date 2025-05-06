import { useState } from 'react';

export default function TechStackSlideshow() {
  const [animationPaused, setAnimationPaused] = useState(false);
  
  // First row technologies with actual logos
  const firstRowTech = [
    { 
      name: 'React', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
          <path d="M12,18.5c-3.58,0-6.5-2.92-6.5-6.5s2.92-6.5,6.5-6.5s6.5,2.92,6.5,6.5S15.58,18.5,12,18.5z" stroke="#61DAFB" strokeWidth="1" fill="none"/>
          <path d="M12,21.5c-5.25,0-9.5-4.25-9.5-9.5s4.25-9.5,9.5-9.5s9.5,4.25,9.5,9.5S17.25,21.5,12,21.5z" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        </svg>
      )
    },
    { 
      name: 'Next.js', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M11.214 5h.072c.14 1.968 1.388 3.648 3.207 4.304l.054.027-.054.027c-1.819.656-3.067 2.336-3.207 4.304h-.072c-.14-1.968-1.388-3.648-3.207-4.304L7.953 9.33l.054-.027c1.819-.656 3.067-2.336 3.207-4.304zM13 5h.072c.14 1.968 1.388 3.648 3.207 4.304l.054.027-.054.027c-1.819.656-3.067 2.336-3.207 4.304h-.072c-.14-1.968-1.388-3.648-3.207-4.304l-.054-.027.054-.027c1.819-.656 3.067-2.336 3.207-4.304z" fill="white"/>
          <path d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0zm7-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Vite', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M8,2L20,14L12,22L4,14L16,2" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M12,7L7,12L12,17L17,12L12,7Z" fill="#646CFF" stroke="#646CFF" strokeWidth="0.5"/>
        </svg>
      )
    },
    { 
      name: 'HTML', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M5.08,3l1.24,14l6.67,2l6.67-2l1.25-14H5.08z" fill="#E34F26"/>
          <path d="M19.5,6H10v3h9l-0.35,4L12,14.5v3.1l7.4-2.15L20,6H19.5z" fill="white"/>
          <path d="M12,13l-4.5-1.5L7.25,9h3.25V6H6.5L7,17l5,1.5V13z" fill="#EBEBEB"/>
        </svg>
      )
    },
    { 
      name: 'CSS', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M5.08,3l1.24,14l6.67,2l6.67-2l1.25-14H5.08z" fill="#1572B6"/>
          <path d="M19.5,6H10v3h9l-0.35,4L12,14.5v3.1l7.4-2.15L20,6H19.5z" fill="white"/>
          <path d="M12,13l-4.5-1.5L7.25,9h3.25V6H6.5L7,17l5,1.5V13z" fill="#EBEBEB"/>
        </svg>
      )
    },
    { 
      name: 'Tailwind', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" fill="#06B6D4"/>
        </svg>
      )
    },
    { 
      name: 'JavaScript', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" fill="#F7DF1E"/>
          <path d="M12,17c1.1,0,2-0.5,2.6-1.3l1.5,1c-0.9,1.2-2.2,1.8-4.1,1.8c-2.9,0-4.5-1.6-4.5-4.5 c0-2.8,1.6-4.5,4.3-4.5c2.7,0,4.2,1.7,4.2,4.4c0,0.3,0,0.6-0.1,0.8H9.1c0.2,1.3,1,1.8,2.9,1.8 V17z M9.2,12.7h4.4c0-1.2-0.7-1.8-2.1-1.8C10.1,10.9,9.3,11.5,9.2,12.7z" fill="black"/>
          <path d="M16.4,17h2V7h-2V17z" fill="black"/>
        </svg>
      )
    },
    { 
      name: 'TypeScript', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" fill="#3178C6"/>
          <path d="M11,16.5v2h4v-2h-1v0h-2v0H11z M17,11v-2h-9v2h3v8h2v-8H17z" fill="white"/>
        </svg>
      )
    },
  ];

  // Second row technologies with actual logos
  const secondRowTech = [
    { 
      name: 'PostgreSQL', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12,3c-4.41,0-8,1.79-8,4v10c0,2.21,3.59,4,8,4s8-1.79,8-4V7C20,4.79,16.41,3,12,3z" stroke="#336791" strokeWidth="1" fill="#336791"/>
          <ellipse cx="12" cy="7" rx="6" ry="2.5" fill="white"/>
          <path d="M15,9c0,0.55-1.34,1-3,1s-3-0.45-3-1" stroke="white" strokeWidth="1" fill="none"/>
          <path d="M15,12c0,0.55-1.34,1-3,1s-3-0.45-3-1" stroke="white" strokeWidth="1" fill="none"/>
          <path d="M15,15c0,0.55-1.34,1-3,1s-3-0.45-3-1" stroke="white" strokeWidth="1" fill="none"/>
        </svg>
      )
    },
    { 
      name: 'MariaDB', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M6,4h12c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2V6C4,4.9,4.9,4,6,4z" fill="#003545"/>
          <path d="M12,7c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S9.8,7,12,7z" stroke="#FFF" strokeWidth="1.5" fill="none"/>
          <path d="M16,16l-2.5-2.5M8,16l2.5-2.5" stroke="#FFF" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    },
    { 
      name: 'MySQL', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M6,4h12c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2V6C4,4.9,4.9,4,6,4z" fill="#00758F"/>
          <path d="M7,12c0,0,2,0,3,0c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1c-1,0-3,0-3,0V12z" fill="#F29111"/>
          <path d="M17,12c0,0-2,0-3,0c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1c1,0,3,0,3,0V12z" fill="#F29111"/>
          <path d="M7,15V9 M12,15V9 M17,15V9" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    },
    { 
      name: 'Node.js', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12,21.5c-0.3,0-0.6-0.1-0.8-0.2l-2.6-1.5c-0.4-0.2-0.2-0.3-0.1-0.3c0.5-0.2,0.6-0.2,1.1-0.5c0.1,0,0.1,0,0.2,0l2,1.2 c0.1,0,0.1,0,0.2,0l7.6-4.4c0.1,0,0.1-0.1,0.1-0.2V7.4c0-0.1,0-0.1-0.1-0.2L12,2.9c-0.1,0-0.1,0-0.2,0L4.2,7.2 C4.1,7.3,4.1,7.3,4.1,7.4v8.8c0,0.1,0,0.1,0.1,0.2l2.1,1.2c1.1,0.5,1.7-0.1,1.7-0.7V8.1c0-0.1,0.1-0.2,0.2-0.2h1 c0.1,0,0.2,0.1,0.2,0.2v8.8c0,1.4-0.7,2.2-2,2.2c-0.4,0-0.7,0-1.6-0.4l-2-1.1c-0.5-0.3-0.8-0.8-0.8-1.4V7.4c0-0.6,0.3-1.1,0.8-1.4 l7.6-4.4c0.5-0.3,1.1-0.3,1.6,0l7.6,4.4c0.5,0.3,0.8,0.8,0.8,1.4v8.8c0,0.6-0.3,1.1-0.8,1.4l-7.6,4.4C12.6,21.4,12.3,21.5,12,21.5z" fill="#339933"/>
          <path d="M14.7,15.6c-3.3,0-4-1.5-4-2.8c0-0.1,0.1-0.2,0.2-0.2h1c0.1,0,0.2,0.1,0.2,0.2c0.1,0.8,0.5,1.2,2.6,1.2 c1.6,0,2.3-0.4,2.3-1.2c0-0.5-0.2-0.9-2.7-1.1c-2.1-0.2-3.4-0.7-3.4-2.3c0-1.5,1.3-2.4,3.4-2.4c2.4,0,3.6,0.8,3.8,2.6 c0,0.1,0,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1h-1c-0.1,0-0.2-0.1-0.2-0.1c-0.2-1-0.8-1.3-2.3-1.3c-1.7,0-1.9,0.6-1.9,1 c0,0.5,0.2,0.7,2.6,1c2.4,0.3,3.5,0.7,3.5,2.4S17.3,15.6,14.7,15.6z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Express', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M24,7.4L19,12l5,4.6V7.4z M16,5H3v14h13 M10,10h1V9h-1 M7,10h1V9H7 M4,10h1V9H4 M9,13h2v1H9v1h3v-4H9 M4,13h2l2,2v-4H4" fill="none" stroke="white" strokeWidth="1.5"/>
        </svg>
      )
    },
    { 
      name: 'Git', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12,2.1l9.9,9.9c0.3,0.3,0.3,0.7,0,0.9l-9.9,9.9c-0.3,0.3-0.7,0.3-0.9,0l-9.9-9.9c-0.3-0.3-0.3-0.7,0-0.9L11,2.1 C11.3,1.9,11.7,1.9,12,2.1z" fill="#F05032"/>
          <circle cx="12" cy="12" r="2" fill="white"/>
          <circle cx="7" cy="12" r="2" fill="white"/>
          <circle cx="17" cy="12" r="2" fill="white"/>
          <path d="M12,14v3.5 M17,12h3" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12,2C6.48,2,2,6.48,2,12c0,4.42,2.87,8.17,6.84,9.49c0.5,0.09,0.68-0.22,0.68-0.48c0-0.24-0.01-0.86-0.01-1.69 c-2.78,0.6-3.37-1.34-3.37-1.34c-0.45-1.15-1.11-1.46-1.11-1.46c-0.91-0.62,0.07-0.61,0.07-0.61c1,0.07,1.53,1.03,1.53,1.03 c0.89,1.53,2.34,1.09,2.91,0.83c0.09-0.65,0.35-1.09,0.63-1.34c-2.22-0.25-4.55-1.11-4.55-4.93c0-1.09,0.39-1.98,1.03-2.67 c-0.1-0.25-0.45-1.27,0.1-2.64c0,0,0.84-0.27,2.75,1.02c0.8-0.22,1.65-0.33,2.5-0.33c0.85,0,1.7,0.11,2.5,0.33 c1.91-1.29,2.75-1.02,2.75-1.02c0.55,1.37,0.2,2.39,0.1,2.64c0.64,0.69,1.03,1.58,1.03,2.67c0,3.83-2.33,4.67-4.55,4.92 c0.36,0.31,0.68,0.92,0.68,1.85c0,1.34-0.01,2.42-0.01,2.75c0,0.27,0.18,0.58,0.69,0.48C19.13,20.17,22,16.42,22,12 C22,6.48,17.52,2,12,2z" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Python', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12,2c-2,0-3.2,0.8-3.8,2c-0.4,0.8-0.4,1.8-0.4,2.6V9h4v1H5c-1,0-2,1-2,2c0,1.2,0,3,0,4c0,2,1.4,3,3,3c1,0,5,0,5,0v-2 c0,0-5.5,0-5.5,0c-0.8,0-1.5-0.7-1.5-1.5v-2.5c0-0.8,0.7-1.5,1.5-1.5h7c0.5,0,1.5-0.5,1.5-1V7c0-1,0-1.8-0.4-2.5C13.2,2.8,12,2,12,2 z" fill="#3776AB"/>
          <path d="M12,22c2,0,3.2-0.8,3.8-2c0.4-0.8,0.4-1.8,0.4-2.6V15h-4v-1h7c1,0,2-1,2-2c0-1.2,0-3,0-4c0-2-1.4-3-3-3c-1,0-5,0-5,0v2 c0,0,5.5,0,5.5,0c0.8,0,1.5,0.7,1.5,1.5v2.5c0,0.8-0.7,1.5-1.5,1.5h-7c-0.5,0-1.5,0.5-1.5,1v5c0,1,0,1.8,0.4,2.5 C10.8,21.2,12,22,12,22z" fill="#FFC331"/>
          <circle cx="9" cy="5.5" r="1" fill="white"/>
          <circle cx="15" cy="18.5" r="1" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Java', 
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M8.9,16.9c0,0-1,0.6,0.7,0.8c2.1,0.2,3.1,0.2,5.4-0.2c0,0,0.6,0.4,1.4,0.7C11.9,20,5.7,17.9,8.9,16.9z" fill="#F8981D"/>
          <path d="M8.3,14.6c0,0-1.1,0.8,0.6,1c1.9,0.2,3.3,0.2,5.9-0.3c0,0,0.4,0.4,1.1,0.6C10.5,17.7,4.9,16.1,8.3,14.6z" fill="#F8981D"/>
          <path d="M13.1,10.8c1.1,1.2-0.3,2.3-0.3,2.3s2.7-1.4,1.5-3.1c-1.1-1.6-2-2.4,2.7-5.1C17,5,11.6,6.5,13.1,10.8z" fill="#F8981D"/>
          <path d="M19.1,18c0,0,0.7,0.6-0.8,1.1c-2.8,0.9-11.7,1.1-14.2,0c-0.9-0.4,0.8-1,1.3-1.1c0.5-0.1,0.8-0.1,0.8-0.1 c-0.9-0.7-6.1,1.3-2.6,1.9C13.4,21.5,22.2,19.3,19.1,18z" fill="#5382A1"/>
          <path d="M9.5,12.4c0,0-4.3,1-1.5,1.4c1.2,0.2,3.5,0.1,5.7-0.1c1.8-0.2,3.6-0.5,3.6-0.5s-0.6,0.3-1.1,0.5 c-4.3,1.1-12.7,0.6-10.3-0.5C7.5,12.5,9.5,12.4,9.5,12.4z" fill="#5382A1"/>
          <path d="M16.8,15.8c4.4-2.3,2.4-4.5,0.9-4.2c-0.4,0.1-0.5,0.2-0.5,0.2s0.1-0.2,0.4-0.3c3-1.1,5.3,2.9-0.9,4.5 C16.7,16,16.8,15.9,16.8,15.8z" fill="#5382A1"/>
          <path d="M14.4,3c0,0,2.4,2.4-2.3,6.2c-3.8,3-0.9,4.6,0,6.6c-2.2-2-3.8-3.8-2.7-5.4C11.1,8,15.4,6.7,14.4,3z" fill="#F8981D"/>
          <path d="M10.2,20.6c4.2,0.3,10.7-0.2,10.8-2.2c0,0-0.3,0.8-3.5,1.4c-3.6,0.7-8,0.6-10.6,0.2C6.9,19.9,7.1,20.4,10.2,20.6z" fill="#5382A1"/>
        </svg>
      )
    },
  ];

  // Duplicate arrays to create seamless loops
  const allFirstRowTech = [...firstRowTech, ...firstRowTech];
  const allSecondRowTech = [...secondRowTech, ...secondRowTech];

  // Handle mouse interactions
  const handleMouseEnter = () => setAnimationPaused(true);
  const handleMouseLeave = () => setAnimationPaused(false);

  return (
    <div className="bg-black text-white px-6 py-8 font-sans mx-auto max-w-5xl">
      <h2 className="text-4xl font-bold mb-8 text-center">What I work with</h2>

      {/* First row - continuous scrolling */}
      <div className="relative overflow-hidden w-full mb-6">
        <div 
          className={`flex justify-center transition-all duration-300`}
          style={{
            animation: animationPaused ? 'none' : 'scrollLeft 30s linear infinite',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {allFirstRowTech.map((tech, index) => (
            <div 
              key={`tech1-${index}`} 
              className="flex items-center mx-4 shrink-0"
            >
              <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center mr-2">
                {tech.logo}
              </div>
              <span className="text-sm text-gray-300 font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - continuous scrolling in opposite direction */}
      <div className="relative overflow-hidden w-full">
        <div 
          className={`flex justify-center transition-all duration-300`}
          style={{
            animation: animationPaused ? 'none' : 'scrollRight 35s linear infinite',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {allSecondRowTech.map((tech, index) => (
            <div 
              key={`tech2-${index}`} 
              className="flex items-center mx-4 shrink-0"
            >
              <div className="bg-gray-900 w-12 h-12 rounded-lg flex items-center justify-center mr-2">
                {tech.logo}
              </div>
              <span className="text-sm text-gray-300 font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded styles for animations */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}