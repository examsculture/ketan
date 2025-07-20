// src/app/payment-failure/page.tsx

export default function FailurePage() {
  return (
    <main
      style={{
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
      }}
    >
      <h1 style={{ color: "#dc2626", fontSize: "2rem" }}>❌ Payment Failed!</h1>
      <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
        Please try again or contact support.
      </p>
    </main>
  );
}
