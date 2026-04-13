import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { socials } from "@/data/socials";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "DSA",      href: "#dsa" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: shouldReduce ? 0 : -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: scrolled ? "rgba(6,6,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
        className="fixed top-0 left-0 md:left-15 right-0 z-50 w-full py-2"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex items-center justify-between px-5 py-4 md:px-10 lg:px-16 max-w-7xl relative"
        >
          {/* Logo — left */}
          <a
            href="#"
            aria-label="Rajat Dhiman home"
            className="flex items-center group relative z-10 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 bg-[var(--bg)]">
              <img
                src="https://res.cloudinary.com/dhysr3yfi/image/upload/v1775495635/rajat_pfp_plea4r.png"
                alt="Rajat Dhiman"
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          {/* Desktop nav links — center */}
          <ul
            className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-[53%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative transition-colors duration-200 group"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)"; }}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-200 group-hover:w-full"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop socials — right */}
          <div className="hidden md:flex items-center gap-3 relative z-10 mt-3 left-12 py-2">
            {[
              { href: socials.twitter, icon: <SiX size={15} />, label: "Twitter" },
              { href: socials.github, icon: <SiGithub size={15} />, label: "GitHub" },
              { href: socials.leetcode, text: "LC", label: "LeetCode" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex items-center justify-center w-[36px] h-[36px] rounded-lg transition-all duration-200"
                style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--border2)";
                  e.currentTarget.style.background = "var(--glass2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.text ? (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.05em" }}>
                    {item.text}
                  </span>
                ) : (
                  item.icon
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger — right, always visible on mobile */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <IconX size={18} stroke={1.5} /> : <IconMenu2 size={18} stroke={1.5} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: shouldReduce ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 md:hidden"
            style={{
              backgroundColor: "rgba(6,6,8,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <ul className="flex flex-col gap-2 flex-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: shouldReduce ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-4 text-2xl font-bold tracking-tight border-b transition-colors duration-150"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "var(--muted)",
                      borderColor: "var(--border)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.3 }}
              className="flex items-center gap-4 pt-6"
            >
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                onClick={closeMenu}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors duration-200"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <SiGithub size={15} />
                github.com/Rajat-dhiman01
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}