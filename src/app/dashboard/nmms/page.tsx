"use client";
import Link from "next/link";

export default function NMMSPage() {
  const colors = [
    "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6",
    "#EF4444", "#14B8A6", "#F97316", "#6366F1", "#22C55E",
  ];

  const tests = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    slug: `test-${i + 1}`,
    color: colors[i],
  }));

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>NMMS Tests</h1>
      <p style={styles.subtext}>
        Select a test below. Access requires an active NMMS subscription.
      </p>

      {/* ✅ Stylish ₹49 Info Box */}
      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>💡 Access All NMMS Tests for Just ₹49</h3>
        <p style={styles.infoText}>
          One-time payment gives you access to all NMMS mock tests for 30 days.
          Perfect for practice and self-evaluation.
          <br />
          <strong>Pay ₹49 once → Practice unlimited tests → Valid for 1 month</strong>
        </p>
      </div>

      <div style={styles.grid}>
        {tests.map((test) => (
          <Link
            key={test.slug}
            href={`/checkout/nmms?testSlug=${test.slug}`}
            style={{
              ...styles.button,
              background: test.color,
            }}
          >
            Start Test {test.number}
          </Link>
        ))}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  subtext: {
    fontSize: "1rem",
    color: "#475569",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  infoBox: {
    background: "linear-gradient(to right, #fef3c7, #fde68a)",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #facc15",
    maxWidth: "750px",
    marginBottom: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  infoTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#92400e",
    marginBottom: "0.75rem",
  },
  infoText: {
    fontSize: "1rem",
    color: "#78350f",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
    width: "100%",
    maxWidth: "600px",
  },
  button: {
    display: "block",
    padding: "1rem",
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};
