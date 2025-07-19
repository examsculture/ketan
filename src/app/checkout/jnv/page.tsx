"use client";
import { useState } from "react";

export default function JNVCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payment/start", {
        method: "POST",
        body: JSON.stringify({
          category: "jnv", // IMPORTANT: category must be 'jnv'
        }),
      });

      if (!res.ok) throw new Error("Failed to prepare payment");

      const data = await res.json();
      if (!data.hash || !data.txnid || !data.key) {
        throw new Error("Payment details incomplete");
      }

      // Dynamically create a form and submit
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment";

      const fields: Record<string, string> = {
        key: data.key,
        txnid: data.txnid,
        amount: data.amount,
        productinfo: data.productinfo,
        firstname: "Customer",
        email: "customer@example.com",
        phone: "9999999999",
        surl: process.env.NEXT_PUBLIC_PAYU_SUCCESS_URL || "http://localhost:3000/payment-success",
        furl: process.env.NEXT_PUBLIC_PAYU_FAILURE_URL || "http://localhost:3000/payment-failure",
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
    <main style={styles.container}>
      <h1>Subscribe to JNV</h1>
      <p>Unlock all JNV tests for 30 days.</p>
      {error && <p style={styles.error}>{error}</p>}
      <button
        onClick={handlePayment}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Preparing Payment..." : "Pay ₹26"}
      </button>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center" as const,
  },
  error: {
    color: "#dc2626",
    marginTop: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1.1rem",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
