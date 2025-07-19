"use client";
import { useState } from "react";

export default function PSECheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // તમે ઇચ્છો તો અહીં યુઝર ડેટા પણ state માં રાખી શકો છો
  const customer = {
    firstname: "Customer",
    email: "customer@example.com",
    phone: "9999999999",
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payment/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: "pse",
          firstname: customer.firstname,
          email: customer.email,
          phone: customer.phone,
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
        service_provider: "payu_paisa",
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
      <h1>Subscribe to PSE</h1>
      <p>Unlock all PSE tests for 30 days.</p>
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
