import { useState } from 'react';

const TechBadge = ({ name }) => (
  <span className="px-3 py-1 text-xs font-medium bg-black/70 text-white border border-gray-700 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
    {name}
  </span>
);

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative w-full h-96 overflow-hidden rounded-lg transition-all duration-700 shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full background image with zoom effect */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ${
          isHovered ? 'scale-110 filter-none' : 'scale-100 '
        }`}
        style={{ 
          backgroundImage: `url(${project.image})`,
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
        isHovered ? 'opacity-90' : 'opacity-70'
      }`} />
      
      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Title - simplified with no blue underline */}
        <h3 className="text-2xl font-bold text-white mb-2 font-sans">
          {project.title}
        </h3>
        
        {/* Description - always visible */}
        <p className="text-gray-300 mb-4 font-light">
          {project.description}
        </p>
        
        {/* Tech stack badges - always visible */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} name={tech} />
          ))}
        </div>
        
        {/* View project button - only this fades in on hover */}
        <div className={`mt-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <a 
            href="#" 
            className="inline-flex items-center text-white hover:text-gray-300 pb-1 transition-all font-medium"
            aria-label={`View ${project.title} project`}
          >
            View Project
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const projects = [
    {
      title: 'HealthAI',
      technologies: ['Next.js', 'Tailwind', 'TypeScript'],
      description: 'Experience the future of healthcare with personalized AI diagnosis, real-time monitoring, and instant access to medical professionals.',
      image: '/app1.png', 
    },
    {
      title: 'ATS Rankify',
      technologies: ['Next.js', 'Python', 'TypeScript', 'Tailwind'],
      description: 'Full-Stack web application for creating and sharing quizzes with others. (Czech)',
      image: '/app2.png',
    },
  ];

  return (
    <section className="py-2 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="transform transition-all duration-500 hover:-translate-y-2 w-full max-w-2xl"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}