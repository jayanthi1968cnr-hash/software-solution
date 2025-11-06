import React, { useEffect } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f
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
<<<<<<< HEAD
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
=======

import "./styles/App.css";

/* 🌀 Global Smooth Scroll (Lenis) */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: .1,
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f
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
<<<<<<< HEAD
  }, [isAuthPage]);
=======
  }, []);
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f

  return null;
}

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
      {/* ✨ Lenis Scroll Wrapper */}
      <SmoothScroll />

      {/* 🧭 Global Header */}
      <Header />
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f

      {/* 🌍 Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
          
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
=======
        </Routes>
      </main>

      {/* 🦶 Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f
