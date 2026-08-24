// src/components/ui/stars.jsx
import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Stars({ count = 80 }) {
  const canvasRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars = [];
    let animationId;

    function generateStars() {
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.75 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars();
      if (shouldReduce) drawStatic();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.baseOpacity})`;
        ctx.fill();
      });
    }

    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.001 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.baseOpacity * twinkle})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);

    if (!shouldReduce) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [count, shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}