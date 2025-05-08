import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import { 
  Monitor, 
  Server, 
  BrainCircuit, 
  Settings 
} from "lucide-react";
import { useScrollAnimation, useScrollCompression } from "@/hooks/use-scroll-animation";

const SkillCategory = ({ 
  title, 
  icon, 
  skills, 
  animationDirection,
  staggerDelay
}: { 
  title: string; 
  icon: JSX.Element; 
  skills: { name: string; percentage: number }[];
  animationDirection: "left" | "right";
  staggerDelay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });

  // Animation for progress bars
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Handle skill bar animation
  const animateSkillBars = () => {
    progressRefs.current.forEach((bar, index) => {
      if (!bar) return;
      
      const position = bar.getBoundingClientRect();
      const skill = skills[index];
      
      // Check if element is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        // Add a small delay for each subsequent skill
        const delay = index * 100;
        setTimeout(() => {
          bar.style.width = `${skill.percentage}%`;
        }, delay);
      } else {
        bar.style.width = "0%";
      }
    });
  };
  
  useEffect(() => {
    // Initial animation
    animateSkillBars();
    
    // Add scroll event listener
    window.addEventListener("scroll", animateSkillBars);
    
    return () => {
      window.removeEventListener("scroll", animateSkillBars);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-transform duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <h3 className={`text-2xl font-bold mb-8 flex items-center ${isVisible ? `slide-in-from-${animationDirection}` : 'opacity-0'}`}>
        <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
          {icon}
        </span>
        {title}
      </h3>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className={`skill-item ${isVisible ? 'fade-in' : 'opacity-0'}`}
            style={{ animationDelay: `${staggerDelay + index * 0.1}s` }}
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-primary dark:text-primary font-medium">{skill.percentage}%</span>
            </div>
            <div className="progress-bar bg-gray-200 dark:bg-gray-700">
              <div 
                ref={el => progressRefs.current[index] = el}
                className="progress-bar-fill bg-primary" 
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });

  return (
    <section id="skills" className="py-20 section-wrapper" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center gradient-text ${isSectionVisible ? 'slide-in-from-bottom' : 'opacity-0'}`}>
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SkillCategory 
            title="Frontend Development" 
            icon={<Monitor className="h-6 w-6 text-primary" />} 
            skills={skillsData.frontend}
            animationDirection="left"
            staggerDelay={0.2}
          />
          
          <SkillCategory 
            title="Backend Development" 
            icon={<Server className="h-6 w-6 text-primary" />} 
            skills={skillsData.backend}
            animationDirection="right"
            staggerDelay={0.4}
          />
          
          <SkillCategory 
            title="Machine Learning" 
            icon={<BrainCircuit className="h-6 w-6 text-primary" />} 
            skills={skillsData.machineLearning}
            animationDirection="left"
            staggerDelay={0.6}
          />
          
          <SkillCategory 
            title="Tools & Workflow" 
            icon={<Settings className="h-6 w-6 text-primary" />} 
            skills={skillsData.tools}
            animationDirection="right"
            staggerDelay={0.8}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
