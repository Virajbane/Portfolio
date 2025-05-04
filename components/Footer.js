"use client"
import { useState, useEffect } from 'react';
import { Github, Heart, Mail } from 'lucide-react';

export default function AnimatedFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false);
  
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.offsetHeight;
      const triggerPoint = pageHeight - 200;
      
      if (scrollPosition > triggerPoint) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', onScroll);
    // Initial check in case footer is already in view
    onScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer
      id="contact"
      className={`py-4 border-t border-zinc-800 text-sm relative z-10 bg-black transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-4">
            <h3 className="text-zinc-200 font-medium">
              Viraj Bane
            </h3>
            <div className="flex space-x-3 text-zinc-400">
              <a 
                href="https://github.com/Virajbane" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-zinc-100 transition-colors duration-200"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@virajbane.com" 
                className="hover:text-zinc-100 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <p className="flex items-center justify-center text-zinc-400 text-xs">
            © {new Date().getFullYear()} Viraj Bane 
            <span className="inline-flex items-center mx-1">
              Built with 
              <Heart 
                className={`w-3 h-3 text-red-500 mx-1 ${hover ? 'animate-pulse' : ''}`} 
                fill="#ef4444"
              />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}