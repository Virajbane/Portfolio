import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced certificate data with detailed descriptions
const certificates = [
  {
    id: 1,
    type: 'Professional',
    title: '3rd Place – Video Editing Competition',
    issuer: 'VIVA Institute of Technology',
    date: 'April 2025',
    image: '/Certificates1.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'Won 3rd place in the Video Editing Competition during INGENIOUS 2025. Created an impactful video highlighting the key features and real-world relevance of our project "Eyes.AI." The video demonstrated accessibility-focused tech innovations aimed at empowering the blind community.'
  },
  {
    id: 2,
    type: 'Professional',
    title: '3rd Place – Poster Presentation Competition',
    issuer: 'VIVA Institute of Technology',
    date: 'April 2025',
    image: '/Certificates2.png',
    linkedIn: 'https://linkedin.com/in/yourprofile',
    description: 'Secured 3rd place in the Poster Presentation Competition at INGENIOUS 2025, hosted by Viva Institute of Technology. Designed a visually compelling and informative poster to communicate the concept and social impact of our project "Eyes.AI," a voice-driven AI solution for the visually impaired.'
  },
  {
    id: 3,
    type: 'Participation',
    title: 'Algorithm 9.0 Hackathon',
    issuer: 'Anjuman-I-Islam Kalsekar Technical',
    date: 'August 2024',
    image: '/Certificates6.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'ALGORITHM 9.0, a national-level hackathon that spanned 32 hours. This intense coding and problem-solving event brought together tech enthusiasts from across the country, providing a platform to innovate, build, and compete in software development.'
  },
  {
    id: 4,
    type: 'Participation',
    title: 'COHERENCE 25',
    issuer: 'Vidyavardhini College of Engineering and Technology (VCET)',
    date: 'March 2025',
    image: '/Certificate8.png',
    linkedIn: 'https://linkedin.com/in/yourprofile',
    description: 'COHERENCE 25 is an intercollegiate or institutional hackathon organized under the Microsoft Learn Students Club in partnership with the Department of Computer and AI-DS at VCET.'
  },
  {
    id: 5,
    type: 'Professional',
    title: 'Python Internship',
    issuer: 'Branding Catalyst',
    date: 'July 2022 - August 2022',
    image: '/Certificates3.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/details/certifications/1715165301281/single-media-viewer/?profileId=ACoAAEobIrwBYQh7-Qwepo8FPAwbXxdDR3GRm-Q',
    description: 'Completed a 6-week internship where I worked on Python-based automation scripts and backend utilities. Demonstrated a strong ability to grasp core development tasks, debug logic, and write maintainable code. Gained exposure to real-world projects under the guidance of experienced mentors. Commended for being inquisitive, hardworking, and contributing actively to business-oriented development goals.'
  },
  {
    id: 6,
    type: 'Participation',
    title: 'Mumbai Hacks-World largest hackathon',
    issuer: 'Guinness World Records',
    date: 'November 2024',
    image: '/Certificates5.png',
    linkedIn: 'https://www.linkedin.com/in/virubane/recent-activity/all/',
    description: 'This certificate acknowledges participation in a Guinness World Records™ attempt for "The most participants in a generative AI hackathon."'
  }
];

