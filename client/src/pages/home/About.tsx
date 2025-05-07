import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Heart, Mail, ArrowRight } from "lucide-react";
import { aboutData } from "@/data/aboutData";
import { educationData, internshipData, certificationData, hackathonData } from "@/data/educationData";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
              alt="Professional headshot"
              className="w-full h-auto rounded-2xl shadow-xl mx-auto max-w-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Hello, I'm <span className="gradient-text">Alex</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {aboutData.intro}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {aboutData.passion}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Experience</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.experience}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Completed Projects</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.projects}+ projects</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">{aboutData.education}</p>
                </div>
              </div>

              <div className="flex items-start">
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
              className="inline-flex items-center text-primary dark:text-primary hover:text-primary-dark dark:hover:text-primary-dark font-medium transition-colors"
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
          </motion.div>
        </div>
        
        {/* Education Timeline */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-bold mb-10 text-center"
          >
            Education & Experience
          </motion.h3>
          
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl font-semibold mb-6 ml-4"
          >
            Education
          </motion.h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 50 : -50,
                  y: 30,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  type: "spring",
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12"
                    : "md:mr-[50%] md:pr-12 md:text-right"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.3,
                  }}
                  viewport={{ once: true }}
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center`}
                >
                  <GraduationCap className="h-5 w-5 text-white" />
                </motion.div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <span className="text-primary text-sm font-medium">
                    {item.period}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.degree}</h5>
                  <p className="text-muted-foreground">{item.institution}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Professional Experience */}
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl font-semibold mb-6 ml-4"
          >
            Experience
          </motion.h4>
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:pl-0 pl-8 mb-12">
            {internshipData.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 50 : -50,
                  y: 30,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  type: "spring",
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`mb-12 ${
                  index % 2 === 0
                    ? "md:ml-[50%] md:pl-12"
                    : "md:mr-[50%] md:pr-12 md:text-right"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.3,
                  }}
                  viewport={{ once: true }}
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "md:left-[50%] -left-[17px]"
                      : "md:right-[50%] -left-[17px] md:left-auto"
                  } w-9 h-9 rounded-full bg-primary flex items-center justify-center`}
                >
                  <Briefcase className="h-5 w-5 text-white" />
                </motion.div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <span className="text-primary text-sm font-medium">
                    {item.period}
                  </span>
                  <h5 className="text-lg font-bold mt-1">{item.title}</h5>
                  <p className="text-muted-foreground">{item.company}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
