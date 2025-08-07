import { useState } from 'react';

export default function TechStackSlideshow() {
  const [animationPaused, setAnimationPaused] = useState(false);
  
  // First row technologies with actual logos
  const firstRowTech = [
  {
    name: 'React',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
        alt="React"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Next.js',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg"
        alt="Next.js"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Vite',
    logo: (
      <img
        src="https://vitejs.dev/logo.svg"
        alt="Vite"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'HTML',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/html-1.svg"
        alt="HTML"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'CSS',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/css-3.svg"
        alt="CSS"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Tailwind',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
        alt="Tailwind CSS"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'JavaScript',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg"
        alt="JavaScript"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'TypeScript',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
        alt="TypeScript"
        className="w-6 h-6"
      />
    ),
  },
];

  // Second row technologies with actual logos
  const secondRowTech = [
  {
    name: 'Node.js',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
        alt="Node.js"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Express.js',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
        alt="Express.js"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'GitHub',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg"
        alt="GitHub"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Java',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/java-4.svg"
        alt="Java"
        className="w-6 h-6"
      />
    ),
  },
  
  {
    name: 'Python',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
        alt="Python"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'MongoDB',
    logo: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg"
        alt="MongoDB"
        className="w-6 h-6"
      />
    ),
  },
  {
    name: 'Canva',
    logo: (
      <img
  src="https://vectorlogo.zone/logos/canva/canva-icon.svg"
  alt="Canva"
  className="w-6 h-6"
/>
    ),
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