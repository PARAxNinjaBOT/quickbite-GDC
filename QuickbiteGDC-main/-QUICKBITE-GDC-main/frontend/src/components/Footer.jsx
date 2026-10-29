import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <footer className="footer">
      <div className="footer-brand">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
          <img
            src="/gdc-logo.jpg"
            alt="Government College Dharamshala"
            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)", flexShrink: 0 }}
          />
          <strong style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.05rem" }}>
            QUICKBITE GDC
          </strong>
        </div>
        <p className="footer-brand tagline" style={{ margin: "0 0 0.6rem" }}>
          ⚡ Order Smart. Skip the Queue.
        </p>
        <p className="footer-desc">
          The official campus canteen ordering platform for Government Degree College, Dharamshala,
          Himachal Pradesh. Academic Session 2026–2027.
        </p>
      </div>

      <div>
        <h3>Quick Links</h3>
        <p><Link to="/" style={{ color: "var(--muted)" }}>Home</Link></p>
        <p><Link to="/menu" style={{ color: "var(--muted)" }}>Menu</Link></p>
        <p><Link to="/order" style={{ color: "var(--muted)" }}>My Order</Link></p>
        <p><Link to="/contact" style={{ color: "var(--muted)" }}>Contact</Link></p>
      </div>

      <div>
        <h3>Canteen Info</h3>
        <p><MapPin size={14} /> GDC Campus, Dharamshala, HP – 176215</p>
        <p><Phone size={14} /> [Canteen phone – update here]</p>
        <p><Mail size={14} /> [Canteen email – update here]</p>
        <p><Instagram size={14} /> @quickbitegdc</p>
      </div>
    </footer>

    <div className="footer-bottom">
      <span>© 2026–2027 QUICKBITE GDC · Government Degree College, Dharamshala</span>
      <span>Made with ❤️ for the campus community</span>
    </div>
  </>
);

export default Footer;
