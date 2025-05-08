import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useTheme, Theme } from "@/hooks/use-theme";
import { Menu, ChevronDown, Check, X, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const { theme, setTheme, themeOptions } = useTheme();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);

  // Use parallax scroll effect
  useParallaxScroll();

  // Reference for clicking outside to close dropdown
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Close theme options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowThemeOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeDropdownRef]);

  // Function to get theme display name
  const getThemeDisplayName = (themeName: Theme): string => {
    switch (themeName) {
      case "dark-default":
        return "Dark";
      case "dark-blue":
        return "Blue";
      case "dark-purple":
        return "Purple";
      case "dark-green":
        return "Green";
      default:
        return themeName;
    }
  };

  // Handle scroll to update active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "technologies",
        "projects",
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

          {/* Theme Options */}
          <div className="relative" ref={themeDropdownRef}>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setShowThemeOptions(!showThemeOptions)}
              className="relative p-3 rounded-full bg-gray-800 text-gray-200 hover:bg-primary/20 hover:text-primary transition-all duration-300 overflow-hidden active:scale-95 flex items-center"
              aria-label="Theme options"
            >
              <div className="relative z-10 flex items-center">
                <Palette className="h-5 w-5 mr-1" />
                <ChevronDown
                  className={`h-3 w-3 ml-1 transition-transform duration-200 ${
                    showThemeOptions ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 transition-transform duration-300 origin-center"
                style={{
                  transform: "scale(0)",
                  opacity: 0,
                  animation: "theme-ripple 0.5s ease forwards",
                }}
              ></div>
            </button>

            {/* Theme Dropdown */}
            <div
              className={`absolute right-0 mt-2 p-2 bg-gray-800 shadow-lg rounded-lg transition-all duration-200 origin-top-right z-50 ${
                showThemeOptions
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{ minWidth: "180px" }}
            >
              <div className="mb-2 px-3 py-1 text-sm text-gray-400 font-medium border-b border-gray-700">
                Select Theme
              </div>
              {themeOptions.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => {
                    setTheme(themeOption);
                    setShowThemeOptions(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded flex items-center justify-between text-sm transition-colors ${
                    themeOption === theme
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-700 text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        themeOption === "dark-default"
                          ? "bg-gray-900"
                          : themeOption === "dark-blue"
                          ? "bg-blue-900"
                          : themeOption === "dark-purple"
                          ? "bg-purple-900"
                          : themeOption === "dark-green"
                          ? "bg-green-900"
                          : ""
                      }`}
                    ></div>
                    {getThemeDisplayName(themeOption)}
                  </div>
                  {themeOption === theme && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
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

          {/* Theme Selection - Mobile */}
          <div
            className="flex flex-col space-y-3"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
              transition: `transform 0.3s ease 0.25s, opacity 0.3s ease 0.25s`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-200 font-medium">Theme</span>
            </div>

            {/* Theme Options */}
            <div className="grid grid-cols-4 gap-2 mt-1">
              {themeOptions.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${
                    themeOption === theme
                      ? "bg-primary/10 text-primary ring-1 ring-primary"
                      : "hover:bg-gray-700 text-gray-200"
                  }`}
                  title={getThemeDisplayName(themeOption)}
                >
                  <div
                    className={`w-6 h-6 rounded-full mb-1 ${
                      themeOption === "dark-default"
                        ? "bg-gray-900"
                        : themeOption === "dark-blue"
                        ? "bg-blue-900"
                        : themeOption === "dark-purple"
                        ? "bg-purple-900"
                        : themeOption === "dark-green"
                        ? "bg-green-900"
                        : ""
                    }`}
                  ></div>
                  <span className="text-xs truncate">
                    {themeOption === "dark-default"
                      ? "Dark"
                      : themeOption === "dark-blue"
                      ? "Blue"
                      : themeOption === "dark-purple"
                      ? "Purple"
                      : themeOption === "dark-green"
                      ? "Green"
                      : ""}
                  </span>
                </button>
              ))}
            </div>
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
