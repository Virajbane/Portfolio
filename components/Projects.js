"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TechBadge = ({ name }) => (
  <span className="px-3 py-1 text-xs font-medium bg-black/70 text-white border border-gray-700 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
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
      {/* Background Image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ${
          isHovered ? 'scale-110 filter-none' : 'scale-100'
        }`}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
        isHovered ? 'opacity-90' : 'opacity-70'
      }`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <h3 className="text-2xl font-bold text-white mb-2 font-sans">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 font-light">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} name={tech} />
          ))}
        </div>
        <div className={`mt-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="inline-flex items-center text-white hover:text-gray-300 pb-1 transition-all font-medium">
            View Project
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default function ProjectsSection({ showAll = false }) {
  const router = useRouter();

  const projects = [
    {
      title: 'HealthAI',
      technologies: ['Next.js', 'Tailwind', 'TypeScript'],
      description: 'Experience the future of healthcare with personalized AI diagnosis, real-time monitoring, and instant access to medical professionals.',
      image: '/app1.png',
      link: 'https://github.com/Virajbane/Ai.healthcare', 
    },
    {
      title: 'Move on',
      technologies: ['Next.js', 'TypeScript', 'Tailwind'],
      description: 'Empower your travel. Connect effortlessly, explore freely, and move on with confidence.',
      image: '/App13.png',
      link: 'https://github.com/Virajbane/Move-on',
    },
    {
      title: 'To do list App',
      technologies: ['React', 'Firebase', 'Tailwind'],
      description: 'Next-gen collaboration tool for students and developers.',
      image: '/App7.png',
      link: 'https://github.com/Virajbane/To-do-list',
    },
    {
      title: 'Agro-Farm',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      description: 'Platform for farmers to solve daily issues and sell crops.',
      image: '/App10.png',
      link: 'https://github.com/Virajbane/Agro-Farm',
    },
    {
      title: 'Amazon Landing page',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      description: ' E-Commerce Website Inspired by Amazon with Creative Touches (HTML, CSS, JavaScript)',
      image: '/App9.png',
      link: 'https://github.com/Virajbane/VIRRMART.com',
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section className="py-2 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:-translate-y-2 w-full max-w-2xl"
            >
              <ProjectCard project={project} />
            </div>
          ))}

          {!showAll && (
            <button
              onClick={() => router.push('/Project')}
              className="mt-4 px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all font-medium"
            >
              View More Projects
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
