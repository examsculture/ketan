"use client";
import { FaGraduationCap, FaBookOpen, FaBrain, FaMedal, FaLightbulb,FaQuestionCircle } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import Footer from "../components/Footer";

export default function Home() {
  const exams = [
    { name: "NMMS", slug: "nmms", color: "#3B82F6", icon: <FaMedal /> },
    { name: "Gyan Sadhan", slug: "gyan-sadhan", color: "#10B981", icon: <FaBrain /> },
    { name: "CET", slug: "cet", color: "#F59E0B", icon: <FaLightbulb /> },
    { name: "PSE", slug: "pse", color: "#EC4899", icon: <FaQuestionCircle /> },
    { name: "JNV", slug: "jnv", color: "#8B5CF6", icon: <FaGraduationCap /> },
    { name: "General Knowledge", slug: "general-knowledge", color: "#14B8A6", icon: <FaBookOpen /> },
  ];

  return (
    <>
      <main style={styles.container}>
        <h1 style={styles.heading}>
          <FaGraduationCap style={{ marginRight: "0.5rem" }} />
          Exams Culture
        </h1>
        <p style={styles.subheading}>
          Select an exam to start practicing and tracking your progress.
        </p>
        <div style={styles.buttonRow}>
          <a href="/register">
            <button style={styles.registerButton}>Register</button>
          </a>
          <a href="/login">
            <button style={styles.loginButton}>Login</button>
          </a>
        </div>
        <div style={styles.grid}>
          {exams.map((exam) => (
            <div
              key={exam.slug}
              style={{
                ...styles.card,
                background: exam.color,
              }}
            >
              <div style={styles.icon}>{exam.icon}</div>
              <h2>{exam.name}</h2>
              
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    color: "#0f172a",
  },
  subheading: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#334155",
    textAlign: "center",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },
  registerButton: {
    padding: "0.75rem 1.5rem",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 500,
    cursor: "pointer",
  },
  loginButton: {
    padding: "0.75rem 1.5rem",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 500,
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
    width: "100%",
    maxWidth: "1000px",
  },
  card: {
    borderRadius: "16px",
    padding: "1.5rem",
    textDecoration: "none",
    color: "#fff",
    fontWeight: 500,
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  icon: {
    fontSize: "2rem",
    marginBottom: "0.75rem",
  },
};
