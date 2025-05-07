import { useTheme } from "@/hooks/use-theme";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-bold gradient-text">
              DEV<span className="font-mono">/</span>FOLIO
            </a>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Building digital experiences with passion.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
