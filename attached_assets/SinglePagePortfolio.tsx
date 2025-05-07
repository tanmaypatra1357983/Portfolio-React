import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import { aboutData } from "@/data/aboutData";
import {
  educationData,
  internshipData,
  certificationData,
  hackathonData,
} from "@/data/educationData";
import { projectsData } from "@/data/projectData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Mail,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof formSchema>;

const SinglePagePortfolio: React.FC = () => {
  const { toast } = useToast();

  // Refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  function onSubmit(values: ContactFormValues) {
    // In a real application, you would send this data to your backend
    console.log(values);

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon!",
      variant: "default",
    });

    // Reset form
    form.reset();
  }

  // Add navigation functionality
  useEffect(() => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Add click event listeners
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the target ID from the href
        const targetId = link.getAttribute("href")?.substring(1);

        // Find the target element
        if (targetId) {
          let targetElement;

          switch (targetId) {
            case "home":
              targetElement = homeRef.current;
              break;
            case "about":
              targetElement = aboutRef.current;
              break;
            case "skills":
              targetElement = skillsRef.current;
              break;
            case "projects":
              targetElement = projectsRef.current;
              break;
            case "contact":
              targetElement = contactRef.current;
              break;
            default:
              targetElement = null;
          }

          // Scroll to the target element
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Update navigation links based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Get all sections
      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "skills", ref: skillsRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ];

      // Find the current section
      for (const section of sections) {
        const element = section.ref.current;

        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            // Update URL hash without scrolling
            window.history.replaceState(null, "", `#${section.id}`);

            // Update active nav link
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${section.id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });

            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* HOME SECTION */}
      <section
        ref={homeRef}
        id="home"
        className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight gradient-text">
                Software Developer &<span className="block">ML Enthusiast</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Creating elegant solutions through clean code and thoughtful
                design. Specializing in web applications and AI integrations.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  className="rounded-full text-md px-6 hover-lift hover:shadow-glow"
                  onClick={() =>
                    projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  asChild
                  className="rounded-full text-md px-6 hover-lift"
                >
                  <a href="/resume.pdf" download>
                    Download CV <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex gap-4 mt-8 justify-center">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 bg-muted/30 dark:bg-muted/10 overflow-hidden"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {aboutData.intro}
              </p>
            </motion.div>

            {/* Personal Info Grid */}
            <div className="mb-24">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-2xl font-semibold mb-10"
              >
                Get to Know Me
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutData.details.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -70 : 70,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                    whileHover={{
                      y: -10,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-background rounded-xl p-6 shadow-md"
                  >
                    <h4 className="text-xl font-medium mb-3">
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Experience */}
            <div className="mb-24">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-2xl font-semibold mb-10 text-center"
              >
                Education & Experience
              </motion.h3>

              {/* Education Timeline */}
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, margin: "-100px" }}
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
                    viewport={{ once: false, margin: "-100px" }}
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
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: false }}
                      className="absolute -left-3 md:left-1/2 md:-ml-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 shadow"
                    >
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </motion.div>

                    <span className="text-sm font-medium text-primary/80">
                      {item.period}
                    </span>
                    <h4 className="text-xl font-semibold mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Internship Timeline */}
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, margin: "-100px" }}
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
                    viewport={{ once: false, margin: "-100px" }}
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
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: false }}
                      className="absolute -left-3 md:left-1/2 md:-ml-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 shadow"
                    >
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </motion.div>

                    <span className="text-sm font-medium text-primary/80">
                      {item.period}
                    </span>
                    <h4 className="text-xl font-semibold mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground mb-2">
                      {item.company} • {item.location}
                    </p>
                    <p className="text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <Github className="h-4 w-4 mr-1" /> GitHub Repository
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Certifications & Hackathons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="bg-background rounded-xl p-6 shadow-md"
                >
                  <h4 className="text-xl font-semibold mb-4">Certifications</h4>
                  <ul className="space-y-3">
                    {certificationData.map((cert, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: false }}
                        className="flex items-center"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                        <div>
                          <span className="font-medium">{cert.title}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            • {cert.issuer}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="bg-background rounded-xl p-6 shadow-md"
                >
                  <h4 className="text-xl font-semibold mb-4">Hackathons</h4>
                  <ul className="space-y-3">
                    {hackathonData.map((hackathon, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: false }}
                        className="flex items-center"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                        <div>
                          <span className="font-medium">{hackathon.title}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            • {hackathon.year}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Skills & Values */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-2xl font-semibold mb-10 text-center"
              >
                Values
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Briefcase className="h-8 w-8 text-primary" />,
                    title: "Professional",
                    description:
                      "I approach every project with dedication, attention to detail, and a commitment to delivering high-quality results.",
                  },
                  {
                    icon: <GraduationCap className="h-8 w-8 text-primary" />,
                    title: "Continuous Learning",
                    description:
                      "I'm constantly exploring new technologies and techniques to expand my skill set and stay at the forefront of my field.",
                  },
                  {
                    icon: <Heart className="h-8 w-8 text-primary" />,
                    title: "Passionate",
                    description:
                      "I'm deeply passionate about creating intuitive, engaging experiences that solve real problems for users.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                      scale: 0.8,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      type: "spring",
                    }}
                    whileHover={{
                      y: -10,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      scale: 1.03,
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                    className="text-center bg-background rounded-xl p-8 shadow-md"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.1 + 0.3,
                      }}
                      viewport={{ once: false }}
                      className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                    >
                      {value.icon}
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section ref={skillsRef} id="skills" className="py-20 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Skills & Expertise
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I've developed a diverse set of skills throughout my education
                and projects. Here's a comprehensive overview of my technical
                expertise.
              </p>
            </motion.div>

            {/* Skills Categories */}
            <div className="space-y-16">
              {skillsData.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="bg-background rounded-xl p-8 shadow-md"
                >
                  <div className="flex items-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: categoryIndex * 0.1 + 0.2,
                      }}
                      viewport={{ once: false }}
                      className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4"
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{
                          opacity: 0,
                          x: skillIndex % 2 === 0 ? -50 : 50,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: skillIndex * 0.1 + 0.3,
                          type: "spring",
                        }}
                        viewport={{ once: false }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: skillIndex * 0.1 + 0.5,
                          }}
                          viewport={{ once: false }}
                          className="relative"
                        >
                          <Progress value={skill.level} className="h-2" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        ref={projectsRef}
        id="projects"
        className="py-20 bg-muted/30 dark:bg-muted/10 overflow-hidden"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are some of the projects I've worked on. Each one has
                taught me valuable skills and helped me grow as a developer.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                  }}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    scale: 1.02,
                  }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="bg-background rounded-xl overflow-hidden shadow-md h-full flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs py-1 px-2 bg-primary/10 text-primary rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center">
                        <ExternalLink className="h-4 w-4 mr-1" />{" "}
                        {project.demoUrl ? "Live Demo" : "Coming Soon"}
                      </span>
                    </div>
                    <div>
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <Github className="h-4 w-4 mr-1" /> View Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT SECTION */}
      <section ref={contactRef} id="contact" className="py-20 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Contact Me
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or just want to chat? Feel free to reach
                out. I'm always open to discussing new projects and
                opportunities.
              </p>
            </motion.div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="bg-background rounded-xl p-8 shadow-md"
              >
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-bold mb-6 gradient-text">
                    Get In Touch
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a question or want to work together? Feel free to reach
                    out - I'd love to hear from you!
                  </p>
                </div>

                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: false }}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: false }}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: false }}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Twitter className="h-5 w-5 text-primary" />
                  </div>
                  <span>Twitter</span>
                </motion.a>

                <motion.a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: false }}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-5 w-5 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 3H3v18h18V3zM7 7h10M7 12h10M7 17h10"
                      />
                    </svg>
                  </div>
                  <span>LeetCode</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SinglePagePortfolio;
