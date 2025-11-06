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
          {/* === This is the resolved version === */}
          <Link to="/login" className="login-btn">
            LOGIN
          </Link>
          {/* ================================== */}
          <button className="cta-btn">GET STARTED FREE</button>
        </div>
      </div>
    </header>
  );
}