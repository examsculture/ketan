"use client";
import {
  FaGraduationCap,
  FaRupeeSign,
  FaCheckCircle,
  FaRocket,
  FaUserPlus,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <main style={styles.container}>
        {/* Hero */}
        <section style={styles.hero}>
          <h1 style={styles.title}>
            <FaGraduationCap style={{ marginRight: "10px" }} />
            <span style={styles.gradientText}>Exams Culture</span>
          </h1>
          <p style={styles.subtitle}>
            ₹49/month – Access any one exam for 30 days
          </p>
          <p style={styles.description}>
            Prepare for NMMS, Gyan Sadhana, PSE, JNV, or General Knowledge with
            full access to one exam for a month. Renew monthly to continue.
          </p>

          {/* CTA Buttons */}
          <div style={styles.cta}>
            <a href="/register">
              <button style={styles.registerButton}>Register Now</button>
            </a>
            <a href="/login">
              <button style={styles.loginButton}>Login</button>
            </a>
          </div>
        </section>

        {/* Pricing Box */}
        <section style={styles.pricing}>
          <h2 style={styles.priceTag}>
            <FaRupeeSign />49 / Month (Per Exam)
          </h2>
          <p style={styles.priceNote}>
            Get 30-day access to one selected exam. Renew monthly as needed.
          </p>
        </section>

        {/* Why Choose Us */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Choose Exams Culture?</h2>
          <div style={styles.features}>
            {[
              { icon: <FaCheckCircle />, text: "Focused Exam Access" },
              { icon: <FaBookOpen />, text: "Mock Tests & Practice Sets" },
              { icon: <FaClock />, text: "Access Anytime, Anywhere" },
              { icon: <FaRocket />, text: "Track Progress & Rank" },
            ].map((item, index) => (
              <div key={index} style={styles.featureBox}>
                <span style={styles.icon}>{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <div style={styles.steps}>
            {[
              {
                icon: <FaUserPlus />,
                title: "Register",
                desc: "Create your student account",
              },
              {
                icon: <FaBookOpen />,
                title: "Choose Exam",
                desc: "Select NMMS, JNV, PSE, etc.",
              },
              {
                icon: <FaRupeeSign />,
                title: "Pay ₹49",
                desc: "Get access for 1 month (per exam)",
              },
              {
                icon: <FaRocket />,
                title: "Start Practice",
                desc: "Take tests & track progress",
              },
            ].map((step, index) => (
              <div key={index} style={styles.stepCard}>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: "2rem 1rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientText: {
    background: "linear-gradient(to right, #3b82f6, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#334155",
    fontWeight: 500,
    marginTop: "0.5rem",
  },
  description: {
    color: "#475569",
    fontSize: "1rem",
    marginTop: "1rem",
    maxWidth: "700px",
    marginInline: "auto",
  },
  pricing: {
    backgroundColor: "#fff7ed",
    border: "1px solid #f59e0b",
    padding: "0.75rem 1.25rem",
    textAlign: "center",
    borderRadius: "10px",
    marginBottom: "2rem",
    maxWidth: "300px",
    marginInline: "auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  priceTag: {
    fontSize: "1.5rem",
    color: "#d97706",
    fontWeight: 700,
  },
  priceNote: {
    fontSize: "0.9rem",
    color: "#78350f",
    marginTop: "0.25rem",
  },
  section: {
    marginBottom: "3rem",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    color: "#0f172a",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  featureBox: {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "default",
  },
  icon: {
    fontSize: "2rem",
    color: "#0ea5e9",
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  stepCard: {
    background: "#f9fafb",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    textAlign: "center",
    transition: "transform 0.3s ease",
    cursor: "default",
  },
  stepIcon: {
    fontSize: "2.4rem",
    color: "#6366f1",
    marginBottom: "0.5rem",
  },
  cta: {
    textAlign: "center",
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  registerButton: {
    padding: "0.8rem 1.6rem",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  loginButton: {
    padding: "0.8rem 1.6rem",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};
