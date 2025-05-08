import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import "@/styles/animations.css";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  fullScreen = false,
  text = "Loading...",
  className = "",
}) => {
  const { theme } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  // Handle rotation animation
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotation((prev) => (prev + 45) % 360);
      setBounce((prev) => !prev);

      // Randomly show emoji
      if (Math.random() > 0.7) {
        setShowEmoji(true);
        setTimeout(() => setShowEmoji(false), 500);
      }
    }, 600);

    return () => clearInterval(rotateInterval);
  }, []);

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
    xl: "w-24 h-24 border-4",
  };

  // Container classes
  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center";

  // Choose the appropriate color based on theme
  const spinnerColor =
    theme === "dark-blue"
      ? "border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-blue-200"
      : theme === "dark-purple"
      ? "border-t-purple-500 border-r-purple-400 border-b-purple-300 border-l-purple-200"
      : theme === "dark-green"
      ? "border-t-green-500 border-r-green-400 border-b-green-300 border-l-green-200"
      : "border-t-emerald-500 border-r-emerald-400 border-b-emerald-300 border-l-emerald-200";

  // Random emojis related to technology/coding
  const techEmojis = [
    "💻",
    "🚀",
    "⚡",
    "🔥",
    "✨",
    "🔮",
    "👨‍💻",
    "🤖",
    "🧠",
    "📊",
  ];
  const randomEmoji = techEmojis[Math.floor(Math.random() * techEmojis.length)];

  return (
    <div className={cn(containerClasses, className)}>
      {/* Logo-branded spinner with multicolor border */}
      <div className="relative">
        <div
          className={cn(
            "rounded-full border-primary border-opacity-20",
            sizeClasses[size],
            spinnerColor,
            "transition-transform spinner-rotate"
          )}
        />

        {/* Initials in the center */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center font-bold text-primary",
            {
              "text-xs": size === "sm",
              "text-sm": size === "md",
              "text-base": size === "lg",
              "text-lg": size === "xl",
            }
          )}
          style={{
            transform: bounce ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          TP
        </div>

        {/* Flying emoji */}
        {showEmoji && (
          <div
            className="absolute text-xl emoji-float"
            style={{
              top: `-${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {randomEmoji}
          </div>
        )}
      </div>

      {/* Loading text */}
      {text && (
        <div className="mt-4 text-sm font-medium text-foreground/80">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
