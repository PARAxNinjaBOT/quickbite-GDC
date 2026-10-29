import {
  ClipboardList,
  IndianRupee,
  Mail,
  Plus,
  RefreshCcw,
  Trash2,
  Utensils
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import api from "../services/api";
import { categories } from "../utils/sampleData";

const blankFood = {
  name: "",
  category: "Pizza",
  price: "",
  image: "",
  description: "",
  rating: 4.5
};

const ORDER_STATUSES = ["Placed", "Preparing", "Ready", "Collected", "Cancelled"];

const StatusBadge = ({ status }) => {
  const cls = status?.toLowerCase().replace(/\s+/g, "-") || "placed";
  return <span className={`status-badge ${cls}`}>{status}</span>;
};

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [foodForm, setFoodForm] = useState(blankFood);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const addLog = (msg) => {
    setLogs((prev) => [{ message: msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 15));
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [foodRes, orderRes, msgRes] = await Promise.all([
        api.get("/foods"),
        api.get("/orders"),
        api.get("/contact")
      ]);
      setFoods(foodRes.data);
      setOrders(orderRes.data);
      setMessages(msgRes.data);
      addLog("Dashboard refreshed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    return [
      { label: "Menu Items", value: foods.length, icon: <Utensils size={18} />, color: "#dcfce7" },
      { label: "Total Orders", value: orders.length, icon: <ClipboardList size={18} />, color: "#fff7ed" },
      { label: "Messages", value: messages.length, icon: <Mail size={18} />, color: "#eff6ff" },
      { label: "Revenue", value: `₹${revenue}`, icon: <IndianRupee size={18} />, color: "#fdf4ff" }
    ];
  }, [foods, orders, messages]);

  const submitFood = async (e) => {
    e.preventDefault();
    const payload = { ...foodForm, price: Number(foodForm.price), rating: Number(foodForm.rating) };
    try {
      if (editingId) {
        await api.put(`/foods/${editingId}`, payload);
        toast.success("Food item updated");
        addLog(`Updated: ${payload.name}`);
      } else {
        await api.post("/foods", payload);
        toast.success("Food item added");
        addLog(`Added: ${payload.name}`);
      }
      setFoodForm(blankFood);
      setEditingId(null);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save food item");
    }
  };

  const editFood = (food) => {
    setEditingId(food._id);
    setFoodForm(food);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteFood = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/foods/${id}`);
      toast.success(`"${name}" removed`);
      addLog(`Deleted: ${name}`);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const updateOrder = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      toast.success(`Order updated to "${status}"`);
      addLog(`Order …${id.slice(-6)} → ${status}`);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  if (loading) return <Loader label="Loading QUICKBITE GDC dashboard…" />;

  return (
    <div className="page admin-page">
      {/* Header */}
      <div className="section-title">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/gdc-logo.jpg"
            alt="Government College Dharamshala"
            style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)", flexShrink: 0 }}
          />
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.75rem" }}>
              QUICKBITE GDC Dashboard
            </h1>
          </div>
        </div>
        <button className="btn ghost" type="button" onClick={fetchAdminData}>
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      {/* Metric Cards */}
      <section className="metric-grid" aria-label="Dashboard metrics">
        {metrics.map((m) => (
          <article className="metric-card" key={m.label}>
            <div className="metric-icon" style={{ background: m.color }}>
              {m.icon}
            </div>
            <span>{m.label}</span>
            <strong>{m.value}</strong>
          </article>
        ))}
      </section>

      {/* Food Management */}
      <section className="admin-grid" style={{ marginBottom: "1.25rem" }}>
        {/* Add / Edit Form */}
        <form className="panel form-panel" onSubmit={submitFood}>
          <h2 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem" }}>
            {editingId ? "✏️ Update Food Item" : "➕ Add Food Item"}
          </h2>

          <label htmlFor="food-name">
            Item Name
            <input
              id="food-name"
              value={foodForm.name}
              onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
              placeholder="e.g. Masala Maggi"
              required
            />
          </label>

          <label htmlFor="food-category">
            Category
            <select
              id="food-category"
              value={foodForm.category}
              onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
            >
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <div className="form-grid">
            <label htmlFor="food-price">
              Price (₹)
              <input
                id="food-price"
                type="number"
                min="1"
                value={foodForm.price}
                onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                placeholder="e.g. 49"
                required
              />
            </label>
            <label htmlFor="food-rating">
              Rating (0–5)
              <input
                id="food-rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={foodForm.rating}
                onChange={(e) => setFoodForm({ ...foodForm, rating: e.target.value })}
                required
              />
            </label>
          </div>

          <label htmlFor="food-image">
            Image URL
            <input
              id="food-image"
              value={foodForm.image}
              onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
              placeholder="https://…"
              required
            />
          </label>

          <label htmlFor="food-desc">
            Description
            <textarea
              id="food-desc"
              rows="3"
              value={foodForm.description}
              onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
              placeholder="Short description of the item"
              required
            />
          </label>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button className="btn full" type="submit">
              <Plus size={15} /> {editingId ? "Save Changes" : "Add Item"}
            </button>
            {editingId && (
              <button
                className="btn ghost"
                type="button"
                onClick={() => { setFoodForm(blankFood); setEditingId(null); }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Menu Table */}
        <div className="panel table-panel">
          <h2 style={{ margin: "0 0 1rem", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem" }}>
            Menu Items ({foods.length})
          </h2>
          {foods.length === 0 ? (
            <div className="empty-state">
              <Utensils size={32} />
              <p style={{ margin: 0 }}>No items in the menu yet</p>
            </div>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td style={{ fontWeight: 600 }}>{food.name}</td>
                      <td>
                        <span className="status-badge placed" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                          {food.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>₹{food.price}</td>
                      <td>
                        <button type="button" onClick={() => editFood(food)}>Edit</button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => deleteFood(food._id, food.name)}
                          aria-label={`Delete ${food.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Orders & Logs */}
      <section className="admin-grid">
        {/* Orders Table */}
        <div className="panel table-panel">
          <h2 style={{ margin: "0 0 1rem", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem" }}>
            Orders ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <div className="empty-state">
              <ClipboardList size={32} />
              <p style={{ margin: 0 }}>No orders yet</p>
            </div>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Token / ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8rem" }}>
                        {order.token || `…${order._id.slice(-8)}`}
                      </td>
                      <td>{order.userId?.name || "Student"}</td>
                      <td style={{ fontWeight: 700 }}>₹{order.totalAmount}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrder(order._id, e.target.value)}
                          style={{ width: "auto", padding: "0.3rem 0.5rem", fontSize: "0.82rem" }}
                          aria-label={`Update status for order ${order._id}`}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Activity Log + Messages */}
        <div className="panel">
          <h2 style={{ margin: "0 0 1rem", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem" }}>
            Activity Log & Messages
          </h2>
          <div className="log-list">
            {logs.map((log) => (
              <p key={`${log.time}-${log.message}`}>
                <strong style={{ color: "var(--primary)", marginRight: "0.4rem" }}>{log.time}</strong>
                {log.message}
              </p>
            ))}
            {messages.length > 0 && (
              <>
                <p style={{ margin: "0.25rem 0", fontWeight: 700, fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Student Messages
                </p>
                {messages.map((msg) => (
                  <p key={msg._id}>
                    <strong style={{ color: "var(--accent)" }}>{msg.name}: </strong>
                    {msg.message}
                  </p>
                ))}
              </>
            )}
            {logs.length === 0 && messages.length === 0 && (
              <p style={{ color: "var(--muted)", textAlign: "center" }}>No activity yet</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
