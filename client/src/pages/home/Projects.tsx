import { motion } from "framer-motion";
import { projectsData } from "@/data/projectData";
import { Code, ExternalLink, ArrowRight } from "lucide-react";
import { useScrollAnimation, useScrollCompression } from "@/hooks/use-scroll-animation";
import { useEffect, useRef, useState } from "react";

const Projects = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });

  // Handle project card animations with scroll direction awareness
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedOnce, setAnimatedOnce] = useState<boolean[]>([]);
  
  useEffect(() => {
    // Initialize animation state array
    if (animatedOnce.length === 0 && projectsData.length > 0) {
      setAnimatedOnce(new Array(projectsData.length).fill(false));
    }
  }, [projectsData.length]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        const index = Number(entry.target.getAttribute('data-index'));
        
        if (entry.isIntersecting) {
          // Play animation when card enters viewport
          entry.target.classList.add('animate-card');
          entry.target.classList.remove('reset-animation');
          
          // Update animation state
          if (!isNaN(index)) {
            setAnimatedOnce(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        } else if (!animatedOnce[index]) {
          // Reset animation when card leaves viewport (only if not animated before)
          entry.target.classList.remove('animate-card');
          entry.target.classList.add('reset-animation');
        }
      });
    };
    
    // Create and use intersection observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [animatedOnce]);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 section-wrapper"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center gradient-text ${isSectionVisible ? 'slide-in-from-bottom' : 'opacity-0'}`}>
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              data-index={index}
              className={`project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg opacity-0 transform ${
                index % 3 === 0 ? 'translate-y-10' : 
                index % 3 === 1 ? 'translate-x-10' : '-translate-x-10'
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                transitionProperty: 'all',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors"
                        >
                          <Code className="h-5 w-5" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-16 ${isSectionVisible ? 'fade-in stagger-5' : 'opacity-0'}`}>
          <a
            href="#"
            className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-dark font-medium transition-colors text-lg hover-lift"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .animate-card {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
