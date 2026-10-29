import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Clock,
  ScrollText,
  ShoppingBag,
  Ticket,
  Utensils,
  Zap
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { fallbackFoods } from "../utils/sampleData";

const categories = [
  { label: "Indian Meals", icon: "🍛", slug: "Indian" },
  { label: "Snacks", icon: "🥪", slug: "Burger" },
  { label: "Pizza", icon: "🍕", slug: "Pizza" },
  { label: "Cold Drinks", icon: "🥤", slug: "Drinks" },
  { label: "Desserts", icon: "🍨", slug: "Dessert" },
  { label: "Combo Meals", icon: "🍱", slug: "Combo" }
];

const howItWorks = [
  {
    step: "01",
    icon: <Utensils size={20} />,
    title: "Browse the Menu",
    desc: "Explore today's canteen offerings. Filter by category, search for your favourite dish.",
    accent: false
  },
  {
    step: "02",
    icon: <ShoppingBag size={20} />,
    title: "Place Your Order",
    desc: "Add items to your cart and confirm your order in seconds. No cash needed at the counter.",
    accent: true
  },
  {
    step: "03",
    icon: <Ticket size={20} />,
    title: "Get Your Token",
    desc: "Receive a unique order token instantly. Show it at the counter and collect your food — no queue!",
    accent: false
  }
];

const benefits = [
  { icon: <Zap size={18} />, title: "Skip the Queue", desc: "Order ahead, collect instantly." },
  { icon: <Clock size={18} />, title: "Quick & Easy", desc: "Order in under 30 seconds." },
  { icon: <CheckCircle2 size={18} />, title: "Token System", desc: "Unique daily order tokens." },
  { icon: <ChefHat size={18} />, title: "Fresh Daily", desc: "Canteen-fresh food every day." }
];

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("search");
    navigate(`/menu?search=${encodeURIComponent(value || "")}`);
  };

  return (
    <div className="page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <ScrollText size={12} />
            GDC Dharamshala · Academic Session 2026–2027
          </div>

          <h1>
            Your Campus,<br />
            <span>Your Canteen.</span>
          </h1>

          <p className="hero-desc">
            Order your favourite campus snacks in seconds. Get your token, skip the queue,
            and collect your food when it's ready.
          </p>

          <div className="hero-ctas">
            <Link className="btn-primary" to="/menu">
              <Utensils size={17} /> Order Now
            </Link>
            <Link className="btn-secondary" to="/menu">
              Explore Menu <ArrowRight size={17} />
            </Link>
          </div>

          <div className="hero-stats">
            <span className="hero-stat"><Ticket size={14} /> Token-based ordering</span>
            <span className="hero-stat"><Zap size={14} /> Skip the queue</span>
            <span className="hero-stat"><CheckCircle2 size={14} /> Fresh canteen food</span>
          </div>
        </div>
      </section>

      {/* ── QUICK SEARCH ── */}
      <section className="content-section" style={{ padding: "2.5rem 0 0" }}>
        <form className="search-bar" onSubmit={handleSearch} style={{
          borderColor: "var(--line)",
          background: "var(--surface-strong)",
          color: "var(--text)",
          width: "min(680px, 100%)"
        }}>
          <Utensils size={18} style={{ color: "var(--muted)", flexShrink: 0, marginLeft: "0.25rem" }} />
          <input
            name="search"
            placeholder="Search samosa, maggi, chai, pizza…"
            style={{ color: "var(--text)" }}
          />
          <button type="submit" style={{ flexShrink: 0 }}>Search</button>
        </form>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="category-band" aria-label="Food categories">
        {categories.map((cat) => (
          <Link
            className="category-card"
            to={`/menu?category=${cat.slug}`}
            key={cat.slug}
            aria-label={cat.label}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">
              {cat.label}
              <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </section>

      {/* ── POPULAR ITEMS ── */}
      <section className="content-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Today's picks</p>
            <h2>Popular at the Canteen</h2>
          </div>
          <Link className="text-link" to="/menu">
            Full menu <ArrowRight size={15} />
          </Link>
        </div>
        <div className="food-grid">
          {fallbackFoods.slice(0, 3).map((food) => (
            <FoodCard food={food} key={food._id} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works">
        <div className="section-title">
          <div>
            <p className="eyebrow">Simple process</p>
            <h2>How QUICKBITE GDC Works</h2>
          </div>
        </div>
        <div className="how-steps">
          {howItWorks.map((step, i) => (
            <div className="how-step" key={step.step}>
              <div className={`how-step-num${step.accent ? " accent" : ""}`}>
                {step.icon}
              </div>
              <div>
                <p style={{ margin: "0 0 0.2rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Step {step.step}
                </p>
                <h3>{step.title}</h3>
              </div>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS BANNER ── */}
      <div className="info-banner">
        <div>
          <p className="eyebrow">Why QUICKBITE?</p>
          <h2>Smart Ordering for Smart Students</h2>
          <p>
            No more long queues. Order digitally, get a unique daily token, and collect your meal
            when it's ready — right from your phone.
          </p>
        </div>
        <div
          className="info-banner-icon"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                minWidth: 160
              }}
            >
              <span style={{ color: "#86efac" }}>{b.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{b.title}</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA STRIP ── */}
      <section
        className="content-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "2.5rem 2rem",
          borderRadius: "var(--radius)",
          border: "1.5px solid var(--line)",
          background: "var(--surface)",
          marginTop: "3rem"
        }}
      >
        <div>
          <p className="eyebrow">Hungry?</p>
          <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
            Browse today's full canteen menu
          </h2>
        </div>
        <Link className="btn" to="/menu" style={{ flexShrink: 0 }}>
          View Full Menu <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};

export default Home;
