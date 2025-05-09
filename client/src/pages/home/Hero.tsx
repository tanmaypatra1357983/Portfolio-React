import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight gradient-text heading-float">
              Software Developer &<span className="block">ML Enthusiast</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Hey there! I'm passionate about building innovative solutions at the intersection of web development and machine learning. I'm drawn to crafting clean, maintainable code with a focus on readability and elegant design. I'm eager to learn and implement best practices while building robust, scalable web applications and seamlessly integrating AI to create compelling and user-friendly experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-full text-md px-6 hover-lift hover:shadow-glow"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-md px-6 hover-lift"
                asChild
              >
                <a href="/assets/resume.pdf" download="Tanmay_Patra_Resume.pdf">
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="flex gap-6 mt-10">
              <a
                href="https://github.com/TanmayaPatra369"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanmay-patra-86b250251/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://leetcode.com/u/Tanmay_Patra/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="LeetCode"
              >
                <Code2 className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="/assets/Laptop.png"
                alt="Professional developer workspace"
                className="relative w-full h-auto max-w-xl mx-auto rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white dark:border-gray-800"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
