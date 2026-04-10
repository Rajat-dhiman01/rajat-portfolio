import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

// ─── EDITABLE CONFIG ──────────────────────────────────────────────────────────

const BUILDS = [
  {
    id: 1,
    label: "01",
    title: "Full-Stack SaaS",
    description:
      "End-to-end product development — auth, APIs, databases, deployment. From idea to live product with real users and real traffic.",
  },
  {
    id: 2,
    label: "02",
    title: "AI / RAG Systems",
    description:
      "Production-grade AI pipelines — vector search, hybrid retrieval, LLM integration, streaming responses and real-time UX.",
  },
  {
    id: 3,
    label: "03",
    title: "Production Deployment",
    description:
      "Security hardening, SEO, rate limiting, custom domains, analytics, CI/CD — everything needed to ship, scale, and maintain.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function BuildCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.58,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 3vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.2s",
        position: "relative",
        zIndex: 1,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.15em",
        color: "var(--muted)",
        textTransform: "uppercase",
      }}>
        {item.label}
      </span>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "#fff",
      }}>
        {item.title}
      </h3>

      <div style={{ height: "1px", background: "var(--border)" }} />

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        color: "#b0b0be",
        lineHeight: 1.8,
        flex: 1,
      }}>
        {item.description}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function WhatIBuild() {
  const headerRef = useRef(null);
  const gridRef   = useRef(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px" });
  const gridIn    = useInView(gridRef,   { once: true, margin: "-60px" });

  return (
    <section
      id="whatibuild"
      aria-labelledby="build-heading"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Meteors background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Meteors count={14} />
      </div>

      {/* Header */}
      <div ref={headerRef} style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "0.875rem",
          }}
        >
          // 05 — Expertise
        </motion.p>

        <motion.h2
          id="build-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            color: "#fff",
          }}
        >
          What I
          <br />
          <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
            build best.
          </em>
        </motion.h2>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(1rem, 2vw, 1.375rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {BUILDS.map((item, i) => (
          <BuildCard key={item.id} item={item} index={i} inView={gridIn} />
        ))}
      </div>
    </section>
  );
}