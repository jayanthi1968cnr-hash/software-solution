import React from "react";
import { motion } from "framer-motion";
import { FaCloud, FaMobileAlt, FaLaptopCode, FaRobot, FaSearch, FaRocket, FaLock, FaHeadset } from "react-icons/fa";
import "../styles/Services.css";

export default function Services() {
  return (
    <div className="services-page">
      {/* 🧰 Hero Section */}
      <section className="services-hero">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>🧰 Our Services</h1>
          <p>
            We provide end-to-end software solutions — from strategy and design to
            development and deployment — helping businesses grow and scale with
            modern technology.
          </p>
        </motion.div>

        <motion.div
          className="services-hero-image"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <img src="/assets/services-illustration.svg" alt="Services Illustration" />
        </motion.div>
      </section>

      {/* 💻 Services Grid */}
      <section className="services-list container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What We Offer
        </motion.h2>

        <div className="service-grid">
          {[
            { icon: <FaLaptopCode />, title: "Custom Web Development", desc: "Scalable, responsive, and secure web apps tailored to your business needs." },
            { icon: <FaMobileAlt />, title: "Mobile App Solutions", desc: "High-performance mobile apps for iOS and Android to engage users everywhere." },
            { icon: <FaCloud />, title: "Cloud & Automation", desc: "Streamline workflows with secure cloud infrastructure and smart automation tools." },
            { icon: <FaRobot />, title: "AI & ML Integrations", desc: "Transform data into insights with AI-powered solutions and ML models." },
          ].map((service, i) => (
            <motion.div
              key={i}
              className="service-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧭 Process Section */}
      <section className="process-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Development Process
        </motion.h2>

        <div className="process-grid container">
          {[
            { step: "1. 🚀 Discovery", desc: "We understand your goals, challenges, and requirements." },
            { step: "2. 🛠️ Design & Build", desc: "We create user-friendly, robust, and scalable solutions." },
            { step: "3. 🔐 Testing & Launch", desc: "We ensure quality and security before going live." },
            { step: "4. 📈 Support & Scale", desc: "We provide continuous support and help your product grow." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="process-step"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <h3>{item.step}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📩 CTA */}
      <section className="services-cta">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let’s Build Your Next Big Thing 🚀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Partner with us to bring your ideas to life with cutting-edge technology and design.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
}
