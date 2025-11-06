// src/components/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = ({ onEmotionChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-80 text-center">
      <input
        type="email"
        placeholder="Email"
        onFocus={() => onEmotionChange("happy")}
        onChange={() => onEmotionChange("happy")}
        className="p-2 border rounded"
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onFocus={() => onEmotionChange("excited")}
        onChange={() => onEmotionChange("excited")}
        className="p-2 border rounded"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        onMouseDown={() => onEmotionChange("shy")}
        className="text-blue-600 underline text-sm"
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
      <button
        className="bg-blue-600 text-white p-2 rounded mt-3 hover:bg-blue-700"
        onMouseEnter={() => onEmotionChange("happy")}
        onMouseLeave={() => onEmotionChange("neutral")}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
