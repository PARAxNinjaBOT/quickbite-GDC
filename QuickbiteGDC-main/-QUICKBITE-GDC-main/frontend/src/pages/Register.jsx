import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === "admin" ? "/admin" : "/menu");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit} noValidate>
        {/* Brand */}
        <div className="auth-brand">
          <img
            src="/gdc-logo.jpg"
            alt="Government College Dharamshala"
            style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)", flexShrink: 0 }}
          />
          <span className="auth-brand-text">QUICKBITE GDC</span>
        </div>

        <div>
          <p className="eyebrow">Get started</p>
          <h1>Create your account</h1>
          <p style={{ margin: "0.25rem 0 0", color: "var(--muted)", fontSize: "0.875rem" }}>
            Join the campus canteen ordering platform
          </p>
        </div>

        <label htmlFor="reg-name">
          Full Name
          <input
            id="reg-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
        </label>

        <label htmlFor="reg-email">
          College Email
          <input
            id="reg-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
        </label>

        <label htmlFor="reg-password">
          Password
          <div className="pw-field">
            <input
              id="reg-password"
              type={showPw ? "text" : "password"}
              minLength="6"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="pw-toggle"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <label htmlFor="reg-role">
          Account Type
          <select
            id="reg-role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">Student / Customer</option>
            <option value="admin">Admin (Canteen Staff)</option>
          </select>
        </label>

        <button className="btn full" disabled={loading} type="submit">
          {loading ? (
            <>
              <span
                style={{
                  width: 15,
                  height: 15,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 700ms linear infinite",
                  display: "inline-block"
                }}
              />
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="muted" style={{ textAlign: "center", fontSize: "0.875rem" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
