import React, { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export function Stars({ count = 80 }) {
  const shouldReduce = useReducedMotion();

  // Multiply the incoming count by 3 to drastically increase density
  const actualCount = count * 3;

  const stars = useMemo(() => {
    return Array.from({ length: actualCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 1.5 + 0.5 + "px",
      // Increased brightness: max bounds of 0.5 to 1.0
      opacity: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 2 + "s",
      delay: Math.random() * 5 + "s",
    }));
  }, [actualCount]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: "#fff",
            borderRadius: "50%",
            "--star-opacity": star.opacity,
            animation: shouldReduce
              ? "none"
              : `twinkle ${star.duration} ease-in-out infinite alternate`,
            animationDelay: star.delay,
            // Increased baseline opacity from 0.1 to 0.3
            opacity: shouldReduce ? star.opacity : 0.3,
          }}
        />
      ))}
    </div>
  );
}
