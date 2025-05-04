"use client"
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import AnimatedFooter from './Footer';

export default function ContactMeComponent() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  
  // Text animation states
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  
  // Hover states for card animations
  const [hoverStates, setHoverStates] = useState({
    linkedin: false,
    email: false,
    instagram: false
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Stagger animations
    const titleTimer = setTimeout(() => setTitleVisible(true), 300);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 600);
    const cardsTimer = setTimeout(() => setCardsVisible(true), 900);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(cardsTimer);
    };
  }, []);

  // Update hover state for specific card
  const handleMouseEnter = (card) => {
    setHoverStates(prev => ({ ...prev, [card]: true }));
  };

  const handleMouseLeave = (card) => {
    setHoverStates(prev => ({ ...prev, [card]: false }));
  };

  return (
    <div className={`w-full max-w-6xl mt-20 mx-auto p-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative rounded-2xl overflow-hidden p-8 bg-transparent border border-gray-800 shadow-2xl">
        {/* Enhanced background effects */}
        
        
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 to-transparent animate-float"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-500/30 to-transparent animate-float-delayed"></div>
        </div>
        
        <div className="relative z-10">
          {/* Title with enhanced animation */}
          <h2 
            className={`text-4xl font-bold text-white mb-3 transition-all duration-700 
              ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="inline-block animate-shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Contact me
            </span>
          </h2>
          
          {/* Subtitle with enhanced animation */}
          <p 
            className={`text-gray-300 mb-10 transition-all duration-700 delay-200 
              ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            You can contact me via Email, LinkedIn or Instagram. I usually respond within a day.
          </p>
          
          {/* Contact cards with enhanced animations */}
          <div 
            className={`flex flex-col md:flex-row gap-6 transition-all duration-700 delay-300 
              ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* LinkedIn Card */}
            <a 
              href="https://www.linkedin.com/in/virubane/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex-1 bg-gradient-to-r from-black to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center text-center hover:shadow-lg hover:shadow-blue-500/10"
              onMouseEnter={() => handleMouseEnter('linkedin')}
              onMouseLeave={() => handleMouseLeave('linkedin')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 animate-gradient-shift"></div>
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-black to-gray-900 rounded-full mb-4 group-hover:from-blue-900 group-hover:to-purple-900 transition-all duration-500 p-0.5">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-black overflow-hidden">
                  <Linkedin 
                    size={28} 
                    className={`text-gray-400 group-hover:text-white transition-all duration-500 ${hoverStates.linkedin ? 'animate-pulse-slow' : ''}`} 
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">LinkedIn</h3>
              <p className="text-gray-400 font-mono group-hover:text-blue-300 transition-colors">virubane</p>
            </a>
            
            {/* Email Card */}
            <a 
              href="mailto:virajbane2004@gmail.com"
              className="group relative flex-1 bg-gradient-to-r from-black to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center text-center hover:shadow-lg hover:shadow-purple-500/10"
              onMouseEnter={() => handleMouseEnter('email')}
              onMouseLeave={() => handleMouseLeave('email')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 animate-gradient-shift-reverse"></div>
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-black to-gray-900 rounded-full mb-4 group-hover:from-purple-900 group-hover:to-blue-900 transition-all duration-500 p-0.5">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-black overflow-hidden">
                  <Mail 
                    size={28} 
                    className={`text-gray-400 group-hover:text-white transition-all duration-500 ${hoverStates.email ? 'animate-pulse-slow' : ''}`} 
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">Email</h3>
              <p className="text-gray-400 font-mono group-hover:text-purple-300 transition-colors">virajbane2004@gmail.com</p>
            </a>
            
            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/_.virajbane._/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex-1 bg-gradient-to-r from-black to-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 flex flex-col items-center text-center hover:shadow-lg hover:shadow-pink-500/10"
              onMouseEnter={() => handleMouseEnter('instagram')}
              onMouseLeave={() => handleMouseLeave('instagram')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 animate-gradient-shift"></div>
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-black to-gray-900 rounded-full mb-4 group-hover:from-pink-900 group-hover:to-purple-900 transition-all duration-500 p-0.5">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-black overflow-hidden">
                  <Instagram 
                    size={28} 
                    className={`text-gray-400 group-hover:text-white transition-all duration-500 ${hoverStates.instagram ? 'animate-pulse-slow' : ''}`} 
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors">Instagram</h3>
              <p className="text-gray-400 font-mono group-hover:text-pink-300 transition-colors">_.virajbane_.</p>
            </a>
          </div>
        </div>
        
      </div>
      
      
      {/* Add global animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 6s ease infinite;
        }
        
        .animate-gradient-shift-reverse {
          background-size: 400% 400%;
          animation: gradient-shift 6s ease-in-out infinite reverse;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
      <AnimatedFooter/>
    </div>
  );
}