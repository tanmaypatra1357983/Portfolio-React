import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Use parallax scroll effect
  useParallaxScroll();

  // Handle scroll to update active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "technologies",
        "projects",
        "blog",
        "contact",
      ];
      const scrollPosition = window.scrollY;

      // Set scrolled state for header styling
      setScrolled(scrollPosition > 20);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on first render

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 header-blur-on-scroll ${
        scrolled ? "py-2 dark:bg-gray-900/80 shadow-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold gradient-text"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          Tanmay<span className="font-mono"> </span>Patra
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            "home",
            "about",
            "skills",
            "technologies",
            "projects",
            "blog",
            "contact",
          ].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
              className={cn(
                "relative text-gray-200 hover:text-primary transition-colors font-medium group",
                currentSection === section && "text-primary"
              )}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  currentSection === section ? "w-full" : "w-0"
                }`}
              ></span>
            </a>
          ))}

          {/* Theme Indicator - Electric Blue */}
          <div className="relative p-3 rounded-full bg-[#121212] border border-[#3B82F6]/30 text-[#E5E7EB] overflow-hidden flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-[#3B82F6]"></div>
            <span className="text-xs font-medium">Electric Blue Theme</span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-200 hover:bg-gray-800 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-96 opacity-100 bg-gray-900/95 shadow-lg backdrop-blur-md"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {[
            "home",
            "about",
            "skills",
            "technologies",
            "projects",
            "blog",
            "contact",
          ].map((section, index) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
              className={cn(
                "block py-2 text-gray-200 hover:text-primary transition-colors font-medium",
                currentSection === section && "text-primary"
              )}
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen
                  ? "translateX(0)"
                  : "translateX(-20px)",
                transition: `transform 0.3s ease ${
                  index * 0.05
                }s, opacity 0.3s ease ${index * 0.05}s`,
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}

          {/* Theme Indicator - Mobile */}
          <div
            className="flex items-center mt-4 px-2 py-3 rounded-lg bg-[#121212] border border-[#3B82F6]/30"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
              transition: `transform 0.3s ease 0.25s, opacity 0.3s ease 0.25s`,
            }}
          >
            <div className="w-3 h-3 rounded-full mr-2 bg-[#3B82F6]"></div>
            <span className="text-xs font-medium text-[#E5E7EB]">
              Electric Blue Theme
            </span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes theme-ripple {
            to {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;