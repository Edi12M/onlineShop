import React, { useState } from "react";
import axios from "axios";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5145/api/auth/login", {
        username,
        password,
      });
      alert(response.data.message);
      navigate(response.data.role === "Admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5145/api/auth/signup", {
        username,
        password,
        role,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="card shadow-lg border-0 p-4"
      style={{
        width: "400px",
        background: "rgba(255, 255, 255, 0.65)", // lower opacity
        backdropFilter: "blur(10px)",            // frosted glass effect
        borderRadius: "15px",
        animation: "fadeIn 0.6s ease-in-out",    // optional fade-in
      }}
    >
      <h3 className="text-center mb-4 fw-bold text-dark">Welcome Back!</h3>

      <form>
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Role (for signup)</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <Buttons type="button" variant="primary" onSelect={handleLogin}>
            Log In
          </Buttons>
          <Buttons type="button" variant="outline-dark" onSelect={handleSignup}>
            Sign Up
          </Buttons>
        </div>
      </form>
    </div>
  );
}

export default Form;
