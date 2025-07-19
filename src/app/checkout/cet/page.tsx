"use client";
import { useState } from "react";

export default function CETCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txnid: "txn_" + Math.random().toString(36).substr(2, 9),
          firstname: "Customer",
          email: "customer@example.com",
          phone: "9999999999",
          category: "cet",
        }),
      });

      if (!res.ok) throw new Error("Failed to prepare payment");

      const data = await res.json();
      if (!data.hash || !data.txnid || !data.key) {
        throw new Error("Payment details incomplete");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment";

      const fields = {
        key: data.key,
        txnid: data.txnid,
        amount: data.amount,
        productinfo: data.productinfo,
        firstname: data.firstname,
        email: data.email,
        phone: data.phone,
        surl: data.surl,
        furl: data.furl,
        hash: data.hash,
      };

      for (const [name, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Subscribe to CET</h1>
      <p>Unlock all CET tests for 30 days.</p>
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1.1rem",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Preparing Payment..." : "Pay ₹26"}
      </button>
    </main>
  );
}
