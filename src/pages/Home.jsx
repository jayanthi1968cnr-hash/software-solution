import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaLaptopCode, FaRobot, FaLock } from "react-icons/fa";
import waveVideo from "../assets/wave-video.mp4";
import iconImage from "../assets/icon.png"; // 👈 Floating image
import "../styles/Home.css";

export default function Home() {
  useEffect(() => {
    const hero = document.querySelector(".hero-section");
    const iconEl = document.querySelector(".floating-icon");

    const handleScroll = () => {
      const scrollY = window.scrollY;

      /* 🪄 HERO FADE OUT */
      const fadeStart = 0;
      const fadeEnd = 300;
      const heroOpacity = Math.max(0, 1 - scrollY / fadeEnd);
      hero.style.opacity = heroOpacity;
      hero.style.transform = `translateY(-${scrollY / 5}px)`;

      /* 🖼️ FLOATING ICON SCROLL EFFECT */
      if (iconEl) {
        const iconSection = iconEl.parentElement;
        const sectionTop = iconSection.offsetTop;

        // ✨ Reduce shrink distance for faster effect
        const shrinkStart = sectionTop + 50;
        const shrinkEnd = sectionTop + 800; // 👈 reduced from 5000 to 800px

        const rawProgress = (scrollY - shrinkStart) / (shrinkEnd - shrinkStart);
        const easedProgress = Math.pow(Math.min(Math.max(rawProgress, 0), 1), 0.5);
        const progress = Math.min(Math.max(easedProgress, 0), 1);

        // 🚀 Scale 3 → 0.8 (smaller icon & smoother shrink)
        const maxScale = 3;
        const minScale = 0.8;
        const scale = maxScale - (maxScale - minScale) * progress;

        // ✨ Add slight upward movement as it shrinks
        const translateY = -50 - progress * 100; // moves up as scroll happens

        iconEl.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;

        // 🫧 Smooth fade in/out
        const fadeInPoint = 0.05;
        const fadeOutPoint = 0.9;
        let opacity = 1;
        if (progress < fadeInPoint) {
          opacity = progress / fadeInPoint;
        } else if (progress > fadeOutPoint) {
          opacity = 1 - (progress - fadeOutPoint) / (1 - fadeOutPoint);
        }
        iconEl.style.opacity = opacity;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* 🏠 HERO SECTION */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="hero-subtitle">/ BUILD FUTURE</p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            All-in-One <br />
            <span className="gradient-text">Innovation Platform</span> <br />
            Built for Everyone.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We design, develop, and deliver world-class software solutions
            that drive growth for businesses of all sizes.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button className="primary-btn">Get a Free Consultation</button>
            <button className="secondary-btn">View Services</button>
          </motion.div>
        </motion.div>

        {/* 🌊 Video Background */}
        <video className="wave-bg" autoPlay loop muted playsInline>
          <source src={waveVideo} type="video/mp4" />
        </video>
      </section>

      {/* 🌟 WHY CHOOSE US */}
      <section className="why-section container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h2>

        <div className="why-grid">
          {[
            {
              icon: <FaCloud size={40} />,
              title: "Cloud Solutions",
              text: "Secure and scalable infrastructure that grows with you.",
            },
            {
              icon: <FaLaptopCode size={40} />,
              title: "Custom Development",
              text: "Tailored software that fits your business perfectly.",
            },
            {
              icon: <FaRobot size={40} />,
              title: "AI & Automation",
              text: "Boost productivity with intelligent solutions.",
            },
            {
              icon: <FaLock size={40} />,
              title: "Trusted Security",
              text: "We protect your data with enterprise-grade security.",
            },
          ].map((item, index) => (
            <motion.div
              className="why-card"
              whileHover={{ scale: 1.05 }}
              key={index}
            >
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🖼️ Floating Icon Section */}
      <section className="icon-section">
        <img src={iconImage} alt="floating icon" className="floating-icon" />
      </section>

      {/* 🚀 SHOWCASE SECTION */}
      <section className="showcase-section">
        <motion.div
          className="showcase-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Our Showcase</h2>
          <p>
            Explore some of our proudest innovations that redefine the digital
            landscape and empower businesses worldwide.
          </p>
        </motion.div>
      </section>

      {/* 🤝 CTA SECTION */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to build the future with us?</h2>
          <p>Let's create something extraordinary — from concept to launch.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Contact Us</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
