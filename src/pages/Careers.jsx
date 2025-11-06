import React from "react";
import "../styles/Careers.css";

export default function Careers() {
  return (
    <div className="careers-page">
      {/* 💼 Hero Section */}
      <section className="careers-hero">
        <h1>💼 Careers</h1>
        <p>
          Join our growing team of developers, designers, and dreamers.
          Together, we’re shaping the future of technology.
        </p>
      </section>

      {/* 📢 Open Roles */}
      <section className="careers-openings container">
        <h2>Current Openings</h2>
        <div className="job-grid">
          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p>Work with React, modern UI frameworks, and build fast, elegant interfaces.</p>
            <button>Apply Now</button>
          </div>

          <div className="job-card">
            <h3>Backend Engineer</h3>
            <p>Build scalable APIs and microservices with modern cloud infrastructure.</p>
            <button>Apply Now</button>
          </div>

          <div className="job-card">
            <h3>Product Designer</h3>
            <p>Design user-centric products that people love using every day.</p>
            <button>Apply Now</button>
          </div>
        </div>
      </section>

      {/* 🧠 Culture & Values */}
      <section className="careers-culture">
        <h2>Why Work With Us</h2>
        <div className="culture-grid container">
          <div className="culture-card">
            <h3>🌱 Growth</h3>
            <p>We invest in people — your learning and growth are our priority.</p>
          </div>
          <div className="culture-card">
            <h3>🌍 Flexibility</h3>
            <p>Work from anywhere with flexible schedules and remote-first culture.</p>
          </div>
          <div className="culture-card">
            <h3>🤝 Collaboration</h3>
            <p>We believe in teamwork, open communication, and shared success.</p>
          </div>
        </div>
      </section>

      {/* 📩 CTA */}
      <section className="careers-cta">
        <h2>🚀 Ready to Join the Team?</h2>
        <p>
          If you’re passionate about innovation and creating real impact, we’d
          love to hear from you.
        </p>
        <button>Send Your Resume</button>
      </section>
    </div>
  );
}
