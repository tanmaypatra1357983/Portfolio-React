import { useState, useEffect, useRef } from "react";
import { allTechnologies } from "@/data/technologiesData";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";

const TechnologyCard = ({ 
  name, 
  index, 
  totalItems,
  isHighlighted
}: { 
  name: string; 
  index: number;
  totalItems: number;
  isHighlighted: boolean;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });
  
  // Determine animation direction based on position in grid
  // Alternate between left and right for each row
  const row = Math.floor(index / 3);
  const isEvenRow = row % 2 === 0;
  
  // For even rows: items slide from left, right, left
  // For odd rows: items slide from right, left, right
  const position = index % 3;
  let direction: 'left' | 'right';
  
  if (isEvenRow) {
    direction = position === 1 ? 'right' : 'left';
  } else {
    direction = position === 1 ? 'left' : 'right';
  }
  
  const animationClass = `slide-in-from-${direction}`;
  
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-500 ${
        isVisible ? animationClass : 'opacity-0'
      } ${
        isHighlighted ? 'scale-105 shadow-xl shadow-primary/20 z-10' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <span className="text-lg font-medium relative z-10">{name}</span>
      
      {/* Decorative background patterns */}
      <div 
        className={`absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl transition-opacity duration-300 ${
          isHighlighted ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      <div 
        className={`absolute -bottom-6 -left-6 w-12 h-12 bg-blue-500/10 rounded-full blur-lg transition-opacity duration-300 ${
          isHighlighted ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* Bottom border shine effect */}
      <div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full transform translate-x-full transition-transform duration-700 ${
          isHighlighted ? 'animate-shine' : ''
        }`}
      ></div>
    </div>
  );
};

const Technologies = () => {
  // Use parallax scroll for Apple-like effects
  useParallaxScroll();
  
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });
  
  // Random highlight effect for cards
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (!isSectionVisible) return;
    
    // Create a timed interval to highlight different cards randomly
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * allTechnologies.length);
      setHighlightedIndex(randomIndex);
      
      // Reset highlight after a short delay
      setTimeout(() => {
        setHighlightedIndex(null);
      }, 1200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isSectionVisible]);
  
  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="py-20 section-wrapper relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="parallax-scroll parallax-slow">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center gradient-text ${
            isSectionVisible ? 'slide-in-from-bottom' : 'opacity-0'
          }`}>
            Technologies I Work With
          </h2>
          
          <p className={`text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 ${
            isSectionVisible ? 'fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '0.2s' }}>
            The tools and technologies I've mastered on my development journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allTechnologies.map((tech, index) => (
            <TechnologyCard 
              key={index}
              name={tech} 
              index={index}
              totalItems={allTechnologies.length}
              isHighlighted={highlightedIndex === index}
            />
          ))}
        </div>
      </div>
      
      <style>
        {`
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .animate-shine {
            animation: shine 1.5s ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default Technologies;