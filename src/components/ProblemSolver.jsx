import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── EDITABLE CONFIG ──────────────────────────────────────────────────────────
// Update these values anytime - no need to touch the JSX below.

const LEETCODE = {
  name:    "Rajat Dhiman",
  handle:  "rajat_dhiman",
  url:     "https://leetcode.com/rajat_dhiman",
  solved:  "100+",
  topics: [
    "Arrays & Strings",
    "Trees & Graphs",
    "Dynamic Programming",
    "Sliding Window",
    "Binary Search",
    "Stack & Queue",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ProblemSolver() {
  const shouldReduce = useReducedMotion();

  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const leftIn   = useInView(leftRef,  { once: true, margin: "-60px" });
  const rightIn  = useInView(rightRef, { once: true, margin: "-60px" });

  return (
    <section
      id="dsa"
      aria-labelledby="dsa-heading"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg2)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}
      >

        {/* ── Left - text ── */}
        <div ref={leftRef}>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
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
            Problem Solver
          </motion.p>

          <motion.h2
            id="dsa-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.75rem",
              color: "#fff",
            }}
          >
            I don&apos;t just build -
            <br />
            <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
              I solve.
            </em>
          </motion.h2>

          {/* Body copy - #b0b0be instead of var(--muted) - readable, not washed */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              color: "#b0b0be",
              lineHeight: 1.85,
              marginBottom: "1.1rem",
            }}
          >
            Engineering is fundamentally about problem solving. Beyond shipping
            products, I sharpen my algorithmic thinking daily on LeetCode -
            preparing for SDE roles that demand both product instinct and DSA depth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={leftIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              color: "#b0b0be",
              lineHeight: 1.85,
            }}
          >
            Arrays, trees, graphs, dynamic programming - consistent daily
            practice, not just for interviews but for writing better, faster
            code in production.
          </motion.p>

        </div>

        {/* ── Right - LeetCode card ── */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, y: 28 }}
          animate={rightIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >

            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.75rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  background: "var(--bg)",
                  border: "1px solid var(--border2)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    fontWeight: 500,
                    color: "#fff",
                    letterSpacing: "0.05em",
                  }}
                >
                  LC
                </span>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "0.25rem",
                  }}
                >
                  {LEETCODE.name}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.07em",
                    color: "#8888a0",
                  }}
                >
                  @{LEETCODE.handle}
                </p>
              </div>
            </div>

            {/* Solved stat */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "1.5rem",
              }}
            >
              {/* Label - brighter than muted */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9090a8",
                }}
              >
                Problems Solved
              </span>
              {/* Number - full white, large, dominant */}
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                {LEETCODE.solved}
              </span>
            </div>

            <div style={{ height: "1px", background: "var(--border)", marginBottom: "1.25rem" }} />

            {/* Topics - white text, border visible */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.35rem",
                marginBottom: "1.625rem",
              }}
              role="list"
              aria-label="DSA topics practiced"
            >
              {LEETCODE.topics.map((topic) => (
                <span
                  key={topic}
                  role="listitem"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    padding: "4px 9px",
                    border: "1px solid var(--border2)",
                    borderRadius: "4px",
                    // Brighter than muted - clearly legible
                    color: "#c8c8d8",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href={LEETCODE.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LeetCode profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#c8c8d8",
                textDecoration: "none",
                border: "1px solid var(--border2)",
                padding: "9px 18px",
                borderRadius: "6px",
                transition: "color 0.18s, border-color 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#c8c8d8";
                e.currentTarget.style.borderColor = "var(--border2)";
              }}
            >
              View Profile
              <ArrowUpRight size={12} strokeWidth={1.75} />
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
}