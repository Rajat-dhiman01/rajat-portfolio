import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
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
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex items-center justify-between px-5 py-4 md:px-10 lg:px-16 max-w-7xl"
        >
          <a href="#" aria-label="Rajat Dhiman home" className="flex flex-col leading-none group">
            <span
              className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity duration-200"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Rajat Dhiman
            </span>
            <span
              className="text-xs mt-0.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--muted)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
            
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative transition-colors duration-200 group"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
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

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/Rajat-dhiman01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
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
              <SiGithub size={17} />
            </a>
          </div>

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
                href="https://github.com/Rajat-dhiman01"
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