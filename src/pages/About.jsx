import React from "react";
import { motion } from "framer-motion";
import "../styles/About.css";

// 🖼️ Only Daniel's image is imported from src/assets
import danielImg from "../assets/team/daniel.jpg";

export default function About() {
  const teamMembers = [
    {
      name: "Daniel",
      role: "Co-Founder",
      img: danielImg,
    },
    {
      name: "Richerd",
      role: "Opreations Lead",
      img: `https://via.placeholder.com/100?text=J`, // ✅ placeholder instead of missing file
    },
    {
      name: "Michael",
      role: "Product Designer",
      img: `https://via.placeholder.com/100?text=M`, // ✅ placeholder instead of missing file
    },
  ];

  return (
    <div className="about-page">
      {/* 🏢 HERO SECTION */}
      <section className="about-hero">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="about-hero-text"
        >
          <p className="about-subtitle">/ WHO WE ARE</p>
          <h1>
            ℹ️ About <span className="gradient-text">FireClouds</span>
          </h1>
          <p>
            We’re a passionate team dedicated to building innovative, scalable,
            and impactful software solutions that help businesses grow and
            thrive in the digital era.
          </p>
        </motion.div>

        <motion.div
          className="about-hero-image"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          <img src="/assets/about-illustration.svg" alt="About FireClouds" />
        </motion.div>
      </section>

      {/* 🧭 MISSION SECTION */}
      <motion.section
        className="mission-section container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Mission</h2>
        <p>
          At FireClouds Software Solutions, our mission is to empower businesses
          through cutting-edge technology and automation. We deliver
          high-quality, future-ready solutions that drive real-world impact and
          long-term growth.
        </p>
      </motion.section>

      {/* 👨‍💻 TEAM SECTION */}
      <motion.section
        className="team-section container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <motion.div
              className="team-card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={member.name}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/100?text=${member.name[0]}`;
                }}
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 💡 VALUES SECTION */}
      <motion.section
        className="values-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Core Values</h2>
        <div className="values-grid container">
          {[
            {
              icon: "🚀",
              title: "Innovation",
              desc: "We embrace new technologies and ideas to deliver solutions that shape the future.",
            },
            {
              icon: "🤝",
              title: "Trust",
              desc: "We build strong partnerships with our clients based on honesty and transparency.",
            },
            {
              icon: "🌱",
              title: "Growth",
              desc: "We believe in continuous learning, growth, and helping others scale with us.",
            },
          ].map((val, i) => (
            <motion.div
              className="value-card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>
                {val.icon} {val.title}
              </h3>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 📩 CTA SECTION */}
      <motion.section
        className="about-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Let’s Build Something Amazing Together</h2>
        <p>
          Join hands with us to create software solutions that truly make a
          difference.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </motion.section>
    </div>
  );
}
