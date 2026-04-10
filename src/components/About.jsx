import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { Stars } from "@/components/ui/stars";

const stats = [
  { value: "3+",  label: "Live Products"   },
  { value: "15+", label: "Tech Stack"      },
  { value: "∞",   label: "Problems Solved" },
];

export default function About() {
  const sectionRef   = useRef(null);
  const isInView     = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: shouldReduce ? 0 : 30 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduce ? 0 : 30 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About me"
      style={{
        padding: "8rem 0",
        backgroundColor: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Meteors background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Stars count={80} />
        <Meteors count={12} />
      </div>

      <div
        className="mx-auto w-full max-w-7xl"
        style={{ padding: "0 5rem", position: "relative", zIndex: 1 }}
      >
        <div className="about-grid">

          {/* ── LEFT - photo ring ── */}
          <motion.div {...fadeUp(0.1)} className="flex justify-center items-center">
            <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>

              <motion.div
                aria-hidden="true"
                style={{
                  position:     "absolute",
                  inset:        0,
                  borderRadius: "50%",
                  background:   "conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.35) 70%, transparent 80%)",
                }}
                animate={shouldReduce ? {} : { rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              />

              <div style={{
                position:     "absolute",
                inset:        0,
                borderRadius: "50%",
                border:       "1px solid var(--border2)",
              }} />

              <div style={{
                position:     "absolute",
                inset:        8,
                borderRadius: "50%",
                border:       "1px solid var(--border)",
                overflow:     "hidden",
                background:   "var(--bg3)",
              }}>
                <img
                  src="https://res.cloudinary.com/dhysr3yfi/image/upload/v1775495635/rajat_pfp_plea4r.png"
                  alt="Rajat Dhiman"
                  style={{
                    width:        "100%",
                    height:       "100%",
                    objectFit:    "cover",
                    borderRadius: "50%",
                    display:      "block",
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT - text + stats ── */}
          <div>
            <motion.p {...fadeUp(0)} style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "0.6rem",
              letterSpacing: "0.2em",
              color:         "var(--foreground)",
              textTransform: "uppercase",
              marginBottom:  "1rem",
            }}>
             About Me
            </motion.p>

            <motion.h2 {...fadeUp(0.1)} style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              marginBottom:  "2rem",
            }}>
              Engineer who{" "}
              <span style={{ color: "var(--muted)", fontStyle: "italic" }}>
                ships things.
              </span>
            </motion.h2>

            <motion.p {...fadeUp(0.18)} style={{
              fontFamily:   "'DM Sans', sans-serif",
              fontSize:     "1rem",
              lineHeight:   1.8,
              color:        "var(--muted)",
              marginBottom: "1.25rem",
            }}>
              Final year <strong style={{ color: "#fff" }}>ECE student</strong> - building
              production-grade software that solves real problems. I don't just code - I
              architect, deploy, and iterate on{" "}
              <strong style={{ color: "#fff" }}>live products</strong> used by real people.
            </motion.p>

            <motion.p {...fadeUp(0.24)} style={{
              fontFamily:   "'DM Sans', sans-serif",
              fontSize:     "1rem",
              lineHeight:   1.8,
              color:        "var(--muted)",
              marginBottom: "2.5rem",
            }}>
              From RAG pipelines to AI-powered SaaS, I bridge the gap between{" "}
              <strong style={{ color: "#fff" }}>electronics engineering</strong> and modern
              full-stack development.
            </motion.p>

            <motion.div
              {...fadeUp(0.32)}
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:                 "1rem",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{  opacity: 0, y: shouldReduce ? 0 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduce ? 0 : 20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.38 + i * 0.08 }}
                  style={{
                    background:   "var(--glass)",
                    border:       "1px solid var(--border)",
                    borderRadius: "12px",
                    padding:      "1.25rem",
                    textAlign:    "center",
                  }}
                >
                  <span style={{
                    display:    "block",
                    fontFamily: "'Playfair Display', serif",
                    fontSize:   "2rem",
                    fontWeight: 700,
                    color:      "#fff",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    display:       "block",
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      "0.6rem",
                    letterSpacing: "0.1em",
                    color:         "var(--muted)",
                    textTransform: "uppercase",
                    marginTop:     "0.4rem",
                  }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          #about .mx-auto {
            padding: 0 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}