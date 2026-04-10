import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SiGithub, SiX, SiLeetcode } from "@icons-pack/react-simple-icons";
import { Mail, ArrowUpRight, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { socials } from "@/data/socials";

const SOCIAL_LINKS = [
  {
    key: "email",
    label: "Email",
    handle: "rajatdhimaan01@gmail.com",
    href: `mailto:${socials.email}`,
    icon: <Mail size={15} strokeWidth={1.5} />,
  },
  {
    key: "twitter",
    label: "Twitter / X",
    handle: "@Rajat_dhiman01",
    href: socials.twitter,
    icon: <SiX size={14} />,
  },
  {
    key: "github",
    label: "GitHub",
    handle: "@Rajat-dhiman01",
    href: socials.github,
    icon: <SiGithub size={14} />,
  },
  {
    key: "leetcode",
    label: "LeetCode",
    handle: "rajat_dhiman",
    href: socials.leetcode,
    icon: <SiLeetcode size={14} />,
  },
];

// Toast notification
function Toast({ status, onDone }) {
  const isSuccess = status === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        borderRadius: "12px",
        background: "var(--bg3)",
        border: `1px solid ${
          isSuccess ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"
        }`,
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        maxWidth: "340px",
      }}
    >
      {isSuccess ? (
        <CheckCircle size={18} color="#4ade80" strokeWidth={1.75} />
      ) : (
        <AlertCircle size={18} color="#f87171" strokeWidth={1.75} />
      )}

      <div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#fff",
            fontWeight: 500,
            marginBottom: "2px",
          }}
        >
          {isSuccess ? "Message sent!" : "Something went wrong"}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "var(--muted)",
            letterSpacing: "0.04em",
          }}
        >
          {isSuccess
            ? "I'll get back to you within 24h."
            : "Please try emailing me directly."}
        </p>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const headerRef = useRef(null);
  const headerIn = useInView(headerRef, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Rajat",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }

    setToast(true);
    setTimeout(() => {
      setToast(false);
      setStatus("idle");
    }, 4000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 22 },
    animate: headerIn ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg2)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div ref={headerRef}>
        <motion.p
          {...fadeUp(0)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "0.875rem",
          }}
        >
          // 06 - Contact
        </motion.p>

        <motion.h2
          id="contact-heading"
          {...fadeUp(0.07)}
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
          Let&apos;s work
          <br />
          <em style={{ color: "var(--muted)", fontStyle: "italic" }}>
            together.
          </em>
        </motion.h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "start",
        }}
      >
        <motion.div {...fadeUp(0.12)}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.14em",
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.2)",
              padding: "6px 14px",
              borderRadius: "20px",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                flexShrink: 0,
                animation: "statusPulse 2.4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            Open to full-time roles
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
            }}
          >
            Looking for full-time SDE or product engineering roles. I bring
            production-proven code, AI integration experience, and a builder&apos;s
            mindset to every team.
          </p>

          <nav
            aria-label="Social links"
            style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}
          >
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={`${s.label}: ${s.handle}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.875rem 1.125rem",
                  background: "var(--glass)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: "#fff",
                  transition: "border-color 0.2s, background 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border2)";
                  e.currentTarget.style.background = "var(--glass2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--glass)";
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: "var(--bg3)",
                    border: "1px solid var(--border2)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.07em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "#fff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.handle}
                  </div>
                </div>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  color="var(--muted)"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                name: "name",
                label: "Your Name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "john@company.com",
              },
            ].map((field) => (
              <div
                key={field.name}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  htmlFor={`contact-${field.name}`}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {field.label}
                </label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    background: "var(--glass)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--border2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="contact-message"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about the role or opportunity..."
                value={form.message}
                onChange={handleChange}
                required
                style={{
                  background: "var(--glass)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  resize: "none",
                  width: "100%",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--border2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              aria-label="Send message"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "14px",
                background:
                  status === "sending" ? "rgba(255,255,255,0.7)" : "#ffffff",
                color: "#060608",
                border: "none",
                borderRadius: "8px",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "0.5rem",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {status === "sending" ? (
                <>
                  <Loader
                    size={13}
                    strokeWidth={2}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Sending...
                </>
              ) : (
                "Send Message →"
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {toast && (
        <Toast
          status={status === "idle" ? (form.name ? "error" : "success") : status}
          onDone={() => setToast(false)}
        />
      )}

      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
