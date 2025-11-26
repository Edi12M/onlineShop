import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { API_BASE_URL } from "../config";

function Form() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast("Please fill in all fields", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      login(response.data.token);
      toast("Login successful!", "success");
      navigate(
        response.data.role === "Admin" ? "/admin-dashboard" : "/user-dashboard",
      );
    } catch (error) {
      toast(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast("Please fill in all fields", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast("Please enter a valid email address", "error");
      return;
    }
    if (password.length < 4) {
      toast("Password must be at least 4 characters", "error");
      return;
    }
    if (password !== confirmPassword) {
      toast("Passwords do not match", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });
      toast("Account created! Please log in.", "success");
      setIsSignup(false);
      setConfirmPassword("");
      setEmail("");
    } catch (error) {
      toast(error.response?.data?.message || "Signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setConfirmPassword("");
    setEmail("");
    setShowPassword(false);
  };

  return (
    <>
      <div className="text-center mb-4">
        <div className="login-avatar">
          <i
            className={`bi ${isSignup ? "bi-person-plus" : "bi-person-circle"}`}
          ></i>
        </div>
        <h3 className="fw-bold text-dark mt-3 mb-1">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h3>
        <p className="text-muted small mb-0">
          {isSignup
            ? "Join MyShop and start exploring"
            : "Sign in to continue shopping"}
        </p>
      </div>

      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <div className="mb-3">
          <label className="form-label fw-semibold small text-muted text-uppercase ls-wide">
            Username
          </label>
          <div className="input-group input-group-lg login-input-group">
            <span className="input-group-text login-input-icon">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
        </div>

        {isSignup && (
          <div className="mb-3" style={{ animation: "fadeIn 0.3s ease" }}>
            <label className="form-label fw-semibold small text-muted text-uppercase ls-wide">
              Email
            </label>
            <div className="input-group input-group-lg login-input-group">
              <span className="input-group-text login-input-icon">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control login-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold small text-muted text-uppercase ls-wide">
            Password
          </label>
          <div className="input-group input-group-lg login-input-group">
            <span className="input-group-text login-input-icon">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
            <button
              type="button"
              className="input-group-text login-input-icon login-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {isSignup && (
            <div className="password-strength mt-2">
              <div
                className={`password-bar ${
                  password.length === 0
                    ? ""
                    : password.length < 4
                      ? "strength-weak"
                      : password.length < 8
                        ? "strength-medium"
                        : "strength-strong"
                }`}
              ></div>
              <small className="text-muted">
                {password.length === 0
                  ? ""
                  : password.length < 4
                    ? "Weak"
                    : password.length < 8
                      ? "Medium"
                      : "Strong"}
              </small>
            </div>
          )}
        </div>

        {isSignup && (
          <div className="mb-3" style={{ animation: "fadeIn 0.3s ease" }}>
            <label className="form-label fw-semibold small text-muted text-uppercase ls-wide">
              Confirm Password
            </label>
            <div className="input-group input-group-lg login-input-group">
              <span className="input-group-text login-input-icon">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control login-input ${
                  confirmPassword && confirmPassword !== password
                    ? "is-invalid"
                    : confirmPassword && confirmPassword === password
                      ? "is-valid"
                      : ""
                }`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-dark w-100 btn-lg login-submit-btn mt-2 mb-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {isSignup ? "Creating Account..." : "Signing In..."}
            </>
          ) : (
            <>
              {isSignup ? "Create Account" : "Sign In"}
              <i className="bi bi-arrow-right ms-2"></i>
            </>
          )}
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <p className="text-center mb-0 mt-3">
          <span className="text-muted">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
          </span>
          <a
            href="#"
            className="login-switch-link"
            onClick={(e) => {
              e.preventDefault();
              switchMode();
            }}
          >
            {isSignup ? "Sign In" : "Create one"}
          </a>
        </p>
      </form>
    </>
  );
}

export default Form;
