import { useEffect, useRef, useState } from 'react';

export default function ResumeTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const timelineRef = useRef(null);
  
  // Handle scroll for progress and active section
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      // Calculate scroll progress for gradient animation
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
      
      // Determine active section based on viewport position
      const sections = timelineRef.current.querySelectorAll('.timeline-section');
      const viewportMiddle = scrollPosition + windowHeight / 2;
      
      let foundActive = false;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Check if the section is in the viewport
        if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
          setActiveSection(index);
          foundActive = true;
        }
      });
      
      // If no section is in view (like at the very top), set the first one as active
      if (!foundActive && sections.length > 0) {
        const firstSectionTop = sections[0].getBoundingClientRect().top;
        if (firstSectionTop > 0) {
          setActiveSection(0);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize on first render
  useEffect(() => {
    // Force an initial active section when component mounts
    setActiveSection(0);
    
    // Add a small delay before initializing to ensure DOM is ready
    const timer = setTimeout(() => {
      const handleInitialScroll = () => {
        const sections = timelineRef.current?.querySelectorAll('.timeline-section');
        if (sections && sections.length > 0) {
          // Find which section is currently visible in the viewport
          for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
              setActiveSection(i);
              break;
            }
          }
        }
      };
      
      handleInitialScroll();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-transparent text-white" ref={timelineRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-24 text-center">My Journey</h1>
        
        {/* Timeline */}
        <div className="relative">
          {/* Section 1: Diploma Education */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Diploma Education</h2>
                <p className="text-base sm:text-lg font-semibold mb-2">Diploma in Computer Engineering</p>
                <p className="mb-1">Vidyvardhini's College of Engineering And Technology</p>
                <p className="text-gray-400 mb-4 sm:mb-6">2020 - 2023</p>
                
                <p className="mb-4 text-sm sm:text-base">
                  Built a strong foundation in computer engineering principles and practices.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Developed technical skills and problem-solving abilities through coursework and projects.
                </p>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 left-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 0 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 0 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 right-0 transform translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 0 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 0 ? 'text-blue-500' : 'text-gray-400'}`}>1</span>
                  </div>
                </div>
                
                {/* Vertical line to next section */}
                <div className="absolute top-10 right-0 transform translate-x-1/2 w-1 h-full bg-gray-800"></div>
                
                {/* Vertical gradient line */}
                <div 
                  className="absolute top-10 right-0 transform translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ 
                    height: activeSection >= 0 ? '100%' : '0%',
                    transition: 'height 0.8s ease-out',
                    opacity: activeSection >= 1 ? 1 : 0,
                    boxShadow: activeSection === 0 || activeSection === 1 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Engineering Education */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row-reverse">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Engineering Education</h2>
                <p className="text-base sm:text-lg font-semibold mb-2">Bachelor of Engineering</p>
                <p className="mb-1">Viva Institute of Technology</p>
                <p className="text-gray-400 mb-4 sm:mb-6">Expected 2026</p>
                
                <p className="mb-4 text-sm sm:text-base">
                  Advancing knowledge in computer science and engineering concepts.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Participating in technical events and competitions to enhance practical skills.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Exploring specializations in software development and emerging technologies.
                </p>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 right-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 right-0 h-1 bg-gradient-to-l from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 1 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 1 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 left-0 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 1 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 1 ? 'text-blue-500' : 'text-gray-400'}`}>2</span>
                  </div>
                </div>
                
                {/* Vertical line to next section */}
                <div className="absolute top-10 left-0 transform -translate-x-1/2 w-1 h-full bg-gray-800"></div>
                
                {/* Vertical gradient line */}
                <div 
                  className="absolute top-10 left-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ 
                    height: activeSection >= 1 ? '100%' : '0%',
                    transition: 'height 0.8s ease-out',
                    opacity: activeSection >= 2 ? 1 : 0,
                    boxShadow: activeSection === 1 || activeSection === 2 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Web Development Foundations */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Web Development Foundations</h2>
                <p className="mb-4 text-sm sm:text-base">
                  Started learning HTML and CSS fundamentals, laying the groundwork for frontend development.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Discovered the power of creating interactive interfaces and responsive designs for the web.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Explored the connection between visual design and code structure for building effective user experiences.
                </p>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 left-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 2 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 2 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 right-0 transform translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 2 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 2 ? 'text-blue-500' : 'text-gray-400'}`}>3</span>
                  </div>
                </div>
                
                {/* Vertical line to next section */}
                <div className="absolute top-10 right-0 transform translate-x-1/2 w-1 h-full bg-gray-800"></div>
                
                {/* Vertical gradient line */}
                <div 
                  className="absolute top-10 right-0 transform translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ 
                    height: activeSection >= 2 ? '100%' : '0%',
                    transition: 'height 0.8s ease-out',
                    opacity: activeSection >= 3 ? 1 : 0,
                    boxShadow: activeSection === 2 || activeSection === 3 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Section 4: Advanced Development */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row-reverse">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Advanced Development</h2>
                <p className="mb-4 text-sm sm:text-base">
                  Mastered JavaScript fundamentals and expanded into React, Next.js, and Tailwind CSS.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Developed full-stack capabilities with Node.js, Express, and MySQL.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Explored Python development during internship at Branding Catalyst (Jun-Aug 2022).
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  Continuously expanding knowledge in various programming languages and frameworks to build comprehensive solutions.
                </p>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 right-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 right-0 h-1 bg-gradient-to-l from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 3 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 3 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 left-0 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 3 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 3 ? 'text-blue-500' : 'text-gray-400'}`}>4</span>
                  </div>
                </div>
                
                {/* Vertical line to next section */}
                <div className="absolute top-10 left-0 transform -translate-x-1/2 w-1 h-full bg-gray-800"></div>
                
                {/* Vertical gradient line */}
                <div 
                  className="absolute top-10 left-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ 
                    height: activeSection >= 3 ? '100%' : '0%',
                    transition: 'height 0.8s ease-out',
                    opacity: activeSection >= 4 ? 1 : 0,
                    boxShadow: activeSection === 3 || activeSection === 4 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Section 5: Projects */}
          <div className="timeline-section mb-16 sm:mb-32 relative">
            <div className="flex flex-col md:flex-row">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Key Projects</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">EDU.AI: Classroom Diversity AI Solution</h3>
                  <p className="mb-4 text-sm sm:text-base">
                    Developed an AI-powered platform to bridge the gap between teaching at scale and individual needs. Integrated personalized learning tools, quizzes, and real-time analytics. Successfully demonstrated the project at the world's largest hackathon.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Move On: Ride-Hailing Application</h3>
                  <p className="text-sm sm:text-base">
                    Designed and developed a web application similar to Uber, enabling seamless ride-hailing services. Utilized ReactJS and Tailwind CSS to create an intuitive user interface. Ensured data security and user authentication features using modern development tools.
                  </p>
                </div>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 left-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 4 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 4 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 right-0 transform translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 4 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 4 ? 'text-blue-500' : 'text-gray-400'}`}>5</span>
                  </div>
                </div>
                
                {/* Vertical line to next section */}
                <div className="absolute top-10 right-0 transform translate-x-1/2 w-1 h-full bg-gray-800"></div>
                
                {/* Vertical gradient line */}
                <div 
                  className="absolute top-10 right-0 transform translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ 
                    height: activeSection >= 4 ? '100%' : '0%',
                    transition: 'height 0.8s ease-out',
                    opacity: activeSection >= 5 ? 1 : 0,
                    boxShadow: activeSection === 4 || activeSection === 5 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Section 6: Achievements */}
          <div className="timeline-section relative">
            <div className="flex flex-col md:flex-row-reverse">
              {/* Content */}
              <div className="w-full md:w-7/12 md:pl-12 mb-8 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Achievements & Activities</h2>
                
                <div className="mb-6">
                  <p className="text-base sm:text-lg font-bold mb-2">INGENIOUS 2025: Present. Innovate. Dominate.</p>
                  <p className="mb-2 text-sm sm:text-base">Organized by Viva Institute of Technology — A platform for creators, coders, and designers.</p>
                  <ul className="list-disc pl-5 mb-4 text-sm sm:text-base">
                    <li className="mb-1">3rd Place – Poster Presentation Competition</li>
                    <li className="mb-1">3rd Place – Video Editing Competition</li>
                  </ul>
                </div>
                
                <p className="mb-4 text-sm sm:text-base">Participated in the world's largest hackathon and received a Guinness World Record certificate for participation.</p>
                
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-sm sm:text-base">Technical Skills</p>
                  <p className="text-sm sm:text-base">ReactJS, Next.js, Tailwind CSS, JavaScript, Java, Python, Express, MySQL, Node.js</p>
                </div>
                
                <p className="text-sm sm:text-base">Head of Editing and Photography in college, passionate about traveling, creating reels, and video editing.</p>
              </div>
              
              {/* Timeline element - Now visible on all screens */}
              <div className="w-full md:w-5/12 relative">
                {/* Horizontal line */}
                <div className="absolute top-10 right-0 w-full h-1 bg-gray-800"></div>
                
                {/* Gradient animation */}
                <div 
                  className="absolute top-10 right-0 h-1 bg-gradient-to-l from-blue-500 to-purple-500"
                  style={{ 
                    width: activeSection >= 5 ? '100%' : '0%',
                    transition: 'width 0.8s ease-out',
                    boxShadow: activeSection === 5 ? '0 0 8px #3b82f6' : 'none'
                  }}
                ></div>
                
                {/* Circle marker */}
                <div className="absolute z-10 top-8 left-0 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                    activeSection === 5 ? 'border-blue-500 bg-black' : 'border-gray-600 bg-black'
                  }`}>
                    <span className={`text-lg font-bold ${activeSection === 5 ? 'text-blue-500' : 'text-gray-400'}`}>6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}