import { motion } from "framer-motion";
import { projectsData } from "@/data/projectData";
import { Code, ExternalLink, ArrowRight } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark dark:hover:text-primary-dark transition-colors flex items-center"
                  >
                    <Code className="h-5 w-5 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark dark:hover:text-primary-dark transition-colors flex items-center"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-dark font-medium transition-colors text-lg"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
