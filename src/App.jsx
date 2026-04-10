import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ProblemSolver from "./components/ProblemSolver";
import WhatIBuild from "./components/WhatIBuild";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ProblemSolver />
      <WhatIBuild />
      <Contact />
      <Footer />
    </main>
  );
}