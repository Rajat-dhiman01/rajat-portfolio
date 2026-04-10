import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Meteors } from "./ui/meteors";
import { Stars } from "./ui/stars";

const roles = [
  "Full-Stack + AI Engineer",
  "RAG Specialist",
  "SDE Problem Solver",
  "Product Builder",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && displayed === current) {
      timeout.current = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(timeout.current);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    timeout.current = setTimeout(() => {
      setDisplayed((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout.current);
  }, [displayed, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const displayed = useTypewriter(roles);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <Stars count={80} />
        <Meteors count={22} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(6,6,8,0.85) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">

        <motion.div {...fadeUp(0.1)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
            style={{
              border: "1px solid var(--border2)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"
              style={{ animation: "pulse-dot 2s infinite" }}
            />
            Available for full-time roles · 2026
          </div>
        </motion.div>

        <motion.h1
          className="leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
          {...fadeUp(0.2)}
        >
          <span
            className="block text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            Rajat
          </span>
          <span
            className="block italic"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              color: "var(--muted)",
            }}
          >
            Dhiman
          </span>
        </motion.h1>

        <motion.div {...fadeUp(0.35)} className="mb-12 h-8 flex items-center justify-center">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            {displayed}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "#ffffff",
                marginLeft: "4px",
                verticalAlign: "middle",
                animation: "blink-cursor 1s infinite",
              }}
            />
          </span>
        </motion.div>

        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="transition-opacity duration-200 hover:opacity-85"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#060608",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "12px 28px",
              borderRadius: "8px",
              border: "1px solid var(--border2)",
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
          >
            Read Resume
          </a>
        </motion.div>

      </div>

      <motion.div
        {...fadeUp(0.8)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, var(--muted))",
            animation: "scroll-pulse 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </motion.div>

    </section>
  );
}