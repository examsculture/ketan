export default function SuccessPage() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>🎉 Payment Successful</h1>
      <p style={styles.text}>
        Your subscription is now active. You can start your tests!
      </p>
      <a href="/" style={styles.link}>Go to Dashboard</a>
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center" as const,
  },
  title: {
    color: "#22c55e", // Green color
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
    fontSize: "1rem",
  },
};
