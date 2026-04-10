import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function GlowingEffect({ blur = 0, inactiveZone = 0.7, proximity = 64, spread = 20, variant = "default", glow = false, className, disabled = false, movementDuration = 2, borderWidth = 1 }) {
  const containerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (!containerRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const mouseX = e?.clientX ?? lastPosition.current.x;
      const mouseY = e?.clientY ?? lastPosition.current.y;

      lastPosition.current = { x: mouseX, y: mouseY };

      const center = [left + width / 2, top + height / 2];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = (Math.min(width, height) / 2) * inactiveZone;

      if (distanceFromCenter < inactiveRadius) {
        el.style.setProperty("--active", "0");
        return;
      }

      const isActive = mouseX > left - proximity &&
        mouseX < left + width + proximity &&
        mouseY > top - proximity &&
        mouseY < top + height + proximity;

      el.style.setProperty("--active", isActive ? "1" : "0");

      if (!isActive) return;

      const x = mouseX - left;
      const y = mouseY - top;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    });
  }, [inactiveZone, proximity]);

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleMove, disabled]);

  return (
    <div
      ref={containerRef}
      style={{
        "--blur": `${blur}px`,
        "--spread": spread,
        "--start": "0",
        "--active": "0",
        "--glowingeffect-border-width": `${borderWidth}px`,
        "--repeating-conic-gradient-times": "5",
        "--gradient": `radial-gradient(circle, #ffffff 10%, #ffffff40 40%, transparent 60%)`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
        glow && "opacity-100",
        variant === "white" && "invert",
        disabled && "!hidden",
        className
      )}
    >
      <div
        className={cn(
          "glow-effect",
          "absolute inset-0 rounded-[inherit]",
          'after:content-[""] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit]',
          "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
          "after:[background:var(--gradient)_border-box]",
          "after:[mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]",
          "after:[-webkit-mask-composite:destination-out] after:[mask-composite:exclude]",
          "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[background-position:var(--x,0)_var(--y,0)]",
          "after:[background-size:calc(var(--spread)*1%)_calc(var(--spread)*1%)]",
        )}
      />
    </div>
  );
}