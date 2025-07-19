"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function GyanSadhanTestPage() {
  const { testSlug } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "gyan-sadhana")
        .lte("start_date", new Date().toISOString())
        .gte("end_date", new Date().toISOString())
        .single();

      if (error || !data) {
        router.push("/checkout/gyan-sadhana");
      } else {
        fetchQuestions();
      }
    };

    const fetchQuestions = async () => {
      if (!testSlug) {
        console.error("No testSlug found.");
        setLoading(false);
        return;
      }

      const validTables: Record<string, string> = {
        "test-1": "gyan_sadhan_test1_questions",
        "test-2": "gyan_sadhan_test2_questions",
        "test-3": "gyan_sadhan_test3_questions",
        "test-4": "gyan_sadhan_test4_questions",
        "test-5": "gyan_sadhan_test5_questions",
        "test-6": "gyan_sadhan_test6_questions",
        "test-7": "gyan_sadhan_test7_questions",
        "test-8": "gyan_sadhan_test8_questions",
        "test-9": "gyan_sadhan_test9_questions",
        "test-10": "gyan_sadhan_test10_questions",
      };

      const tableName = validTables[String(testSlug)];
      if (!tableName) {
        console.error(`Invalid testSlug: ${testSlug}`);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("id");

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions((data || []).sort(() => Math.random() - 0.5));
      }
      setLoading(false);
    };

    checkSubscription();
  }, [testSlug, router]);

  const handleOptionChange = (questionId: number, selected: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
        Gyan Sadhan{" "}
        {testSlug ? String(testSlug).replace("-", " ").toUpperCase() : ""}
      </h1>

      {questions.length === 0 ? (
        <p style={styles.noQuestions}>No questions found.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((q, index) => (
            <div key={q.id} style={styles.questionBlock}>
              <p style={styles.questionText}>
                {index + 1}. {q.question}
              </p>
              <div style={styles.options}>
                {["A", "B", "C", "D"].map((opt) => {
                  const isCorrect = opt === q.correct_option;
                  const isSelected = answers[q.id] === opt;
                  return (
                    <label
                      key={opt}
                      style={{
                        ...styles.optionLabel,
                        ...(submitted && isCorrect && {
                          color: "#16a34a",
                          fontWeight: "600",
                        }),
                        ...(submitted && isSelected && !isCorrect && {
                          color: "#dc2626",
                          fontWeight: "600",
                          textDecoration: "line-through",
                        }),
                      }}
                    >
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        value={opt}
                        checked={isSelected}
                        onChange={() => handleOptionChange(q.id, opt)}
                        disabled={submitted}
                      />
                      <span>{q[`option_${opt.toLowerCase()}`]}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button type="submit" style={styles.submitButton}>
              ✅ Submit Answers
            </button>
          ) : (
            <p style={styles.score}>
              🎉 You scored <strong>{score}</strong> out of {questions.length}
            </p>
          )}
        </form>
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: "#1e293b",
    textAlign: "center" as const,
  },
  questionBlock: {
    marginBottom: "1.5rem",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "1rem",
    borderRadius: "8px",
  },
  questionText: {
    marginBottom: "0.75rem",
    fontWeight: 600,
    color: "#0f172a",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
    color: "#334155",
  },
  submitButton: {
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  score: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginTop: "1rem",
    textAlign: "center" as const,
    color: "#16a34a",
  },
  loading: {
    textAlign: "center" as const,
    marginTop: "2rem",
  },
  noQuestions: {
    textAlign: "center" as const,
    marginTop: "2rem",
    color: "#475569",
  },
};
