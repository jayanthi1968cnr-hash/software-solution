import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // ✅ Import loginUser
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ Add error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      // ✅ Actually authenticate with Firebase
      const result = await loginUser(email, password);
      
      if (result.success) {
        // ✅ Navigate to dashboard on success
        navigate("/dashboard");
      } else {
        // ❌ Show error message
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      {/* Subtle background gradient */}
      <div className="bg-gradient"></div>
      
      {/* Animated background elements */}
      <div className="animated-bg-1"></div>
      <div className="animated-bg-2"></div>

      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/")}
        className="back-button"
        aria-label="Go back to home"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>BACK</span>
      </button>

      <div className="content-wrapper">
        {/* Logo/Brand */}
        <div className="brand-section">
          <h1 className="brand-title">
            <span className="brand-gradient">DEVPORTAL</span>
          </h1>
          <p className="brand-subtitle">Welcome back, developer</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {/* ✅ Error Message Display */}
            {error && (
              <div style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                borderRadius: "0.5rem",
                color: "#ef4444",
                fontSize: "0.875rem"
              }}>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="developer@example.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-wrapper">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => alert("Password reset functionality")}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-wrapper">
            <div className="divider-line">
              <div className="divider-border"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">NEW HERE?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="create-account-wrapper">
            <button
              type="button"
              onClick={handleCreateAccount}
              className="create-account-btn"
              disabled={isLoading}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="terms-section">
          By continuing, you agree to our{" "}
          <button
            onClick={() => alert("Show Terms of Service")}
            className="terms-link"
          >
            Terms of Service
          </button>
          {" "}and{" "}
          <button
            onClick={() => alert("Show Privacy Policy")}
            className="terms-link"
          >
            Privacy Policy
          </button>
        </div>

        {/* Footer */}
        <div className="copyright">
          © 2025 DevPortal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;