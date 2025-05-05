// components/TimelineItem.jsx
export default function TimelineItem({ 
  title, 
  subtitle, 
  date, 
  description, 
  position = 'right', 
  animationProgress = 1,
  isMobile
}) {
  // For mobile view, handle the layout differently
  const flexDirection = !isMobile && position === 'left' ? 'flex-row-reverse' : 'flex-row';
  const marginClass = !isMobile ? (position === 'right' ? 'mr-8' : 'ml-8') : 'ml-8';

  return (
    <div className={`flex items-center mb-12 md:mb-24 relative ${flexDirection}`}>
      {/* Content box */}
      <div 
        className={`w-full md:w-5/12 p-4 md:p-6 bg-black rounded-lg border border-gray-800 transition-all duration-500 ${marginClass}`}
        style={{
          opacity: Math.min(1, animationProgress * 1.5),
          transform: `translateX(${position === 'right' || isMobile ? 
            `${(1 - Math.min(1, animationProgress * 1.2)) * -50}px` : 
            `${(1 - Math.min(1, animationProgress * 1.2)) * 50}px`
          })`
        }}
      >
        <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm md:text-gray-400 mb-1">{subtitle}</p>
        <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{date}</p>
        <p className="text-sm md:text-base text-gray-300">{description}</p>
      </div>
      
      {/* Center dot - positioned differently on mobile */}
      <div 
        className={`absolute ${isMobile ? 'left-0' : 'left-1/2'} transform ${isMobile ? '' : '-translate-x-1/2'} w-3 h-3 md:w-4 md:h-4 bg-white rounded-full z-10`}
        style={{
          opacity: Math.min(1, animationProgress * 2),
          transform: `scale(${Math.max(0.5, Math.min(1, animationProgress * 2))})`
        }}
      />
      
      {/* Empty space for the other side - only on desktop */}
      {!isMobile && <div className="hidden md:block md:w-5/12" />}
    </div>
  );
}