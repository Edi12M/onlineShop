import React, { useState } from "react";
import axios from "axios";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // default for signup

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

      if (response.data.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
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
    <div className="logIn-panel">
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role dropdown only affects signup */}
        <div className="dropDown">
          <label>Role (for signup):</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="buttons">
          <Buttons type="button" onSelect={handleLogin}>
            Log In
          </Buttons>
          <Buttons type="button" onSelect={handleSignup}>
            Sign Up
          </Buttons>
        </div>
      </form>
    </div>
  );
}

export default Form;
