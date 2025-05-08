import { createContext, useEffect, useState } from "react";

// Available dark theme variants
export type Theme = "dark-default" | "dark-blue" | "dark-purple" | "dark-green";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeOptions: Theme[];
};

const themeOptions: Theme[] = [
  "dark-default",
  "dark-blue",
  "dark-purple",
  "dark-green",
];

const initialState: ThemeProviderState = {
  theme: "dark-default",
  setTheme: () => null,
  themeOptions,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get the saved theme preference
  const getSavedTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themeOptions.includes(savedTheme as Theme)) {
      return savedTheme as Theme;
    }

    // Default to dark-default
    return "dark-default";
  };

  // Theme state
  const [theme, setThemeState] = useState<Theme>(getSavedTheme);

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove(
      "dark-default",
      "dark-blue",
      "dark-purple",
      "dark-green"
    );

    // Add the current theme class
    root.classList.add(theme);

    // Also add dark class for existing dark: tailwind classes
    root.classList.add("dark");

    localStorage.setItem("theme", theme);
    console.log("Theme changed to:", theme);
  }, [theme]);

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme,
        themeOptions,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
