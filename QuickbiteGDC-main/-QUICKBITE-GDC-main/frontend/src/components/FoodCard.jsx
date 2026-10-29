import { Plus, Star } from "lucide-react";
import React from "react";
import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE =
  "/canteenlogo.jpeg";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const isAvailable = food.available !== false;

  return (
    <article className="food-card" aria-label={food.name}>
      <div className="food-image-wrap">
        <img
          src={food.image || FALLBACK_IMAGE}
          alt={food.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        {food.rating && (
          <span className="rating-pill" aria-label={`Rating: ${food.rating}`}>
            <Star size={12} fill="currentColor" />
            {food.rating}
          </span>
        )}
        {!isAvailable && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span
              style={{
                padding: "0.35rem 0.8rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                fontSize: "0.78rem",
                fontWeight: 700
              }}
            >
              Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="food-card-body">
        <div>
          <p className="eyebrow">{food.category}</p>
          <h3>{food.name}</h3>
          {food.description && (
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem" }}>
              {food.description}
            </p>
          )}
        </div>

        <div className="food-card-bottom">
          <span className="food-price">₹{food.price}</span>
          <button
            className="icon-btn primary"
            type="button"
            onClick={() => addToCart(food)}
            aria-label={`Add ${food.name} to cart`}
            disabled={!isAvailable}
            style={!isAvailable ? { opacity: 0.4, cursor: "not-allowed" } : {}}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
