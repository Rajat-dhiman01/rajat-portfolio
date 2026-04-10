import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { projects } from "@/data/projects";

// ─── Custom border-trace glow (replaces GlowingEffect) ───────────────────────
//
// HOW IT WORKS:
// A 1px-thick conic-gradient ring sits on top of the card border.
// The gradient arc rotates to follow the cursor angle.
// It is masked with CSS mask-composite to paint ONLY the 1px border track -
// zero bleed into card interior, zero impact on readability.
//
function useCardGlow(cardRef) {
  const glowRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;

    glow.style.setProperty("--ga", `${angle}deg`);
    glow.style.setProperty("--go", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.setProperty("--go", "0");
  }, []);

  return { glowRef, onMouseMove, onMouseLeave };
}

// ─── Logos ────────────────────────────────────────────────────────────────────

function NotesMindLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#4f46e5" />
      <text x="16" y="22" fontFamily="system-ui,sans-serif" fontSize="17" fontWeight="700" fill="white" textAnchor="middle">
        N
      </text>
    </svg>
  );
}

function YatriBabaLogo() {
  return (
    <img
      src="/assets/logos/yatribaba-logo.png"
      alt=""
      aria-hidden="true"
      style={{ width: 26, height: 26, objectFit: "contain", display: "block" }}
    />
  );
}

function ProjectLogo({ id }) {
  if (id === 1) return <NotesMindLogo />;
  if (id === 2) return <YatriBabaLogo />;
  return null;
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const FILTERS = ["All", "Full-Stack", "AI / RAG"];

function FilterTabs({ active, onChange }) {
  const shouldReduce = useReducedMotion();
  return (
    <div role="tablist" aria-label="Filter projects by category" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {FILTERS.map((f) => {
        const on = active === f;
        return (
          <button
            key={f}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(f)}
            style={{
              position: "relative",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: "6px",
              border: `1px solid ${on ? "rgba(255,255,255,0.42)" : "var(--border2)"}`,
              background: on ? "rgba(255,255,255,0.04)" : "transparent",
              color: on ? "#fff" : "var(--muted)",
              cursor: "pointer",
              transition: "border-color 0.18s, color 0.18s, background 0.18s",
              outline: "none",
            }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255,255,255,0.14)"; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          >
            {on && !shouldReduce && (
              <motion.span
                layoutId="filter-pill"
                style={{ position: "absolute", inset: 0, borderRadius: "5px", background: "rgba(255,255,255,0.025)", zIndex: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{f}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Placeholder card ─────────────────────────────────────────────────────────

function NextProjectCard() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      animate={shouldReduce ? {} : { opacity: [0.2, 0.36, 0.2] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Next project coming soon"
      style={{
        border: "1px dashed var(--border2)",
        borderRadius: "16px",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
        userSelect: "none",
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.4rem", color: "var(--muted2)", lineHeight: 1 }}>+</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.16em", color: "var(--muted2)", textTransform: "uppercase" }}>
        Next project loading...
      </span>
    </motion.div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const wrapRef = useRef(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-60px" });
  const { glowRef, onMouseMove, onMouseLeave } = useCardGlow(wrapRef);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: "relative", borderRadius: "16px" }}
    >
      {/* ── Border-trace glow ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          "--ga": "0deg",
          "--go": "0",
          position: "absolute",
          inset: "-1px",
          borderRadius: "17px",
          padding: "1px",
          // Arc: bright center (~60deg wide), fades to nothing.
          // Conic starts at --ga so the bright spot follows the cursor angle.
          backgroundImage: "conic-gradient(from var(--ga), transparent 0deg, rgba(255,255,255,0.0) 0deg, rgba(255,255,255,0.5) 30deg, rgba(255,255,255,0.15) 65deg, transparent 120deg, transparent 360deg)",
          // Punch out the interior - only the 1px ring remains painted
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          opacity: "var(--go)",
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <CardContainer containerClassName="w-full" className="w-full">
        <CardBody style={{ width: "100%", height: "auto", minHeight: "300px" }}>

          {/* Card shell */}
          <div
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "clamp(1.375rem, 3vw, 1.875rem)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 1,
            }}
          >

            {/* Top: logo + links */}
            <CardItem translateZ={36} style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>

                <div
                  aria-hidden="true"
                  style={{
                    width: 42, height: 42,
                    background: "var(--bg)",
                    border: "1px solid var(--border2)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, overflow: "hidden",
                  }}
                >
                  <ProjectLogo id={project.id} />
                </div>

                <div style={{ display: "flex", gap: "0.375rem" }}>
                  {[
                    { href: project.liveUrl, label: `Open ${project.name}`, icon: <ArrowUpRight size={13} strokeWidth={1.75} /> },
                    { href: project.githubUrl, label: `${project.name} on GitHub`, icon: <SiGithub size={12} /> },
                  ].map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: 30, height: 30,
                        border: "1px solid var(--border2)",
                        borderRadius: "6px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.18s, border-color 0.18s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border2)"; }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>

              </div>
            </CardItem>

            {/* Name */}
            <CardItem translateZ={26} style={{ width: "100%" }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 2.4vw, 1.35rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: "0.3rem",
                color: "#fff",
              }}>
                {project.name}
              </h3>
            </CardItem>

            {/* Tagline */}
            <CardItem translateZ={16} style={{ width: "100%" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.07em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}>
                {project.tagline}
              </p>
            </CardItem>

            {/* Description */}
            <CardItem translateZ={11} style={{ width: "100%", flex: 1 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.75,
                marginBottom: "1.375rem",
              }}>
                {project.description}
              </p>
            </CardItem>

            {/* Tags */}
            <CardItem translateZ={15} style={{ width: "100%" }}>
              <div
                role="list"
                aria-label="Technologies"
                style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem", marginBottom: "1.125rem" }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.54rem",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--muted)",
                      background: "rgba(255,255,255,0.018)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardItem>

            {/* Status */}
            <CardItem translateZ={19} style={{ width: "100%" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border)",
              }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 6, height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    flexShrink: 0,
                    display: "inline-block",
                    animation: "statusPulse 2.4s ease-in-out infinite",
                  }}
                />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.57rem",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                }}>
                  Live at {project.statusUrl}
                </span>
              </div>
            </CardItem>

          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const shouldReduce = useReducedMotion();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg2)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div ref={headerRef}>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
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
          id="projects-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            marginBottom: "2.25rem",
            color: "#fff",
          }}
        >
          Things I&apos;ve
          <br />
          <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
            actually shipped.
          </em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}
        >
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.16 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(1rem, 2vw, 1.375rem)",
            alignItems: "start",
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          {activeFilter === "All" && <NextProjectCard />}
        </motion.div>
      </AnimatePresence>

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}