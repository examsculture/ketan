"use client";
import Link from "next/link";
import { FaBookOpen, FaTrophy, FaChartLine, FaClipboardCheck } from "react-icons/fa";

export default function ServicesPage() {
  const services = [
    {
      name: "Online Tests",
      description: "Practice NMMS, Gyan Sadhana, CET, PSE, and JNV exams online.",
      icon: <FaBookOpen />,
      color: "#3B82F6",
      link: "/dashboard",
    },
    {
      name: "Best Questions Practice",
      description: "Attempt curated top-quality questions and improve daily.",
      icon: <FaClipboardCheck />,
      color: "#10B981",
      link: "/dashboard/general-knowledge",
    },
    {
      name: "Leaderboard",
      description: "Compare your score with other students in real time.",
      icon: <FaTrophy />,
      color: "#F59E0B",
      link: "/dashboard/leaderboard",
    },
    {
      name: "Progress Card",
      description: "Track your progress and see detailed analytics.",
      icon: <FaChartLine />,
      color: "#EC4899",
      link: "/dashboard/profile",
    },
  ];

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Our Services</h1>
      <p style={styles.subtext}>
        Discover everything we offer to help you succeed.
      </p>
      <div style={styles.grid}>
        {services.map((service) => (
          <Link
            key={service.name}
            href={service.link}
            style={{
              ...styles.card,
              background: service.color,
            }}
          >
            <div style={styles.icon}>{service.icon}</div>
            <h2 style={styles.cardTitle}>{service.name}</h2>
            <p style={styles.cardDescription}>{service.description}</p>
            <button style={styles.button}>Explore</button>
          </Link>
        ))}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: "#0f172a",
  },
  subtext: {
    fontSize: "1rem",
    color: "#475569",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    borderRadius: "12px",
    padding: "1.5rem",
    textDecoration: "none",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  icon: {
    fontSize: "2rem",
    marginBottom: "0.75rem",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: 600,
    margin: "0.5rem 0",
  },
  cardDescription: {
    fontSize: "0.95rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    background: "#ffffff33",
    color: "#fff",
    border: "1px solid #ffffff55",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background 0.3s",
  },
};
