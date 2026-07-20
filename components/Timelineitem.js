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
    <div className={`flex items-center mb-12 md:mb-8 relative ${flexDirection}`}>
      {/* Content box */}
      <div 
        className={`w-full md:w-5/12 p-4 md:p-6 rounded-lg transition-all duration-500 ${marginClass}`}
        style={{
          background: 'transparent',
          border: '1px solid #666666',
          opacity: Math.min(1, animationProgress * 1.5),
          transform: `translateX(${position === 'right' || isMobile ? 
            `${(1 - Math.min(1, animationProgress * 1.2)) * -50}px` : 
            `${(1 - Math.min(1, animationProgress * 1.2)) * 50}px`
          })`
        }}
      >
        <h3
          className="text-lg md:text-xl mb-1"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#FFFFFF' }}
        >{title}</h3>
        <p className="text-sm mb-1" style={{ color: '#A1A1AA' }}>{subtitle}</p>
        <p
          className="text-xs md:text-sm mb-2 md:mb-3"
          style={{ color: '#666666', fontFamily: "'Space Mono', monospace" }}
        >{date}</p>
        <p className="text-sm md:text-base" style={{ color: '#D4D4D8' }}>{description}</p>
      </div>
      
      {/* Center dot - positioned differently on mobile */}
      <div 
        className={`absolute ${isMobile ? 'left-0' : 'left-1/2'} transform ${isMobile ? '' : '-translate-x-1/2'} w-3 h-3 md:w-4 md:h-4 rounded-full z-10`}
        style={{
          background: '#FFFFFF',
          opacity: Math.min(1, animationProgress * 2),
          transform: `scale(${Math.max(0.5, Math.min(1, animationProgress * 2))})`
        }}
      />
      
      {/* Empty space for the other side - only on desktop */}
      {!isMobile && <div className="hidden md:block md:w-5/12" />}
    </div>
  );
}