"use client"
import { useState } from 'react';
import { ChevronRight, Plus, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Blog & Insights Component
export default function BlogInsights({ isHomePage = false }) {
  const router = useRouter();
  
  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Portfolio Websites",
      description: "My approach to creating responsive, performant portfolio sites with Next.js",
      date: "April 28, 2025",
      category: "Web Development",
      impact: "Clients reported 35% increase in engagement after implementing these techniques"
    },
    {
      id: 2,
      title: "Animation Principles for UI Design",
      description: "How motion design can enhance user experience without sacrificing performance",
      date: "April 15, 2025",
      category: "UI/UX",
      impact: "Featured in Design Weekly newsletter, reaching 50k+ designers"
    },
    {
      id: 3,
      title: "Space-Inspired Design Aesthetics",
      description: "Creating cosmic visual experiences that captivate users",
      date: "March 30, 2025",
      category: "Design",
      impact: "Awarded 'Most Innovative Design Approach' at DesignCon 2025"
    },
    {
      id: 4,
      title: "Optimizing Next.js Applications",
      description: "Performance techniques that improved loading times by over 40%",
      date: "March 12, 2025",
      category: "Performance",
      impact: "Implementation increased conversion rates by 22% for e-commerce client"
    }
  ];

  // Display fewer posts on homepage if needed
  const displayPosts = isHomePage ? blogPosts.slice(0, 2) : blogPosts;
  
  // Handle redirect to blog page
  const handleViewAllBlogs = () => {
    router.push('/Blog');
  };

  return (
    <div className="min-h-screen bg-transparent mt-15 text-white overflow-hidden relative">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-white to-transparent opacity-5 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-l from-white to-transparent opacity-5 blur-3xl rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Header with Glitch Animation */}
      <header className="py-16 text-center opacity-0 animate-fadeIn relative z-10">
        <h1 className="text-7xl font-bold mb-3 tracking-tighter glitch-text">
          <span className="">Blog & Insights</span>
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-white via-gray-500 to-black mb-6"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">Thoughts on design, development, and project reflections with real-world feedback</p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Blog Posts Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {displayPosts.map((post, index) => (
            <div key={post.id} className={`opacity-0 animate-slideUp`} style={{animationDelay: `${index * 0.15}s`}}>
              <BlogPostCard post={post} index={index} />
            </div>
          ))}
        </div>

        {/* "View All Articles" button that only appears on homepage */}
        {isHomePage && (
          <div className="flex justify-center mb-24">
            <button 
              onClick={handleViewAllBlogs}
              className="px-8 py-4 bg-gradient-to-r from-black to-gray-900 rounded-full transition-all duration-500 group flex items-center border-x border-white border-opacity-10 hover:shadow-white hover:shadow-inner electric-btn"
            >
              <span className="mr-3">View all articles</span>
              <ArrowRight size={16} className="transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes electricPulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
          20% { box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2); }
          40% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
          60% { box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.1); }
          80% { box-shadow: 0 0 0 3px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75), -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 255, 255, 0.75), -0.05em -0.025em 0 rgba(255, 255, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75), 0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 255, 255, 0.75), 0.025em 0.025em 0 rgba(255, 255, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75), 0.05em 0 0 rgba(255, 255, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 255, 255, 0.75), 0.05em 0 0 rgba(255, 255, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 255, 255, 0.75), -0.025em -0.025em 0 rgba(255, 255, 255, 0.75);
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
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 9999px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          background-size: 200% 100%;
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .glitch-text {
          position: relative;
        }
        
        .glitch-text .glitch-span {
          animation: glitch 5s infinite;
        }
      `}</style>
    </div>
  );
}

// Blog Post Card Component
function BlogPostCard({ post, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Alternate gradient direction based on index
  const gradientDirection = index % 2 === 0 ? 'to-tr' : 'to-bl';

  return (
    <div 
      className={`rounded-lg p-8 transition-all duration-500 overflow-hidden relative
                 ${isHovered ? 'transform scale-102' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(${index % 2 === 0 ? '135deg' : '225deg'}, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)`,
      }}
    >
      {/* Animated border gradient */}
      <div className={`absolute inset-0 border border-transparent ${isHovered ? 'border-gradient' : ''}`}></div>
      
      {/* Content container with offset to make room for border */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-gray-400 font-mono tracking-wider">{post.date}</span>
          <span className="bg-gradient-to-r from-black to-gray-900 px-4 py-1 text-xs rounded-full border border-gray-800">{post.category}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 transition-all duration-300"
            style={{ transform: isHovered ? 'translateX(8px)' : 'translateX(0)' }}>
          {post.title}
        </h3>
        <p className="text-gray-400 mb-8 leading-relaxed">{post.description}</p>
        
        <div className="border-t border-gray-800 pt-5 mb-5">
          <div className="flex items-center">
            <Plus size={16} className={`mr-2 transition-all duration-300 ${isHovered ? 'text-white rotate-45' : 'text-gray-500'}`} />
            <span className="text-sm font-medium">Project Impact</span>
          </div>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">{post.impact}</p>
        </div>
        
        <div className="flex justify-end mt-4">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500
                         ${isHovered ? 'bg-white bg-opacity-10' : 'bg-transparent'}`}>
            <ChevronRight 
              size={18} 
              className={`transition-all duration-500 ease-in-out 
                        ${isHovered ? 'opacity-100 text-white' : 'opacity-0 text-gray-600'}`} 
            />
          </div>
        </div>
      </div>

      {/* Gradient glow effect on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`absolute -inset-1 bg-gradient-to-r from-white via-gray-500 to-black opacity-10 blur-sm rounded-lg`}></div>
      </div>

      <style jsx>{`
        .border-gradient {
          background-image: linear-gradient(${gradientDirection}, rgba(255, 255, 255, 0.3), transparent 60%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          mask-clip: padding-box, border-box;
          padding: 1px;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}