"use client";
import Link from "next/link";

export default function NMMSPage() {
  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EC4899", // Pink
    "#8B5CF6", // Violet
    "#EF4444", // Red
    "#14B8A6", // Teal
    "#F97316", // Orange
    "#6366F1", // Indigo
    "#22C55E", // Lime
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
