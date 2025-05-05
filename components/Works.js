import { useState } from 'react';

const TechBadge = ({ name }) => (
  <span className="px-3 py-1 text-sm font-medium bg-black/70 text-white border border-gray-700 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
    {name}
  </span>
);

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={project.link}
      className="group relative w-full h-96 overflow-hidden rounded-lg transition-all duration-700 shadow-xl block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
        isHovered ? 'opacity-90' : 'opacity-70'
      }`} />
      
      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 font-sans line-clamp-2">
          {project.title}
        </h3>
        
        {/* Description - always visible */}
        <p className="text-gray-300 mb-4 font-light text-base line-clamp-3">
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
          <span 
            className="inline-flex items-center text-white hover:text-gray-300 pb-1 transition-all font-medium text-base"
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
      technologies: ['Next.js','Python', 'Tailwind', 'TypeScript'],
      description: 'AI to personalize learning. It offers tools for students to get tailored content and study plans, while teachers manage classes, quizzes, and track student performance.',
      image: '/App11.png',
      link: 'https://github.com/Mohammed6903/mumbaihacks',
    },
    {
      title: 'ATS Rankify',
      technologies: ['Next.js', 'Python', 'TypeScript', 'Tailwind'],
      description: 'Let AI analyze and rank your resume based on job descriptions, skills, and experience requirements to maximize your chances of getting noticed.',
      image: '/app2.png',
      link: 'https://github.com/MohammedYaseenRon/COHERENCE-25_CodeWizard_AIML',
    },
  ];

  return (
    <section className="py-2 bg-transparent">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Single column layout for all screen sizes */}
          <div className="w-full flex flex-col gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:-translate-y-2 w-full"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}