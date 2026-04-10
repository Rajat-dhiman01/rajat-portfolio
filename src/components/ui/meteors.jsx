import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Meteors({
  className,
  count = 20,
  angle = 215,
  color = "rgba(255,255,255,0.6)",
  tailColor = "rgba(255,255,255,0.4)",
}) {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: i * (100 / count),
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 7,
      }))
    );
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden z-0", className)}>
      <style>{`
        @keyframes meteor-fall {
          0% { transform: rotate(${angle}deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(${angle}deg) translateX(-100vmax); opacity: 0; }
        }
      `}</style>

      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-full"
          style={{
            top: "-40px",
            left: `${meteor.left}%`,
            backgroundColor: color,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
            animation: `meteor-fall ${meteor.duration}s linear infinite`,
            animationDelay: `${meteor.delay}s`,
          }}
        >
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: "100%",
              width: "50px",
              height: "1px",
              background: `linear-gradient(to right, ${tailColor}, transparent)`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default Meteors;