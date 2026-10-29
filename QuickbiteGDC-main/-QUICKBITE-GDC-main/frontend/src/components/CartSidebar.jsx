import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const { items, subtotal, total, updateQuantity, removeItem } = useCart();

  return (
    <aside className="cart-sidebar" aria-label="Shopping cart">
      <div className="section-title compact">
        <span className="icon-badge">
          <ShoppingBag size={17} />
        </span>
        <div>
          <p className="eyebrow">Your Order</p>
          <h2 style={{ margin: 0, fontSize: "1.15rem" }}>
            {items.length === 0 ? "Empty cart" : `${items.length} item${items.length > 1 ? "s" : ""}`}
          </h2>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem 1rem",
            color: "var(--muted)",
            fontSize: "0.875rem"
          }}
        >
          <ShoppingBag size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.3 }} />
          <p style={{ margin: 0 }}>Add items from the menu to start your order</p>
        </div>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-row" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=200&q=60";
                }}
              />
              <div>
                <span className="cart-item-name">{item.name}</span>
                <span>₹{item.price} each</span>
                <div className="qty-control">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="qty-num">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    aria-label={`Remove ${item.name}`}
                    style={{ color: "#ef4444", borderColor: "#fecaca" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <span style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Subtotal</span>
        <strong>₹{subtotal}</strong>
        <span style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Total (est.)</span>
        <strong style={{ color: "var(--primary)" }}>₹{total}</strong>
      </div>

      <Link
        className="btn full"
        to="/order"
        aria-disabled={items.length === 0}
        style={items.length === 0 ? { opacity: 0.5, pointerEvents: "none" } : {}}
      >
        Proceed to Checkout <ArrowRight size={16} />
      </Link>
    </aside>
  );
};

export default CartSidebar;
