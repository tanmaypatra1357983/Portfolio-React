import { useEffect, useRef } from 'react';

export function useParallaxScroll() {
  const scrollYRef = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Update the scroll position
      scrollYRef.current = window.scrollY;
      
      // Set a CSS variable with the scroll position
      document.documentElement.style.setProperty('--scroll-y', scrollYRef.current.toString());
      
      // Apply parallax effects to elements with the parallax class
      const parallaxElements = document.querySelectorAll('.parallax-scroll');
      parallaxElements.forEach((element) => {
        // Calculations for the visibility status of the element
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          // Get the element's position relative to the viewport
          const elementTop = rect.top;
          const elementHeight = rect.height;
          const viewportHeight = window.innerHeight;
          
          // Calculate the progress (0 to 1) of the element through the viewport
          const progressThroughViewport = 1 - (elementTop / viewportHeight);
          
          // Apply different parallax speeds based on the class
          if (element.classList.contains('parallax-slow')) {
            (element as HTMLElement).style.transform = `translateY(${progressThroughViewport * 30}px)`;
          } else if (element.classList.contains('parallax-medium')) {
            (element as HTMLElement).style.transform = `translateY(${progressThroughViewport * 50}px)`;
          } else if (element.classList.contains('parallax-fast')) {
            (element as HTMLElement).style.transform = `translateY(${progressThroughViewport * 70}px)`;
          }
        }
      });
      
      // Apply rotation effects
      const rotateElements = document.querySelectorAll('.rotate-on-scroll');
      rotateElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          const maxRotation = 8; // Maximum rotation in degrees
          
          // Calculate rotation based on distance from center
          const rotation = (distanceFromCenter / viewportCenter) * maxRotation;
          
          // Apply the 3D rotation
          (element as HTMLElement).style.transform = `rotateX(${rotation}deg)`;
          
          // Apply depth effect to children
          const children = element.children;
          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const depth = i * 50; // Each child gets deeper z translation
            child.style.transform = `translateZ(${depth}px)`;
          }
        }
      });
      
      // Apply header blur effect
      const header = document.querySelector('.header-blur-on-scroll');
      if (header) {
        const scrollProgress = Math.min(scrollYRef.current / 300, 1);
        (header as HTMLElement).style.backdropFilter = `blur(${scrollProgress * 10}px)`;
        (header as HTMLElement).style.backgroundColor = `rgba(var(--background), ${scrollProgress * 0.8})`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on first render
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollYRef.current;
}