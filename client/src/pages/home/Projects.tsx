import { motion } from "framer-motion";
import { projectsData } from "@/data/projectData";
import { Code, ExternalLink } from "lucide-react";
import { useScrollAnimation, useScrollCompression } from "@/hooks/use-scroll-animation";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { useEffect, useRef, useState } from "react";

const ProjectCard = ({
  project,
  index,
  total
}: {
  project: typeof projectsData[0];
  index: number;
  total: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.15,
    once: false
  });
  
  // Determine animation direction based on index (alternating left/right)
  const isEven = index % 2 === 0;
  const animationClass = isEven ? 'slide-in-from-left' : 'slide-in-from-right';
  
  // Scale effect on hover
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      data-index={index}
      className={`relative project-card rounded-xl overflow-hidden shadow-lg ${isVisible ? animationClass : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
            <div className="flex space-x-3 mt-4">
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors transform hover:scale-110 duration-300"
              >
                <Code className="h-5 w-5" />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors transform hover:scale-110 duration-300"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
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
      
      {/* Decorative elements that enhance the Apple-like effect */}
      <div 
        className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl transition-all duration-500"
        style={{
          opacity: isHovered ? 0.8 : 0,
          transform: isHovered ? 'scale(1.5)' : 'scale(1)'
        }}
      ></div>
      <div 
        className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl transition-all duration-500"
        style={{
          opacity: isHovered ? 0.8 : 0,
          transform: isHovered ? 'scale(1.5)' : 'scale(1)'
        }}
      ></div>
    </div>
  );
};

const Projects = () => {
  // Use parallax scroll for Apple-like effects
  useParallaxScroll();
  
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 section-wrapper"
    >
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 10%, rgba(var(--primary), 0.15), transparent 40%), radial-gradient(circle at 75% 75%, rgba(var(--primary), 0.1), transparent 40%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="parallax-scroll parallax-slow">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text heading-float">
            Featured Projects
          </h2>
          <p className={`text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16 ${isSectionVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            A showcase of my recent work spanning web development, machine learning, and technical problem-solving
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              total={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
