

"use client";
import Link from "next/link";

export default function GyanSadhanPage() {
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
      <h1 style={styles.heading}>Gyan Sadhan Tests</h1>
      <p style={styles.subtext}>
        Select a test below. You need an active Gyan Sadhan subscription to access.
      </p>
      <div style={styles.grid}>
        {tests.map((test) => (
          <Link
            key={test.slug}
            href={`/dashboard/gyan-sadhan/${test.slug}`}
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
