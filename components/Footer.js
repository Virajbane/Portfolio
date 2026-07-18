"use client"
import { useState, useEffect } from 'react';
import { Github, Mail } from 'lucide-react';

export default function AnimatedFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.offsetHeight;
      if (scrollPosition > pageHeight - 200) setIsVisible(true);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer
      id="contact"
      className={`py-3 sm:py-4 border-t text-xs sm:text-sm relative z-10 transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: '', borderColor: '#666666' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-col xs:flex-row items-center justify-center xs:space-x-4 space-y-2 xs:space-y-0 w-full">
            <h3
              className="font-medium text-center xs:text-left"
              style={{ color: '#FFFFFF', fontFamily: "'Playfair Display', serif", fontSize: '18px' }}
            >
              Viraj Bane
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/Virajbane"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
                className="transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@virajbane.com"
                style={{ color: '#A1A1AA' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
                className="transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p
            className="flex items-center justify-center text-xs flex-wrap px-2"
            style={{ color: '#A1A1AA', fontFamily: "'Space Mono', monospace" }}
          >
            <span className="whitespace-nowrap">© {new Date().getFullYear()} Viraj Bane</span>
            <span className="inline-flex items-center mx-1 whitespace-nowrap">
              <span className="hidden xs:inline mx-1">—</span>
              Built in-house
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}