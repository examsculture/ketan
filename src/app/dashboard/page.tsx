"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { MdOutlineQuiz } from "react-icons/md";
import { FaBrain, FaMedal, FaGraduationCap, FaLightbulb, FaBookOpen,FaQuestionCircle } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/login");
      } else {
        setUserEmail(data.session.user.email ?? null);
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  const exams = [
  { name: "NMMS", slug: "nmms", color: "#3B82F6", icon: <FaMedal /> },
  { name: "Gyan Sadhan", slug: "gyan-sadhan", color: "#10B981", icon: <FaBrain /> },
  { name: "CET", slug: "cet", color: "#F59E0B", icon: <FaLightbulb /> },
  { name: "PSE", slug: "pse", color: "#EC4899", icon: <FaQuestionCircle /> },
  { name: "JNV", slug: "jnv", color: "#8B5CF6", icon: <FaGraduationCap /> },
  { name: "General Knowledge", slug: "general-knowledge", color: "#22C55E", icon: <FaBookOpen /> },
];


  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <p style={styles.welcome}>
        {userEmail ? `Welcome, ${userEmail}!` : "Welcome!"}
      </p>
      <div style={styles.grid}>
        {exams.map((exam) => (
          <Link
            key={exam.slug}
            href={`/dashboard/${exam.slug}`}
            style={{
              ...styles.card,
              background: exam.color,
            }}
          >
            <div style={styles.icon}>{exam.icon}</div>
            <h2 style={styles.cardTitle}>{exam.name}</h2>
            <p style={styles.cardSubtitle}>Start {exam.name} Test</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: "#0f172a",
  },
  welcome: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#334155",
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
  cardTitle: {
    margin: "0.5rem 0",
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  cardSubtitle: {
    fontSize: "0.95rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
};
