import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface PageLoaderProps {
  minDisplayTime?: number; // Minimum time to display the loader in ms
}

const PageLoader: React.FC<PageLoaderProps> = ({ minDisplayTime = 1800 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Starting up...");

  // Array of whimsical loading messages
  const loadingMessages = [
    "Starting up...",
    "Brewing some code...",
    "Summoning portfolio items...",
    "Polishing pixels...",
    "Aligning elements...",
    "Adding some magic...",
    "Almost there...",
    "Finalizing awesomeness...",
  ];

  useEffect(() => {
    let startTime = Date.now();
    let progressInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    // Function to check if we should hide the loader
    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= minDisplayTime && progress >= 100) {
        setIsLoading(false);
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      }
    };

    // Update progress gradually
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 100%
        const increment =
          prev < 80 ? Math.random() * 8 + 2 : Math.random() * 2 + 0.5;

        const newProgress = Math.min(prev + increment, 100);

        checkLoadingComplete();
        return newProgress;
      });
    }, 150);

    // Cycle through loading messages
    messageInterval = setInterval(() => {
      setLoadingMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1000);

    // Clean up intervals
    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [minDisplayTime, progress]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Brand Name */}
        <h1 className="text-3xl font-bold mb-8 gradient-text">Tanmay Patra</h1>

        {/* Custom loading spinner */}
        <LoadingSpinner size="xl" text={loadingMessage} />

        {/* Progress bar */}
        <div className="w-64 mt-8 bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="mt-2 text-sm text-foreground/60 font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
