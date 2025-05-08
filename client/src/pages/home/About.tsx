import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Mail,
  ArrowRight,
  Github,
} from "lucide-react";
import { aboutData } from "@/data/aboutData";
import {
  educationData,
  internshipData,
  certificationData,
  hackathonData,
} from "@/data/educationData";
import {
  useScrollAnimation,
  useScrollCompression,
} from "@/hooks/use-scroll-animation";
import { useEffect, useRef } from "react";

const About = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
      once: false,
    });

  const {
    ref: bioRef,
    isVisible: isBioVisible,
    isCompressed,
  } = useScrollCompression<HTMLDivElement>({
    threshold: 0.1,
  });

  // Reset animation on scroll
  const timelineRef = useRef<HTMLDivElement>(null);
  const animatedItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
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

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (animatedItemsRef.current) {
      animatedItemsRef.current.forEach((item) => {
        if (item) observer.observe(item);
      });
    }

    return () => {
      if (animatedItemsRef.current) {
        animatedItemsRef.current.forEach((item) => {
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
        <h2
          className={`text-3xl md:text-4xl font-bold mb-16 text-center gradient-text heading-float ${
            isSectionVisible ? "slide-in-from-bottom" : "opacity-0"
          }`}
        >
          About Me
        </h2>

        <div
          ref={bioRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            isCompressed ? "scale-95 opacity-50" : ""
          } transition-all duration-500`}
        >
          <div
            className={`${isBioVisible ? "slide-in-from-left" : "opacity-0"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-white dark:to-gray-900 rounded-2xl blur-xl opacity-70 scale-105 animate-pulse-slow"></div>
              <div className="relative p-2 bg-white dark:bg-gray-800 rounded-2xl border-2 border-primary/30 shadow-2xl">
                <img
                  src="/assets/profile.jpg"
                  alt="Tanmay Patra"
                  className="w-full h-auto rounded-xl shadow-inner mx-auto max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                />
              </div>
            </div>
          </div>

          <div
            className={`${isBioVisible ? "slide-in-from-right" : "opacity-0"}`}
          >
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
                  <p className="text-gray-600 dark:text-gray-400">
                    {aboutData.internship}
                  </p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-2">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Completed Projects</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {aboutData.projects} projects
                  </p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-3">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {aboutData.education}
                  </p>
                </div>
              </div>

              <div className="flex items-start slide-in-from-left stagger-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {aboutData.location}
                  </p>
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
        <div className="mt-20 relative" ref={timelineRef}>
          {/* Background decorative elements */}
          <div className="absolute right-0 top-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 opacity-60"></div>
          <div className="absolute left-10 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 opacity-40"></div>
          <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-primary/10 rounded-full blur-2xl -z-10 opacity-30"></div>

          <h3
            className={`text-2xl font-bold mb-10 text-center fade-in heading-float ${
              isSectionVisible ? "animate-on-scroll" : ""
            }`}
          >
            Education & Experience
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8/12) - Timeline Content */}
            <div className="lg:col-span-8">
              {/* Education */}
              <div className="mb-16">
                <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float flex items-center">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  Education
                </h4>
                <div className="relative border-l border-primary/30 ml-4 pl-8">
                  {educationData.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => el && (animatedItemsRef.current[index] = el)}
                      className="mb-10 slide-in-from-left reset-animation"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div
                        className="absolute -left-[17px] w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in"
                        style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                      >
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group">
                        <span className="text-primary text-sm font-medium">
                          {item.period}
                        </span>
                        <h5 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                          {item.degree}
                        </h5>
                        <p className="text-muted-foreground">
                          {item.institution}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div className="mb-16">
                <h4 className="text-xl font-semibold mb-6 ml-4 slide-in-from-left heading-float flex items-center">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  Experience
                </h4>
                <div className="relative border-l border-primary/30 ml-4 pl-8">
                  {internshipData.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) =>
                        el &&
                        (animatedItemsRef.current[
                          educationData.length + index
                        ] = el)
                      }
                      className="mb-10 slide-in-from-left reset-animation"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div
                        className="absolute -left-[17px] w-9 h-9 rounded-full bg-primary flex items-center justify-center scale-in"
                        style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                      >
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group">
                        <span className="text-primary text-sm font-medium">
                          {item.period}
                        </span>
                        <h5 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-muted-foreground">{item.company}</p>
                        <div className="flex items-center mt-2">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            <span className="font-semibold">Location:</span>{" "}
                            {item.location}
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
              </div>
            </div>

            {/* Right Column (4/12) - Certifications, Hackathons, and decorative elements */}
            <div className="lg:col-span-4">
              <div className="sticky top-20">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl -z-10"></div>

                {/* Certifications Card */}
                <div className="bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl mb-8">
                  <h4 className="text-xl font-semibold mb-6 slide-in-from-right heading-float flex items-center">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <rect width="18" height="14" x="3" y="5" rx="2" />
                        <path d="M21 8H8" />
                        <path d="M21 12H8" />
                        <path d="M21 16H8" />
                        <path d="M4 9h1" />
                        <path d="M4 13h1" />
                        <path d="M4 17h1" />
                      </svg>
                    </div>
                    Certifications
                  </h4>

                  <div className="space-y-4">
                    {certificationData.map((item, index) => (
                      <div
                        key={index}
                        ref={(el) =>
                          el &&
                          (animatedItemsRef.current[
                            educationData.length + internshipData.length + index
                          ] = el)
                        }
                        className="bg-white/10 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/20 group"
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="text-base font-bold group-hover:text-primary transition-colors">
                            {item.title}
                          </h5>
                          <span className="text-primary text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.organization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hackathons Card */}
                <div className="bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl">
                  <h4 className="text-xl font-semibold mb-6 slide-in-from-right heading-float flex items-center">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M4 5V14H4C6.5 14 7 15.5 7 17L12 17V17C12 15.5 13.5 14 15 14H19V6C19 5.44772 18.5523 5 18 5H4Z" />
                        <path d="M14 14V20L12 18L10 20V14" />
                        <path d="M5 5V1" />
                        <path d="M9 5V3" />
                      </svg>
                    </div>
                    Hackathons
                  </h4>

                  <div className="space-y-4">
                    {hackathonData.map((item, index) => (
                      <div
                        key={index}
                        ref={(el) =>
                          el &&
                          (animatedItemsRef.current[
                            educationData.length +
                              internshipData.length +
                              certificationData.length +
                              index
                          ] = el)
                        }
                        className="bg-white/10 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/20 group"
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="text-base font-bold group-hover:text-primary transition-colors">
                            {item.name}
                          </h5>
                          <span className="text-primary text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.project}
                        </p>
                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 inline-block px-2 py-1 bg-white/5 dark:bg-black/20 rounded-md">
                          {item.position}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-8 p-4 bg-white/5 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Web Development",
                      "Machine Learning",
                      "AWS (Cloud)",
                      "Data Science",
                      "software Project Management",
                    ].map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal glow lines */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent top-1/3 -z-10 opacity-40"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-primary/20 via-transparent to-primary/20 bottom-1/4 -z-10 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
