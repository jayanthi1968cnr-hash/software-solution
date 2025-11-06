import React from "react";
import { FaEnvelope } from "react-icons/fa";  // ✅ for email icon
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* 📞 Hero Section */}
      <section className="contact-hero">
        <h1>📞 Contact Us</h1>
        <p>
          Have a question, partnership idea, or just want to say hi?  
          We’d love to hear from you.
        </p>
      </section>

      {/* 📩 Contact Details */}
      <section className="contact-details container">
        <h2>Get in Touch</h2>
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <FaEnvelope className="contact-icon" />
            <h3>Email</h3>
            <p>team@fireclouds.in</p>
          </div>
        </div>
      </section>

      {/* 📝 Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}
