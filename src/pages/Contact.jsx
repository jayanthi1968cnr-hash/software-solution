import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaComments, FaGlobe, FaBullseye, FaBolt } from "react-icons/fa";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Option 1: Using backend API (sends to firecloudslap@gmail.com)
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        alert('Thank you for contacting us! Your message has been sent. We will get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      // Option 2: Fallback to mailto (sends to firecloudslap@gmail.com)
      const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Company: ${formData.company}\n\n` +
        `Message:\n${formData.message}`
      );
      // Sends to firecloudslap@gmail.com but user sees team@fireclouds.in in UI
      window.location.href = `mailto:firecloudslap@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* 📞 Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>
            We're here to help and answer any questions you might have. 
            We look forward to hearing from you and exploring how we can 
            help your business grow.
          </p>
          
          {/* Support Number Highlight */}
          <div className="support-number-highlight">
            <span className="support-label">24/7 Customer Support</span>
            <div className="support-number">08069328924</div>
            <a href="tel:+918069328924" className="call-button">
              <span className="call-icon">📞</span>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* 📩 Contact Details */}
      <section className="contact-details">
        <div className="container">
          <h2>How Can We Help?</h2>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email Us</h3>
              <p>
                <a href="mailto:team@fireclouds.in">team@fireclouds.in</a>
              </p>
              <p>
                <a href="mailto:support@fireclouds.in">support@fireclouds.in</a>
              </p>
              <p style={{ marginTop: '10px', opacity: 0.7 }}>
                We'll respond within 24 hours
              </p>
            </div>

            <div className="contact-info-card">
              <FaPhone className="contact-icon" />
              <h3>Call Us</h3>
              <p>
                <a href="tel:+918069328924">+91 80693 28924</a>
              </p>
              <p style={{ marginTop: '10px', opacity: 0.7 }}>
                Mon-Fri: 9:00 AM - 6:00 PM IST
              </p>
              <p style={{ opacity: 0.7 }}>
                Sat: 10:00 AM - 4:00 PM IST
              </p>
            </div>

            <div className="contact-info-card">
              <FaComments className="contact-icon" />
              <h3>Live Chat</h3>
              <p>
                Get instant answers to your questions
              </p>
              <p style={{ marginTop: '10px', opacity: 0.7 }}>
                Available: Mon-Fri, 9 AM - 6 PM IST
              </p>
              <p style={{ marginTop: '10px' }}>
                <a href="#chat">Start Chat →</a>
              </p>
            </div>

            <div className="contact-info-card">
              <FaGlobe className="contact-icon" />
              <h3>Social Media</h3>
              <p>Follow us for updates</p>
              <p style={{ marginTop: '10px' }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              </p>
              <p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |{' '}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </p>
            </div>

            <div className="contact-info-card">
              <FaBullseye className="contact-icon" />
              <h3>Career Inquiries</h3>
              <p>
                Interested in joining our team?
              </p>
              <p style={{ marginTop: '10px' }}>
                <a href="mailto:careers@fireclouds.in">careers@fireclouds.in</a>
              </p>
              <p style={{ marginTop: '10px', opacity: 0.7 }}>
                Visit our Careers page
              </p>
            </div>

            <div className="contact-info-card">
              <FaBolt className="contact-icon" />
              <h3>Quick Response</h3>
              <p>
                Need urgent assistance?
              </p>
              <p style={{ marginTop: '10px' }}>
                Call our 24/7 hotline
              </p>
              <p style={{ marginTop: '10px' }}>
                <a href="tel:+918069328924" style={{ color: '#ff8a00', fontWeight: 'bold' }}>08069328924</a>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="business-hours">
            <h3>Business Hours</h3>
            <div className="hours-grid">
              <div className="hours-row">
                <span className="day">Monday - Friday</span>
                <span className="time">9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Saturday</span>
                <span className="time">10:00 AM - 4:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="day">Sunday</span>
                <span className="time">Closed</span>
              </div>
              <div className="hours-row" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '15px', marginTop: '10px' }}>
                <span className="day">24/7 Support Hotline</span>
                <span className="time">
                  <a href="tel:+918069328924" style={{ color: '#ff8a00' }}>08069328924</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📝 Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <select 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              required
              disabled={isSubmitting}
            >
              <option value="">Select Subject *</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Sales & Pricing">Sales & Pricing</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Partnership Opportunities">Partnership Opportunities</option>
              <option value="Career Opportunities">Career Opportunities</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              disabled={isSubmitting}
            ></textarea>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'error' && (
              <p style={{ color: '#ff4444', marginTop: '10px', textAlign: 'center' }}>
                Failed to send message. Please email us directly at{' '}
                <a href="mailto:team@fireclouds.in" style={{ color: '#ff8a00' }}>
                  team@fireclouds.in
                </a>
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 🎯 CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Let's discuss how we can help transform your business with our 
            innovative software solutions.
          </p>
          <div className="cta-buttons">
            <a href="tel:+918069328924" className="cta-button cta-primary">
              📞 Call Now: 08069328924
            </a>
            <a href="mailto:team@fireclouds.in" className="cta-button cta-secondary">
              📧 Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}