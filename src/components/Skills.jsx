import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Meteors } from "./ui/meteors";

// ─── Level → bar width ────────────────────────────────────────────────────────
// Edit skills.js to change a skill's level. Width updates automatically here.
// Add new levels below if needed.
const LEVEL_WIDTH = {
  expert:     "90%",
  proficient: "72%",
  familiar:   "50%",
};

// ─── Single skill row ─────────────────────────────────────────────────────────

function SkillRow({ name, level, index, groupInView }) {
  const shouldReduce = useReducedMotion();
  const width = LEVEL_WIDTH[level] ?? "60%";

  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduce ? 0 : -14 }}
      animate={groupInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.25rem",
        marginBottom: "1.1rem",
      }}
    >
      {/* Skill name */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#fff",
          flexShrink: 0,
          width: "clamp(120px, 38%, 160px)",
        }}
      >
        {name}
      </span>

      {/* Bar track */}
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "var(--border)",
          borderRadius: "2px",
          overflow: "hidden",
          position: "relative",
        }}
        role="progressbar"
        aria-valuenow={parseInt(width)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} - ${level}`}
      >
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={groupInView ? { width } : { width: 0 }}
          transition={{
            duration: shouldReduce ? 0 : 1.1,
            delay: 0.25 + index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "#ffffff",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Level label */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          flexShrink: 0,
          width: 60,
          textAlign: "right",
        }}
      >
        {level}
      </span>
    </motion.div>
  );
}

// ─── Skill group (one quadrant) ───────────────────────────────────────────────

function SkillGroup({ group, items, groupIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref}>
      {/* Group heading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: groupIndex * 0.05 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "0.875rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {group}
      </motion.p>

      {/* Skill rows */}
      {items.map((skill, i) => (
        <SkillRow
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={i}
          groupInView={inView}
        />
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

import { skills } from "@/data/skills";

export default function Skills() {
  const shouldReduce = useReducedMotion();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{
        position: "relative",
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg)",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* ── Meteors background - subtle, lower count than Hero ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Meteors count={10} />
      </div>

      {/* Radial vignette so meteors don't fight text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,8,0.7) 100%)",
        }}
      />

      {/* All content above meteors */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
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
   
          </motion.p>

          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              marginBottom: "clamp(3rem, 6vw, 5rem)",
              color: "#fff",
            }}
          >
            What I work
            <br />
            <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
              with.
            </em>
          </motion.h2>
        </div>

        {/* Skills grid - 2 columns desktop, 1 column mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 4rem) clamp(3rem, 6vw, 6rem)",
          }}
        >
          {skills.map((group, i) => (
            <SkillGroup
              key={group.group}
              group={group.group}
              items={group.items}
              groupIndex={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}