import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis"; // 🧭 Smooth scroll engine

// 🧱 Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// 📄 Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

import "./styles/App.css";

/* 🌀 Global Smooth Scroll (Lenis) */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: .1,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      {/* ✨ Lenis Scroll Wrapper */}
      <SmoothScroll />

      {/* 🧭 Global Header */}
      <Header />

      {/* 🌍 Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* 🦶 Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;
