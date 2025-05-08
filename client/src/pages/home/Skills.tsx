import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import {
  Monitor,
  Server,
  BrainCircuit,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  useScrollAnimation,
  useScrollCompression,
} from "@/hooks/use-scroll-animation";

const SkillItem = ({
  skill,
  index,
  isVisible,
  animationDirection,
  delay,
}: {
  skill: { name: string; percentage: number };
  index: number;
  isVisible: boolean;
  animationDirection: "left" | "right";
  delay: number;
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => {
                if (progressRef.current) {
                  progressRef.current.style.width = `${skill.percentage}%`;
                }
              },
              index * 100 + delay * 1000,
            );
          } else {
            if (progressRef.current) {
              progressRef.current.style.width = "0%";
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(progressRef.current);

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [skill.percentage, index, delay]);

  return (
    <div
      className={`skill-item ${isVisible ? `fade-in` : "opacity-0"}`}
      style={{ animationDelay: `${delay + index * 0.1}s` }}
    >
      <div className="flex items-center mb-1">
        <ChevronRight className="h-4 w-4 text-primary mr-1" />
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-primary text-xs font-medium ml-auto">
          {skill.percentage}%
        </span>
      </div>
      <div className="progress-bar bg-gray-200 dark:bg-gray-700 h-1.5">
        <div
          ref={progressRef}
          className="progress-bar-fill bg-primary"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

const SkillCategory = ({
  title,
  icon,
  skills,
  animationDirection,
  staggerDelay,
}: {
  title: string;
  icon: JSX.Element;
  skills: { name: string; percentage: number }[];
  animationDirection: "left" | "right";
  staggerDelay: number;
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false,
  });

  return (
    <div
      ref={ref}
      className={`transform transition-transform duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} bg-white/50 dark:bg-gray-800/50 rounded-xl p-5 shadow-lg backdrop-blur-sm`}
    >
      <h3
        className={`text-xl font-bold mb-4 flex items-center ${isVisible ? `slide-in-from-${animationDirection}` : "opacity-0"}`}
      >
        <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
          {icon}
        </span>
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            skill={skill}
            index={index}
            isVisible={isVisible}
            animationDirection={animationDirection}
            delay={staggerDelay}
          />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
      once: false,
    });

  return (
    <section id="skills" className="py-20 section-wrapper" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 text-center gradient-text heading-float ${isSectionVisible ? "slide-in-from-bottom" : "opacity-0"}`}
        >
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCategory
            title="Languages"
            icon={<Monitor className="h-5 w-5 text-primary" />}
            skills={skillsData.Languages}
            animationDirection="left"
            staggerDelay={0.2}
          />

          <SkillCategory
            title="Web Development"
            icon={<Server className="h-5 w-5 text-primary" />}
            skills={skillsData.Web_Development}
            animationDirection="right"
            staggerDelay={0.4}
          />

          <SkillCategory
            title="ML & AI"
            icon={<BrainCircuit className="h-5 w-5 text-primary" />}
            skills={skillsData.machineLearning}
            animationDirection="left"
            staggerDelay={0.6}
          />

          <SkillCategory
            title="Tools"
            icon={<Settings className="h-5 w-5 text-primary" />}
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
