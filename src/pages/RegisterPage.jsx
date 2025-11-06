import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/LoginPage.css"; // Reusing the same styles

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.displayName.trim()) {
      setError("Please enter your full name");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError("Password must contain uppercase, lowercase, and numbers");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(
        formData.email,
        formData.password,
        formData.displayName
      );

      if (result.success) {
        // Registration successful
        setSuccess(true);
        // ✅ Navigate to dashboard after successful registration
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // Registration failed - handle Firebase errors
        let errorMessage = result.error;
        
        // Make error messages more user-friendly
        if (errorMessage.includes("email-already-in-use")) {
          errorMessage = "This email is already registered. Please login instead.";
        } else if (errorMessage.includes("invalid-email")) {
          errorMessage = "Invalid email address format.";
        } else if (errorMessage.includes("weak-password")) {
          errorMessage = "Password is too weak. Please use a stronger password.";
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    
    // Length
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    
    // Complexity
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "#ef4444" };
    if (strength <= 4) return { strength: 66, label: "Medium", color: "#f97316" };
    return { strength: 100, label: "Strong", color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="login-container">
      {/* Subtle background gradient */}
      <div className="bg-gradient"></div>
      
      {/* Animated background elements */}
      <div className="animated-bg-1"></div>
      <div className="animated-bg-2"></div>

      <div className="content-wrapper">
        {/* Logo/Brand */}
        <div className="brand-section">
          <h1 className="brand-title">
            <span className="brand-gradient">DEVPORTAL</span>
          </h1>
          <p className="brand-subtitle">Create your developer account</p>
        </div>

        {/* Registration Card */}
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Error Message */}
            {error && (
              <div style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "0.5rem",
                color: "#fca5a5",
                fontSize: "0.875rem",
                fontFamily: '"IBM Plex Mono", monospace',
                animation: "fadeIn 0.3s ease-in"
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "0.5rem",
                color: "#6ee7b7",
                fontSize: "0.875rem",
                fontFamily: '"IBM Plex Mono", monospace',
                animation: "fadeIn 0.3s ease-in"
              }}>
                ✅ Account created successfully! Redirecting to dashboard...
              </div>
            )}

            {/* Display Name Input */}
            <div className="input-group">
              <label htmlFor="displayName" className="input-label">
                Full Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="input-field"
                placeholder="John Doe"
                required
                disabled={isLoading || success}
                autoComplete="name"
              />
            </div>

            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="developer@example.com"
                required
                disabled={isLoading || success}
                autoComplete="email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
                disabled={isLoading || success}
                minLength="6"
                autoComplete="new-password"
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.25rem"
                  }}>
                    <span style={{
                      fontSize: "0.75rem",
                      color: passwordStrength.color,
                      fontFamily: '"IBM Plex Mono", monospace'
                    }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "2px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${passwordStrength.strength}%`,
                      height: "100%",
                      backgroundColor: passwordStrength.color,
                      transition: "all 0.3s ease"
                    }}></div>
                  </div>
                </div>
              )}
              
              {/* Password Requirements */}
              <div style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "#9ca3af",
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                Password must contain:
                <ul style={{ 
                  marginTop: "0.25rem", 
                  marginLeft: "1rem",
                  listStyleType: "disc"
                }}>
                  <li style={{ 
                    color: formData.password.length >= 6 ? "#10b981" : "#9ca3af" 
                  }}>
                    At least 6 characters
                  </li>
                  <li style={{ 
                    color: /[A-Z]/.test(formData.password) ? "#10b981" : "#9ca3af" 
                  }}>
                    One uppercase letter
                  </li>
                  <li style={{ 
                    color: /[a-z]/.test(formData.password) ? "#10b981" : "#9ca3af" 
                  }}>
                    One lowercase letter
                  </li>
                  <li style={{ 
                    color: /[0-9]/.test(formData.password) ? "#10b981" : "#9ca3af" 
                  }}>
                    One number
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
                disabled={isLoading || success}
                minLength="6"
                autoComplete="new-password"
                style={{
                  borderColor: formData.confirmPassword && 
                               formData.password !== formData.confirmPassword 
                               ? "#ef4444" 
                               : ""
                }}
              />
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: formData.password === formData.confirmPassword 
                         ? "#10b981" 
                         : "#ef4444"
                }}>
                  {formData.password === formData.confirmPassword 
                    ? "✓ Passwords match" 
                    : "✗ Passwords do not match"}
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              marginTop: "0.5rem"
            }}>
              <input
                type="checkbox"
                id="terms"
                required
                disabled={isLoading || success}
                style={{
                  marginTop: "0.25rem",
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
              <label 
                htmlFor="terms" 
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontFamily: '"IBM Plex Mono", monospace',
                  cursor: "pointer"
                }}
              >
                I agree to the{" "}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Show Terms of Service");
                  }}
                  style={{
                    color: "#fb923c",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Terms of Service
                </span>
                {" "}and{" "}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Show Privacy Policy");
                  }}
                  style={{
                    color: "#fb923c",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="submit-btn"
              style={{ marginTop: "1rem" }}
            >
              {isLoading ? "CREATING ACCOUNT..." : success ? "SUCCESS!" : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-wrapper">
            <div className="divider-line">
              <div className="divider-border"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">ALREADY HAVE AN ACCOUNT?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="create-account-wrapper">
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="create-account-btn"
              disabled={isLoading || success}
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="copyright">
          © 2025 DevPortal. All rights reserved.
        </div>
      </div>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;