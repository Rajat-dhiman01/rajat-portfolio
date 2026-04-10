import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { socials } from "@/data/socials";

const LINKS = [
  { label: "Twitter",  href: socials.twitter  },
  { label: "GitHub",   href: socials.github   },
  { label: "LeetCode", href: socials.leetcode },
  { label: "Resume",   href: socials.resume   },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        background: "var(--bg)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#fff",
        }}
      >
        Rajat Dhiman
      </motion.span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.08 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.08em",
          color: "var(--muted)",
        }}
      >
        © 2026 · Built with React + Vite
      </motion.span>

      <motion.nav
        aria-label="Footer links"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.14 }}
        style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.label === "Resume" ? "_blank" : "_blank"}
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.18s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
          >
            {l.label}
          </a>
        ))}
      </motion.nav>
    </footer>
  );
}