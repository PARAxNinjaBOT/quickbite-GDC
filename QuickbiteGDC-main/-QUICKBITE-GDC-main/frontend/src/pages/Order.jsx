import {
  CheckCircle2,
  CreditCard,
  Minus,
  PackageCheck,
  Plus,
  Printer,
  ShoppingBag,
  Ticket,
  Trash2
} from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const initialAddress = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  state: "Himachal Pradesh",
  pincode: ""
};

const FIELD_LABELS = {
  fullName: "Full Name",
  phone: "Phone Number",
  line1: "Room / Department",
  city: "City",
  state: "State",
  pincode: "Pincode"
};

const Order = () => {
  const { items, subtotal, deliveryFee, taxes, total, updateQuantity, removeItem, clearCart } =
    useCart();
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("Cash at Counter");
  const [placing, setPlacing] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }
    setPlacing(true);
    try {
      const payload = {
        items: items.map((item) => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: total,
        address,
        paymentMethod
      };
      const { data } = await api.post("/orders", payload);
      setLatestOrder(data);
      clearCart();
      toast.success("Order placed successfully! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  /* ── ORDER SUCCESS STATE ── */
  if (latestOrder) {
    const token = latestOrder.token || latestOrder._id;
    const status = latestOrder.status || "Placed";
    return (
      <div className="page" style={{ maxWidth: 640, textAlign: "center" }}>
        <div
          style={{
            padding: "2.5rem",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            background: "var(--surface)",
            boxShadow: "var(--shadow)"
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "var(--primary)"
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h1
            style={{
              margin: "0 0 0.4rem",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.75rem"
            }}
          >
            Order Confirmed!
          </h1>
          <p style={{ color: "var(--muted)", marginBottom: "1.75rem" }}>
            Your order has been placed. Collect when your token is called.
          </p>

          <div className="token-display">
            <span className="token-label"><Ticket size={13} /> Your Order Token</span>
            <p className="token-number">{token}</p>
            <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              Show this token at the canteen counter
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              margin: "1.25rem 0",
              padding: "0.65rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--primary-light)",
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: "0.9rem"
            }}
          >
            <PackageCheck size={17} /> Status: <span style={{ textTransform: "capitalize" }}>{status}</span>
          </div>

          {latestOrder.items && (
            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 0.6rem", fontWeight: 700, fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Order Summary
              </p>
              {latestOrder.items.map((item) => (
                <div
                  key={item.foodId || item._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: "0.9rem"
                  }}
                >
                  <span>{item.name} × {item.quantity}</span>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.75rem 0 0",
                  fontWeight: 700,
                  color: "var(--primary)"
                }}
              >
                <span>Total Paid</span>
                <strong>₹{latestOrder.totalAmount}</strong>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link className="btn full" to="/menu">
              <ShoppingBag size={16} /> Order More
            </Link>
            <button
              className="btn ghost full"
              type="button"
              onClick={() => window.print()}
              aria-label="Print token"
            >
              <Printer size={16} /> Print Token
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── CHECKOUT FORM ── */
  return (
    <div className="page order-grid">
      {/* Left: Cart Items + Bill */}
      <section className="panel">
        <div className="section-title compact" style={{ marginBottom: "1rem" }}>
          <span className="icon-badge"><PackageCheck size={17} /></span>
          <div>
            <p className="eyebrow">Checkout</p>
            <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Your Cart</h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={36} />
            <p style={{ margin: 0, fontWeight: 600 }}>Your cart is empty</p>
            <Link className="btn" to="/menu">Browse Menu</Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div className="checkout-row" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=200&q=60";
                  }}
                />
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>{item.name}</strong>
                  <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>₹{item.price} each</span>
                </div>
                <div className="qty-control">
                  <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    <Minus size={13} />
                  </button>
                  <span className="qty-num">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <Plus size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    style={{ color: "#ef4444", borderColor: "#fecaca" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}

            <div className="bill-box">
              <span style={{ color: "var(--muted)" }}>Subtotal</span>
              <strong>₹{subtotal}</strong>
              <span style={{ color: "var(--muted)" }}>Service fee</span>
              <strong>₹{deliveryFee}</strong>
              <span style={{ color: "var(--muted)" }}>Tax (5%)</span>
              <strong>₹{taxes}</strong>
              <span style={{ fontWeight: 700, color: "var(--primary)", borderTop: "1px solid var(--line)", paddingTop: "0.5rem" }}>
                Total
              </span>
              <strong style={{ color: "var(--primary)", borderTop: "1px solid var(--line)", paddingTop: "0.5rem" }}>
                ₹{total}
              </strong>
            </div>
          </>
        )}
      </section>

      {/* Right: Delivery details + Payment */}
      <form className="panel form-panel" onSubmit={placeOrder}>
        <div className="section-title compact" style={{ marginBottom: "0.5rem" }}>
          <span className="icon-badge"><Ticket size={17} /></span>
          <div>
            <p className="eyebrow">Collection details</p>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Your Information</h2>
          </div>
        </div>

        <div className="form-grid">
          {Object.entries(address).map(([key, value]) => (
            <label key={key} style={key === "line1" || key === "state" ? { gridColumn: "1 / -1" } : {}}>
              {FIELD_LABELS[key] || key}
              <input name={key} value={value} onChange={handleChange} required />
            </label>
          ))}
        </div>

        <div className="payment-box">
          <h3><CreditCard size={16} /> Payment Method</h3>
          {["Cash at Counter", "UPI"].map((method) => (
            <label className="radio-row" key={method}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{method}</span>
              {method === "Cash at Counter" && (
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--muted)" }}>
                  Pay at canteen
                </span>
              )}
            </label>
          ))}
        </div>

        <button className="btn full accent" disabled={placing || items.length === 0} type="submit">
          {placing ? (
            <>
              <span
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 700ms linear infinite",
                  display: "inline-block"
                }}
              />
              Placing Order…
            </>
          ) : (
            <>
              <Ticket size={17} /> Place Order & Get Token
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Order;
