import { Search, UtensilsCrossed } from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import CartSidebar from "../components/CartSidebar";
import CategoryFilter from "../components/CategoryFilter";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import api from "../services/api";
import { fallbackFoods } from "../utils/sampleData";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/foods", { params: { search: query, category } });
        setFoods(data.length ? data : fallbackFoods);
      } catch {
        setFoods(fallbackFoods);
        toast.error("Could not reach the server – showing demo menu");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [query, category]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const categoryMatch = category === "All" || food.category === category;
      const queryMatch = food.name.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [foods, category, query]);

  return (
    <div className="page menu-layout">
      <section className="menu-main">
        <div className="section-title">
          <div>
            <p className="eyebrow">QUICKBITE GDC</p>
            <h1>Canteen Menu</h1>
          </div>
        </div>

        <label className="inline-search" htmlFor="menu-search" aria-label="Search food items">
          <Search size={17} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            id="menu-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search samosa, chai, pizza…"
          />
        </label>

        <CategoryFilter activeCategory={category} onChange={setCategory} />

        {loading ? (
          <Loader label="Loading today's menu…" />
        ) : filteredFoods.length === 0 ? (
          <div className="empty-state">
            <UtensilsCrossed size={40} />
            <p style={{ margin: 0, fontWeight: 600 }}>No items found</p>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              Try a different search or category filter
            </p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredFoods.map((food) => (
              <FoodCard food={food} key={food._id} />
            ))}
          </div>
        )}
      </section>

      <CartSidebar />
    </div>
  );
};

export default Menu;
