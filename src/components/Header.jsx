import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <div className="nav-container">
        {/* 🌐 LOGO / BRAND */}
        <div className="logo">
          <Link to="/">FireClouds Software Solutions</Link>
        </div>

        {/* 🧭 NAVIGATION MENU */}
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/products">Products</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* 🪄 CTA BUTTONS (Optional — like Kzero) */}
        <div className="nav-actions">
<<<<<<< HEAD
          {/* === THIS IS THE CHANGED LINE === */}
          <Link to="/login" className="login-btn">
            LOGIN
          </Link>
          {/* =============================== */}
=======
          <button className="login-btn">LOGIN</button>
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f
          <button className="cta-btn">GET STARTED FREE</button>
        </div>
      </div>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c18b183bcc8d9d8769ca80a05676f8b85f8cf0f
