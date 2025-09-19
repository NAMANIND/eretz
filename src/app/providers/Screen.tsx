"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ScreenContextType = {
  isMobile: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

type ScreenProviderProps = {
  children: ReactNode;
};

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    let debounceTimer: NodeJS.Timeout;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer with 300ms damping for faster response
      debounceTimer = setTimeout(() => {
        // Only reload if width change is significant (more than 100px)
        if (Math.abs(currentWidth - lastWidth) > 100) {
          window.location.reload();
        }
        lastWidth = currentWidth;
      }, 300);
    };

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Listen to media query changes for mobile detection
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      window.removeEventListener("resize", handleResize);
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="w-full h-full bg-black"></div>
      </div>
    );
  }

  return (
    <ScreenContext.Provider
      value={{ isMobile, isLoading, setLoading: setIsLoading }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = (): ScreenContextType => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }
  return context;
};
