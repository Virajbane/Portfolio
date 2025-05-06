"use client";
import { useState } from "react";
import { ChevronRight, Plus, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";

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
      className="group relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg transition-all duration-700 shadow-xl block mb-6 sm:mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ${
          isHovered ? "scale-110 filter-none" : "scale-100"
        }`}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-90" : "opacity-70"
        }`}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 font-sans line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-2 sm:mb-4 font-light text-sm sm:text-base line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} name={tech} />
          ))}
        </div>
        <div
          className={`mt-3 sm:mt-6 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center text-white hover:text-gray-300 pb-1 transition-all font-medium text-sm sm:text-base">
            View Project
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
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
      title: "HealthAI",
      technologies: ["Next.js", "Tailwind", "TypeScript"],
      description:
        "Experience the future of healthcare with personalized AI diagnosis, real-time monitoring, and instant access to medical professionals.",
      image: "/app1.png",
      link: "https://github.com/Virajbane/Ai.healthcare",
    },
    {
      title: "Move on",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      description:
        "Empower your travel. Connect effortlessly, explore freely, and move on with confidence.",
      image: "/App13.png",
      link: "https://github.com/Virajbane/Move-on",
    },
    {
      title: "To do list App",
      technologies: ["React", "Firebase", "Tailwind"],
      description: "Next-gen collaboration tool for students and developers.",
      image: "/App7.png",
      link: "https://github.com/Virajbane/To-do-list",
    },
    {
      title: "Agro-Farm",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Platform for farmers to solve daily issues and sell crops.",
      image: "/App10.png",
      link: "https://github.com/Virajbane/Agro-Farm",
    },
    {
      title: "Amazon Landing page",
      technologies: ["HTML", "CSS", "JavaScript"],
      description:
        "E-Commerce Website Inspired by Amazon with Creative Touches (HTML, CSS, JavaScript)",
      image: "/App9.png",
      link: "https://github.com/Virajbane/VIRRMART.com",
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section className="py-2 bg-transparent">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {/* Single column layout for all screen sizes */}
          <div className="w-full flex flex-col gap-4 sm:gap-6 md:gap-8">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:-translate-y-2 w-full"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          

          {!showAll && (
            <div className="flex justify-center mt-8 mb-24">
              <button
                onClick={() => router.push("/Project")}
                className="px-8 py-4 bg-gradient-to-r from-black to-gray-900 rounded-full transition-all duration-500 group flex items-center border-x border-white border-opacity-10 hover:shadow-white hover:shadow-inner electric-btn animate-fadeIn"
              >
                <span className="mr-3 glitch-text">
                  <span className="glitch-span">View More Projects</span>
                </span>
                <ArrowRight
                  size={16}
                  className="transition-all duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          )}

          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes electricPulse {
              0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
              }
              20% {
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
              }
              40% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
              }
              60% {
                box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.1);
              }
              80% {
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
              }
            }

            @keyframes glitch {
              0% {
                text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75),
                  -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
              }
              14% {
                text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75),
                  -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
              }
              15% {
                text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75),
                  0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
              }
              49% {
                text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75),
                  0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
              }
              50% {
                text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75),
                  0.05em 0 0 rgba(255, 255, 255, 0.75);
              }
              99% {
                text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75),
                  0.05em 0 0 rgba(255, 255, 255, 0.75);
              }
              100% {
                text-shadow: -0.025em 0 0 rgba(255, 255, 255, 0.75),
                  -0.025em -0.025em 0 rgba(255, 255, 255, 0.75);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 1s ease-out forwards;
            }

            .animate-slideUp {
              animation: slideUp 0.8s ease-out forwards;
            }

            .electric-btn {
              animation: electricPulse 3s infinite;
              position: relative;
            }

            .electric-btn:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 9999px;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
              );
              background-size: 200% 100%;
              animation: shine 3s infinite;
            }

            @keyframes shine {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }

            .glitch-text {
              position: relative;
            }

            .glitch-text .glitch-span {
              animation: glitch 5s infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
