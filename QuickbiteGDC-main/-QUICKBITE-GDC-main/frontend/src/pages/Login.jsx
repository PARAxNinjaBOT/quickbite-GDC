import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : location.state?.from || "/menu");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Check your credentials.");
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
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in to your account</h1>
          <p style={{ margin: "0.25rem 0 0", color: "var(--muted)", fontSize: "0.875rem" }}>
            GDC Dharamshala · Campus Canteen Platform
          </p>
        </div>

        <label htmlFor="login-email">
          Email Address
          <input
            id="login-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
        </label>

        <label htmlFor="login-password">
          Password
          <div className="pw-field">
            <input
              id="login-password"
              type={showPw ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              autoComplete="current-password"
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
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="muted" style={{ textAlign: "center", fontSize: "0.875rem" }}>
          New student?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: 700 }}>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
