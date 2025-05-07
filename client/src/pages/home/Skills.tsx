import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import { 
  Monitor, 
  Server, 
  BrainCircuit, 
  Settings 
} from "lucide-react";

const SkillCategory = ({ 
  title, 
  icon, 
  skills, 
  delay 
}: { 
  title: string; 
  icon: JSX.Element; 
  skills: { name: string; percentage: number }[];
  delay: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animate progress bars when they come into view
  useEffect(() => {
    const progressBars = document.querySelectorAll(".progress-bar-fill");
    
    const animateSkillBars = () => {
      progressBars.forEach(bar => {
        const position = (bar as HTMLElement).getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          const width = (bar as HTMLElement).getAttribute("data-width") || "0%";
          (bar as HTMLElement).style.width = width;
        }
      });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check when scrolling
    window.addEventListener("scroll", animateSkillBars);
    
    return () => {
      window.removeEventListener("scroll", animateSkillBars);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.7, 
            delay: delay,
            staggerChildren: 0.1
          }
        }
      }}
    >
      <h3 className="text-2xl font-bold mb-8 flex items-center">
        <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
          {icon}
        </span>
        {title}
      </h3>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="skill-item"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-primary dark:text-primary font-medium">{skill.percentage}%</span>
            </div>
            <div className="progress-bar bg-gray-200 dark:bg-gray-700">
              <div 
                className="progress-bar-fill bg-primary" 
                data-width={`${skill.percentage}%`} 
                style={{ width: "0%" }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text"
        >
          Skills & Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SkillCategory 
            title="Frontend Development" 
            icon={<Monitor className="h-6 w-6 text-primary" />} 
            skills={skillsData.frontend}
            delay={0.2}
          />
          
          <SkillCategory 
            title="Backend Development" 
            icon={<Server className="h-6 w-6 text-primary" />} 
            skills={skillsData.backend}
            delay={0.4}
          />
          
          <SkillCategory 
            title="Machine Learning" 
            icon={<BrainCircuit className="h-6 w-6 text-primary" />} 
            skills={skillsData.machineLearning}
            delay={0.6}
          />
          
          <SkillCategory 
            title="Tools & Workflow" 
            icon={<Settings className="h-6 w-6 text-primary" />} 
            skills={skillsData.tools}
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
