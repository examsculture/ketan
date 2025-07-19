export default function PaymentFailurePage() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>❌ Payment Failed</h1>
      <p style={styles.text}>
        Unfortunately, your payment did not go through.
      </p>
      <a href="/" style={styles.link}>Try Again</a>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center" as const,
  },
  title: {
    color: "#dc2626",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
};
