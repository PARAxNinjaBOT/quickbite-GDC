import React from "react";

const Loader = ({ label = "Loading…" }) => (
  <div className="loader-wrap" role="status" aria-live="polite" aria-label={label}>
    <span className="spinner" aria-hidden="true" />
    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{label}</span>
  </div>
);

export default Loader;
