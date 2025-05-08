import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Heart, Mail, ArrowRight, Github, FileText, Download } from "lucide-react";
import { aboutData } from "@/data/aboutData";
import { educationData, internshipData, certificationData, hackathonData } from "@/data/educationData";
import { useScrollAnimation, useScrollCompression } from "@/hooks/use-scroll-animation";
import { useEffect, useRef } from "react";

const About = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: false
  });

  const { ref: bioRef, isVisible: isBioVisible, isCompressed } = useScrollCompression<HTMLDivElement>({
    threshold: 0.1,
  });

  // Reset animation on scroll
  const timelineRef = useRef<HTMLDivElement>(null);
  const animatedItemsRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-on-scroll");
          entry.target.classList.remove("reset-animation");
        } else {
          // Reset animation when element leaves viewport
          entry.target.classList.remove("animate-on-scroll");
          entry.target.classList.add("reset-animation");
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (animatedItemsRef.current) {
      animatedItemsRef.current.forEach(item => {
        if (item) observer.observe(item);
      });
    }
    
    return () => {
      if (animatedItemsRef.current) {
        animatedItemsRef.current.forEach(item => {
          if (item) observer.unobserve(item);
        });
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden section-wrapper"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-center gradient-text heading-float ${isSectionVisible ? 'slide-in-from-bottom' : 'opacity-0'}`}>
          About Me
        </h2>

        <div 
          ref={bioRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isCompressed ? 'scale-95 opacity-50' : ''} transition-all duration-500`}
        >
          <div className={`${isBioVisible ? 'slide-in-from-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-white dark:to-gray-900 rounded-2xl blur-xl opacity-70 scale-105 animate-pulse-slow"></div>
              <div className="relative p-2 bg-white dark:bg-gray-800 rounded-2xl border-2 border-primary/30 shadow-2xl">
                <img
                  src="/assets/profile.png"
                  alt="Tanmay Patra"
                  className="w-full h-auto rounded-xl shadow-inner mx-auto max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                />
              </div>
              
              <div className="mt-6 flex justify-center">
                <a 
                  href="/assets/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <FileText className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  View Resume
                </a>
                <a 
                  href="/assets/resume.pdf" 
                  download="Tanmay_Patra_Resume.pdf"
                  className="ml-4 inline-flex items-center bg-white hover:bg-gray-100 text-primary border border-primary px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Download
                </a>
              </div>
            </div>
          </div>

          <div className={`${isBioVisible ? 'slide-in-from-right' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6">
              Hello, I'm <span className="gradient-text">Tanmay Patra</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {aboutData.intro}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {aboutData.passion}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start slide-in-from-left stagger-1">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Experience</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.experience}</p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-2">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Completed Projects</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.projects} projects</p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-3">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.education}</p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.location}</p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center text-primary dark:text-primary hover:text-primary-dark dark:hover:text-primary-dark font-medium transition-colors slide-in-from-left stagger-5"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Let's work together
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Education Timeline */}
        <div className="mt-20" ref={timelineRef}>
          <h3 className={`text-2xl font-bold mb-10 text-center fade-in heading-float ${isSectionVisible ? 'animate-on-scroll' : ''}`}>
            Education & Experience
          </h3>
          
          <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float">
            Education
          </h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {educationData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (el && (animatedItemsRef.current[index] = el))}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12 slide-in-from-right"
                    : "md:mr-[50%] md:pr-12 md:text-right slide-in-from-left"
                } reset-animation`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in`}
                  style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                >
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <span className="text-primary text-sm font-medium">
                    {item.period}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.degree}</h5>
                  <p className="text-muted-foreground">{item.institution}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Professional Experience */}
          <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float">
            Experience
          </h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {internshipData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (el && (animatedItemsRef.current[educationData.length + index] = el))}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12 slide-in-from-right"
                    : "md:mr-[50%] md:pr-12 md:text-right slide-in-from-left"
                } reset-animation`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in`}
                  style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                >
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <span className="text-primary text-sm font-medium">
                    {item.period}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.title}</h5>
                  <p className="text-muted-foreground">{item.company}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      <span className="font-semibold">Location:</span> {item.location}
                    </p>
                    {item.githubUrl && (
                      <a 
                        href={item.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-4 text-primary hover:text-primary-dark transition-colors flex items-center text-sm"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Certifications */}
          <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float mt-12">
            Certifications
          </h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {certificationData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (el && (animatedItemsRef.current[educationData.length + internshipData.length + index] = el))}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12 slide-in-from-right"
                    : "md:mr-[50%] md:pr-12 md:text-right slide-in-from-left"
                } reset-animation`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in`}
                  style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                >
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <span className="text-primary text-sm font-medium">
                    {item.year}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.title}</h5>
                  <p className="text-muted-foreground">{item.organization}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Hackathons */}
          <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float mt-12">
            Hackathons
          </h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {hackathonData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (el && (animatedItemsRef.current[educationData.length + internshipData.length + certificationData.length + index] = el))}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12 slide-in-from-right"
                    : "md:mr-[50%] md:pr-12 md:text-right slide-in-from-left"
                } reset-animation`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in`}
                  style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                >
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <span className="text-primary text-sm font-medium">
                    {item.year}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.name}</h5>
                  <p className="text-muted-foreground">{item.project}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;