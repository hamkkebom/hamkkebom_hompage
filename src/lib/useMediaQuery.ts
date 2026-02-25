"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // SSR guard: only access window in useEffect
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Set initial state based on current match
    setMatches(mediaQueryList.matches);

    // Handler for media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Use addEventListener for better performance than onchange
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup: remove event listener
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
