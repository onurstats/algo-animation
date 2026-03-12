"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useResponsiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [updateDimensions]);

  return { containerRef, dimensions };
}
