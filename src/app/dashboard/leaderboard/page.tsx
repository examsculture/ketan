"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("exam_results")
        .select("user_id, score")
        .order("score", { ascending: false });

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else {
        // Group by user_id & get highest score per user
        const grouped: Record<string, number> = {};
        data.forEach((result) => {
          if (!grouped[result.user_id] || result.score > grouped[result.user_id]) {
            grouped[result.user_id] = result.score;
          }
        });

        // Convert to array
        const leaderboard = Object.entries(grouped)
          .map(([userId, score]) => ({ userId, score }))
          .sort((a, b) => b.score - a.score);

        setLeaders(leaderboard);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading leaderboard...</p>;
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>🏆 Top Performers</h1>
      {leaders.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <ul style={styles.list}>
          {leaders.map((leader, index) => (
            <li
              key={leader.userId}
              style={{
                ...styles.item,
                background: index === 0 ? "#facc15" : "#f1f5f9",
              }}
            >
              <span style={styles.rank}>#{index + 1}</span>
              <span>User: {leader.userId.slice(0, 8)}...</span>
              <strong>Score: {leader.score}</strong>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "1rem",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    marginBottom: "0.5rem",
  },
  rank: {
    fontWeight: 600,
  },
};