export default function Achievements() {
  const [filter, setFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [animationState, setAnimationState] = useState('idle');

  // Filter certificates based on selected type
  const filteredCertificates = certificates.filter(cert => 
    filter === 'all' ? true : cert.type.toLowerCase() === filter.toLowerCase()
  );
  
  // Handle image click to show full view
  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowFullImage(true);
  };

  // Auto rotate certificates every 4 seconds
  useEffect(() => {
    if (filteredCertificates.length <= 1 || showFullImage) return;
    
    const interval = setInterval(() => {
      setAnimationState('transitioning');
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % filteredCertificates.length);
        setTimeout(() => {
          setAnimationState('idle');
        }, 100);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [filteredCertificates.length, showFullImage]);

  // Background animation variants
  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="w-full bg-transparent mt-15 text-white py-16">
      <motion.div 
        className="absolute inset-0 opacity-10 z-0"
        initial={{ opacity: 0.05 }}
        animate="animate"
        variants={backgroundVariants}
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 20%)',
          backgroundSize: '100% 100%',
          pointerEvents: 'none'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Achievements</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-white mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            A showcase of my professional certifications and participation in various tech events
          </motion.p>
        </motion.div>

        {/* Filter Buttons - Made more mobile friendly */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'professional'} onClick={() => setFilter('professional')}>
            Winners
          </FilterButton>
          <FilterButton active={filter === 'participation'} onClick={() => setFilter('participation')}>
            Participation
          </FilterButton>
        </div>

        {/* Certificates Showcase - Improved mobile responsiveness */}
        <div className="relative bg-black rounded-lg border border-gray-800 overflow-hidden" style={{minHeight: '32rem'}}>
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ background: "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)" }}
            animate={{ 
              background: animationState === 'transitioning'
                ? "radial-gradient(circle at 50% 50%, #222 0%, #000 100%)"
                : "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)"
            }}
            transition={{ duration: 0.5 }}
          />
          
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 0.8,
                zIndex: index === activeIndex ? 10 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Make card scrollable on mobile */}
              <div className="w-full h-full max-w-6xl flex flex-col md:flex-row p-4 md:p-6 overflow-y-auto">
                <motion.div 
                  className="w-full md:w-1/2 flex items-center justify-center min-h-64 md:h-full mb-6 md:mb-0"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-full max-w-md h-64 md:h-96 overflow-hidden rounded-md shadow-2xl cursor-pointer relative"
                    onClick={() => handleImageClick(certificate.image)}
                    whileHover="hover"
                  >
                    <motion.img 
                      src={certificate.image} 
                      alt={certificate.title} 
                      className="w-full h-full object-contain md:object-cover object-center bg-black"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 flex items-end justify-center pb-4"
                      variants={{
                        hover: {
                          opacity: 1,
                        }
                      }}
                    >
                      <span className="text-white font-medium px-4 py-2 bg-black bg-opacity-60 rounded-full text-sm">
                        Click to view full image
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-8">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="pb-6 md:pb-0" /* Add padding at bottom for mobile */
                  >
                    <motion.span 
                      className="inline-block px-3 py-1 text-xs font-semibold bg-white text-black rounded-full mb-4"
                      whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                    >
                      {certificate.type}
                    </motion.span>
                    
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {certificate.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-400 mb-4 text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Issued by {certificate.issuer} • {certificate.date}
                    </motion.p>
                    
                    <motion.div 
                      className="h-px w-full bg-gradient-to-r from-gray-800 via-white to-gray-800 my-4 md:my-6"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.7 }}
                    />
                    
                    <motion.p 
                      className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      {certificate.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <LinkedInButton url={certificate.linkedIn} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Navigation Dots - Made more touchable for mobile */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            {filteredCertificates.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAnimationState('transitioning');
                  setTimeout(() => {
                    setActiveIndex(index);
                    setTimeout(() => {
                      setAnimationState('idle');
                    }, 100);
                  }, 300);
                }}
                className={`w-4 h-4 rounded-full relative ${
                  index === activeIndex ? 'bg-white' : 'bg-gray-600'
                } overflow-hidden transition-colors duration-300`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View certificate ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-70"
                    animate={{
                      scale: [1, 1.8],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Fullscreen Image Modal - Improved for mobile */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullImage(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-screen"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <img 
                src={selectedImage} 
                alt="Certificate Full View" 
                className="w-full h-full object-contain"
              />
              
              <motion.button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullImage(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
              
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Click anywhere to close
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// LinkedIn Button component with animated gradient
const LinkedInButton = ({ url }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md relative overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: hover ? 1 : 0.8,
        }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-gray-700  via-gray-700 to-gray-700"
        animate={{ 
          backgroundPosition: hover ? ["0% 0%", "100% 0%"] : "0% 0%",
        }}
        transition={{ 
          duration: 1.5, 
          repeat: hover ? Infinity : 0,
          repeatType: "mirror"
        }}
        style={{ opacity: 0.4, backgroundSize: "200% 100%" }}
      />
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="white"
        className="relative z-10"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
      
      <span className="font-medium text-white relative z-10 text-sm md:text-base">View on LinkedIn</span>
      
      {/* Shine effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" 
        initial={{ x: "-100%", opacity: 0.3 }}
        animate={{ 
          x: hover ? "100%" : "-100%",
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut"
        }}
        style={{ mixBlendMode: "overlay" }}
      />
      
      {/* Border glow effect */}
      {hover && (
        <motion.div 
          className="absolute inset-0 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            boxShadow: "0 0 10px rgba(255,255,255,0.5), inset 0 0 5px rgba(255,255,255,0.5)",
            pointerEvents: "none"
          }}
        />
      )}
    </motion.a>
  );
};

// Filter button component - Made more mobile friendly
const FilterButton = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-1 md:px-6 md:py-2 rounded-full border text-sm md:text-base relative overflow-hidden ${
      active 
        ? 'border-white' 
        : 'border-gray-700 hover:border-gray-400'
    } transition-all duration-300`}
  >
    {active && (
      <motion.div 
        className="absolute inset-0 bg-white"
        layoutId="activeFilterBackground"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className={`relative z-10 font-medium ${active ? 'text-black' : 'text-white'}`}>
      {children}
    </span>
    
    {!active && (
      <motion.div 
        className="absolute inset-0 bg-white opacity-0"
        initial={false}
        whileHover={{ opacity: 0.1 }}
      />
    )}
  </motion.button>
);