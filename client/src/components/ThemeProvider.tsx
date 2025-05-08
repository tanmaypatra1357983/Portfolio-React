import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  toggleTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  // Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        updateTheme("system");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let resolvedValue: "dark" | "light";

    if (newTheme === "system") {
      resolvedValue = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      resolvedValue = newTheme;
    }

    root.classList.add(resolvedValue);
    setResolvedTheme(resolvedValue);
    
    // Force re-render by updating a data attribute
    document.documentElement.setAttribute('data-theme', resolvedValue);
    
    // Add console logging to debug
    console.log('Theme updated:', { newTheme, resolvedValue });
  };

  // Apply theme when it changes
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  // Apply theme on initial load
  useEffect(() => {
    updateTheme(theme);
  }, []);

  const toggleTheme = () => {
    console.log('Toggle theme called. Current resolved theme:', resolvedTheme);
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    
    // Directly update DOM for immediate feedback
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save theme preference
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
    setResolvedTheme(newTheme);
    
    console.log('Theme toggled to:', newTheme);
  };

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
