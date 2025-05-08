import { createContext, useEffect } from "react";

// Using only the Electric Blue theme
export type Theme = "dark-blue";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeOptions: Theme[];
};

// Only one theme option - Electric Blue
const themeOptions: Theme[] = ["dark-blue"];

const initialState: ThemeProviderState = {
  theme: "dark-blue", // Charcoal + Electric Blue theme
  setTheme: () => null,
  themeOptions,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Always use dark-blue theme (Charcoal + Electric Blue + Soft White)
  const theme: Theme = "dark-blue";

  // No-op function since we don't change themes
  const setThemeState = () => {
    console.log(
      "Theme locked to Electric Blue (Charcoal + Electric Blue + Soft White)"
    );
  };

  // Apply theme changes to document - always sets dark-blue
  useEffect(() => {
    const root = document.documentElement;

    // Remove all possible theme classes (for safety)
    root.classList.remove(
      "dark-default",
      "dark-blue",
      "dark-purple",
      "dark-green"
    );

    // Add the Electric Blue theme class
    root.classList.add("dark-blue");

    // Also add dark class for existing dark: tailwind classes
    root.classList.add("dark");

    localStorage.setItem("theme", "dark-blue");
    console.log("Theme changed to:", "dark-blue");
  }, []);

  // Set theme function - always sets to dark-blue
  const setTheme = (_newTheme: Theme) => {
    setThemeState();
    localStorage.setItem("theme", "dark-blue");
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
