import { Menu, Moon, ShoppingCart, Sun, X } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("dd_theme") === "dark");
  const { items } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("dd_theme", dark ? "dark" : "light");
  }, [dark]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        {/* GDC College Logo */}
        <img
          src="/gdclogo.jpeg"
          alt="Government College Dharamshala Logo"
          className="gdc-logo"
        />
        <div className="brand-text">
          <strong>QUICKBITE GDC</strong>
          <small>Order Smart. Skip the Queue.</small>
        </div>
      </Link>

      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/menu" onClick={() => setOpen(false)}>Menu</NavLink>
        <NavLink to="/order" onClick={() => setOpen(false)}>My Order</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" onClick={() => setOpen(false)}>Dashboard</NavLink>
        )}
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn"
          type="button"
          onClick={() => setDark((v) => !v)}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <Link className="cart-link" to="/order" aria-label={`Cart – ${itemCount} items`}>
          <ShoppingCart size={17} />
          {itemCount > 0 && <span>{itemCount}</span>}
        </Link>

        {user ? (
          <button className="user-pill" type="button" onClick={logout} aria-label="Logout">
            <span style={{ fontSize: "0.95rem" }}>👤</span>
            <span>{user.name?.split(" ")[0] || "Account"}</span>
          </button>
        ) : (
          <Link className="user-pill" to="/login">
            <span style={{ fontSize: "0.95rem" }}>👤</span>
            <span>Login</span>
          </Link>
        )}

        <button
          className="icon-btn mobile-only"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle mobile menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
