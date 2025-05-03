"use client"
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Icons
import { FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { NavbarDemo } from './responsive-navbar';
import TechStackSlideshow from './Slideshow';
import ExperienceTimeline from './experienceTimeline';
import { ShootingStarsAndStarsBackgroundDemo } from './StarBackground';
import ProjectsSection from './ProjectsSection';

export default function Start() {
  // State for animation of stars
  const [stars, setStars] = useState([]);
  
  // Generate random stars for the background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 1,
          animationDuration: `${Math.random() * 5 + 3}s`,
        });
      }
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  // Technology icons data with monochrome logo styles
  const technologies = [
    { name: 'HTML', logo: 'html5' },
    { name: 'CSS', logo: 'css3' },
    { name: 'JavaScript', logo: 'javascript' },
    { name: 'TypeScript', logo: 'typescript' },
    { name: 'Hugo', logo: 'hugo' },
    { name: 'React', logo: 'react' },
    { name: 'PostgreSQL', logo: 'postgresql' },
    { name: 'MariaDB', logo: 'mariadb' },
    { name: 'Node.js', logo: 'nodejs' },
    { name: 'Rust', logo: 'rust' },
    { name: 'Git', logo: 'git' },
    { name: 'Java', logo: 'java' },
    { name: 'Spring', logo: 'spring' },
  ];

  // Experience data
  const experiences = [
    {
      company: 'Branding Catalyst',
      role: 'Python development internship',
      period: 'July, 2022 - August, 2022',
      description: 'Various activities in Python development'
    },
    
  ];

  // Personal projects data
  

  // Blog posts data
  const blogPosts = [
    {
      date: '24.12.2024',
      title: 'Contributing less to opensource',
      description: 'I contribute less to opensource. Why?'
    },
    {
      date: '17.11.2024',
      title: 'Why this site will not be open source?',
      description: 'Will this site ever be open-source? And why is it not open-source now.'
    },
    {
      date: '5.10.2024',
      title: 'My opinion on Hugo',
      description: 'Is Hugo a good static site generator? Should I use it?'
    }
  ];

  return (
    <div className="min-h-screen text-white bg-transparent ">
      <Head>
        <title>viraj bane | Full-Stack Web Developer</title>
        <meta name="description" content="Portfolio of Jakub Žitník, a Full-Stack Web Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Animated stars background */}
      
      

      <main className="container w-4xl mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section id="about" className="py-16  mt-20 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-transparent border border-zinc-800 rounded-lg p-8"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">
              Viraj Bane
            </h1>
            <p className="text-zinc-400 mb-4">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Virar, Maharashtra
              </span>
            </p>
            <p className="text-lg mb-6">
              I'm 20-year-old Aspiring Web Developer. I thrive on learning new technologies and pushing the boundaries of what's possible on the web.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:your-email@example.com" 
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaEnvelope className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/jzitnik-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/your-username" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-800 p-2 rounded-full"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* What I work with section */}
        <TechStackSlideshow/>

        {/* Experience section */}
        <ExperienceTimeline/>

        {/* My work section */}
        <section id="projects" className="py-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl  font-bold mb-8 text-center"
          >
            My work
          </motion.h2>
          
          <ProjectsSection/>
        </section>

        {/* My personal projects */}
        <section className="py-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            My personal projects
          </motion.h2>
          
          
          
          <div className="text-center mt-8">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="inline-block text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              More...
            </motion.a>
          </div>
        </section>

        {/* Latest blog posts */}
        <section id="posts" className="py-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Latest blog posts
          </motion.h2>
          
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.div 
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black border border-zinc-800 rounded-lg p-6"
              >
                <p className="text-sm text-zinc-400">{post.date}</p>
                <h3 className="text-xl font-bold mt-2 text-white">
                  {post.title}
                </h3>
                <p className="mt-2">{post.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="inline-block text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              More...
            </motion.a>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-6 border-t border-zinc-800 text-sm sm:text-base">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center text-zinc-400">
      <p className="leading-relaxed">
        © 2025 Viraj Bane 
      </p>
      <p className="mt-2 leading-relaxed">
        Built with <span className="text-red-500">❤</span> 
        <a
          href="https://gohugo.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:underline"
        >
          
        </a>
        . View projects on{" "}
        <a
          href="https://github.com/jzitnik-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  </div>
</footer>


      
    </div>
  );
}

// Technology logo component
