import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page contact-grid">
      {/* Left: Info */}
      <section className="panel">
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="eyebrow">Get in touch</p>
          <h1 style={{ margin: "0 0 0.5rem", fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
            Contact QUICKBITE GDC
          </h1>
          <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
            Questions about your order, the menu, or canteen timings? Reach out to the team —
            we're here during canteen hours.
          </p>
        </div>

        {/* Brand identity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--primary-light)",
            marginBottom: "1.5rem"
          }}
        >
          <img
            src="/gdc-logo.jpg"
            alt="Government College Dharamshala"
            style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)", flexShrink: 0 }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}>
              QUICKBITE GDC
            </p>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)" }}>
              Campus Canteen · GDC Dharamshala
            </p>
          </div>
        </div>

        <div className="contact-info">
          <p>
            <MapPin size={16} />
            Government Degree College, Dharamshala, Himachal Pradesh – 176215
          </p>
          <p>
            <Phone size={16} />
            [Canteen phone number – update here]
          </p>
          <p>
            <Mail size={16} />
            [Canteen email address – update here]
          </p>
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "0.85rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface-strong)",
            border: "1px solid var(--line)",
            fontSize: "0.85rem",
            color: "var(--muted)"
          }}
        >
          ⏰ <strong style={{ color: "var(--text)" }}>Canteen Hours:</strong>{" "}
          [Update with actual canteen timings]
        </div>

        <div className="map-box">
          <iframe
            title="GDC Dharamshala location"
            src="https://www.google.com/maps?q=Government+Degree+College+Dharamshala+Himachal+Pradesh&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      {/* Right: Contact Form */}
      <form className="panel form-panel" onSubmit={submit} noValidate>
        <div style={{ marginBottom: "0.25rem" }}>
          <p className="eyebrow">Send a message</p>
          <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
            We'd love to hear from you
          </h2>
        </div>

        <label htmlFor="contact-name">
          Your Name
          <input
            id="contact-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            required
          />
        </label>

        <label htmlFor="contact-email">
          Email Address
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </label>

        <label htmlFor="contact-message">
          Message
          <div style={{ position: "relative" }}>
            <textarea
              id="contact-message"
              rows="6"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe your question or feedback…"
              required
            />
          </div>
        </label>

        <button className="btn full" type="submit" disabled={sending}>
          {sending ? (
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
              Sending…
            </>
          ) : (
            <>
              <Send size={16} /> Send Message
            </>
          )}
        </button>

        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.82rem", textAlign: "center" }}>
          <MessageSquare size={13} style={{ verticalAlign: "middle" }} />{" "}
          We typically respond within canteen hours
        </p>
      </form>
    </div>
  );
};

export default Contact;
