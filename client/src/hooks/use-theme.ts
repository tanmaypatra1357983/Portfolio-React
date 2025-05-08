import { useContext } from "react";
import { ThemeProviderContext, Theme } from "@/components/ThemeProvider";

export type { Theme } from "@/components/ThemeProvider";

// Always returns the Electric Blue theme
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
