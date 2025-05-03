export default function TimelineItem({ 
    title, 
    subtitle, 
    date, 
    description, 
    position = 'right', 
    animationProgress = 1 
  }) {
    return (
      <div className={`flex items-center justify-center mb-24 relative ${position === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content box */}
        <div 
          className={`w-5/12 p-6 bg-black rounded-lg border border-gray-800 transform transition-all duration-500 ${
            position === 'right' ? 'mr-8' : 'ml-8'
          }`}
          style={{
            opacity: Math.min(1, animationProgress * 1.5),
            transform: `translateX(${position === 'right' ? 
              `${(1 - Math.min(1, animationProgress * 1.2)) * -50}px` : 
              `${(1 - Math.min(1, animationProgress * 1.2)) * 50}px`
            })`
          }}
        >
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-gray-400 mb-1">{subtitle}</p>
          <p className="text-sm text-gray-500 mb-3">{date}</p>
          <p className="text-gray-300">{description}</p>
        </div>
        
        {/* Center dot */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"
          style={{
            opacity: Math.min(1, animationProgress * 2),
            transform: `scale(${Math.max(0.5, Math.min(1, animationProgress * 2))})`
          }}
        />
        
        {/* Empty space for the other side */}
        <div className="w-5/12" />
      </div>
    );
  }