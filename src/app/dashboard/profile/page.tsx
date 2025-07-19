"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaMedal, FaRegClock, FaCheckCircle } from "react-icons/fa";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [examResults, setExamResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.push("/login");
        return;
      }
      setUser(data.session.user);

      const { data: subs } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", data.session.user.id);

      const { data: results } = await supabase
        .from("exam_results")
        .select("*")
        .eq("user_id", data.session.user.id);

      setSubscriptions(subs || []);
      setExamResults(results || []);
      setLoading(false);
    };

    loadData();
  }, [router]);

  if (loading) {
    return <p style={styles.loading}>Loading your profile...</p>;
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>👤 Your Profile</h1>
      <p style={styles.subtext}>Welcome, {user?.email}</p>

      {/* Subscriptions */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🪪 Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <p style={styles.textMuted}>You have no active subscriptions.</p>
        ) : (
          subscriptions.map((sub) => {
            const daysLeft =
              Math.ceil(
                (new Date(sub.end_date).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              ) || 0;

            return (
              <div key={sub.id} style={styles.subscriptionCard}>
                <strong>{sub.category.toUpperCase()}</strong>
                <p>
                  Status:{" "}
                  {daysLeft > 0 ? (
                    <span style={{ color: "#16a34a" }}>
                      Active ({daysLeft} days left)
                    </span>
                  ) : (
                    <span style={{ color: "#dc2626" }}>Expired</span>
                  )}
                </p>
                <div style={styles.progressBarWrapper}>
                  <div
                    style={{
                      ...styles.progressBarFill,
                      width: `${Math.min(100, (30 - daysLeft) * (100 / 30))}%`,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Exam Results */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 Exam Results</h2>
        {examResults.length === 0 ? (
          <p style={styles.textMuted}>No exam results yet.</p>
        ) : (
          <div style={styles.resultsGrid}>
            {examResults.map((result) => (
              <div key={result.id} style={styles.resultCard}>
                <h3>{result.category.toUpperCase()}</h3>
                <p>
                  Score:{" "}
                  <strong>
                    {result.score}% {result.score >= 80 && "🏆"}
                  </strong>
                </p>
                <p>Date: {new Date(result.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Activity */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🕒 Recent Activity</h2>
        {subscriptions.length > 0 ? (
          subscriptions.slice(0, 3).map((sub) => (
            <p key={sub.id} style={styles.activityItem}>
              <FaCheckCircle color="#22c55e" /> Subscribed to{" "}
              <strong>{sub.category}</strong>
            </p>
          ))
        ) : (
          <p style={styles.textMuted}>No recent activity.</p>
        )}
      </section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtext: {
    textAlign: "center",
    color: "#475569",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  textMuted: {
    color: "#64748b",
  },
  subscriptionCard: {
    background: "#f1f5f9",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  progressBarWrapper: {
    width: "100%",
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "4px",
    marginTop: "0.5rem",
  },
  progressBarFill: {
    height: "100%",
    background: "#3b82f6",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  },
  resultCard: {
    background: "#f8fafc",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 5px rgba(0,0,0,0.05)",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#334155",
    marginBottom: "0.5rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
};
