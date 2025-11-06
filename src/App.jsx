import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard"; // ✅ Import UserDashboard

import "./styles/App.css";

/* 🌀 Global Smooth Scroll (Lenis) - Only on non-auth pages */
function SmoothScroll() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/dashboard"].includes(location.pathname);

  useEffect(() => {
    // Don't apply smooth scroll on auth pages
    if (isAuthPage) return;

    const lenis = new Lenis({
      duration: 0.1,
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
  }, [isAuthPage]);

  return null;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/dashboard"].includes(location.pathname);

  return (
    <>
      {/* ✨ Lenis Scroll Wrapper */}
      <SmoothScroll />

      {/* 🧭 Conditional Header - Hide on auth pages */}
      {!isAuthPage && <Header />}

      {/* 🌍 Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Pages - No Header/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </main>

      {/* 🦶 Conditional Footer - Hide on auth pages */}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;