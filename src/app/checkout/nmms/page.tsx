"use client";
import { useEffect, useState } from "react";

export default function NMMSCheckout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await fetch("/api/payment/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // હવે txnid મોકલવાની જરૂર નથી
            firstname: "Customer",
            email: "customer@example.com",
            phone: "9999999999",
            category: "nmms",
          }),
        });

        if (!res.ok) throw new Error("Failed to prepare payment");

        const data = await res.json();
        setPaymentData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    createPayment();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Preparing payment...</p>;
  }

  if (error) {
    return <p style={styles.loading}>Error: {error}</p>;
  }

  return (
    <main style={styles.container}>
      <h1>Subscribe to NMMS</h1>
      <p>Unlock all NMMS tests for 30 days.</p>
      <form
        method="POST"
        action="https://test.payu.in/_payment"
        style={{ marginTop: "1rem" }}
      >
        <input type="hidden" name="key" value={paymentData.key} />
        <input type="hidden" name="txnid" value={paymentData.txnid} />
        <input type="hidden" name="amount" value={paymentData.amount} />
        <input type="hidden" name="productinfo" value={paymentData.productinfo} />
        <input type="hidden" name="firstname" value={paymentData.firstname} />
        <input type="hidden" name="email" value={paymentData.email} />
        <input type="hidden" name="phone" value={paymentData.phone} />
        <input type="hidden" name="surl" value={paymentData.surl} />
        <input type="hidden" name="furl" value={paymentData.furl} />
        <input type="hidden" name="hash" value={paymentData.hash} />
        <input type="hidden" name="service_provider" value="payu_paisa" />
        <button type="submit" style={styles.button}>Pay ₹{paymentData.amount}</button>
      </form>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center" as const,
  },
  loading: {
    textAlign: "center" as const,
    marginTop: "2rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1.1rem",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
