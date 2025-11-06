import React from "react";
import { motion } from "framer-motion";
import "../styles/Products.css";

export default function Products() {
  return (
    <div className="products-page">
      {/* 🛍️ Hero Section */}
      <section className="products-hero">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="products-hero-text"
        >
          <h1>
            🛍️ <span className="gradient-text">Our Products</span>
          </h1>
          <p>
            Explore our suite of innovative software tools designed to simplify
            complex challenges, accelerate growth, and power your business.
          </p>
        </motion.div>

        <motion.div
          className="products-hero-image"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          <img src="/assets/products-illustration.svg" alt="Products Illustration" />
        </motion.div>
      </section>

      {/* 🧭 Product Showcase */}
      <section className="products-showcase container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>

        <div className="product-grid">
          {[
            {
              icon: "🚀",
              title: "Apollo Tracker",
              desc: "A smart real-time monitoring and alerting platform designed to track operational efficiency and detect anomalies instantly.",
            },
            {
              icon: "📡",
              title: "FastFinder",
              desc: "An intelligent search and aggregation tool that gives instant visibility into global data sources for critical insights.",
            },
            {
              icon: "🤖",
              title: "Irish Voice AI",
              desc: "A personal AI assistant built to help teams automate workflows, manage reminders, and access insights by voice.",
            },
          ].map((product, i) => (
            <motion.div
              className="product-card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>
                {product.icon} {product.title}
              </h3>
              <p>{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚡ Features Section */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Our Products Stand Out
        </motion.h2>
        <div className="features-grid container">
          {[
            { icon: "✨", title: "Easy to Use", desc: "Designed with simplicity at the core so anyone can use it without technical expertise." },
            { icon: "⚡", title: "Fast & Reliable", desc: "High-performance architecture that ensures smooth and reliable operation at scale." },
            { icon: "🔐", title: "Secure", desc: "Industry-grade security and compliance standards to protect your data and users." },
            { icon: "🚀", title: "Scalable", desc: "Built to scale with your business, from startups to global enterprises." },
          ].map((feature, i) => (
            <motion.div
              className="feature-card"
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>
                {feature.icon} {feature.title}
              </h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📩 CTA */}
      <motion.section
        className="products-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Experience the Future?</h2>
        <p>
          Get in touch with us to see how our products can help your business thrive.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Request Demo
        </motion.button>
      </motion.section>
    </div>
  );
}
