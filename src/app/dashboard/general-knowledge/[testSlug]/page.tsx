"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function GKTestPage() {
  const { testSlug } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const checkSubscriptionAndFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "general-knowledge")
        .lte("start_date", new Date().toISOString())
        .gte("end_date", new Date().toISOString())
        .single();

      if (error || !data) {
        router.push("/checkout/general-knowledge");
      } else {
        await fetchQuestions();
      }
    };

    const fetchQuestions = async () => {
      const tableName = `general_knowledge_${testSlug?.toString().replace("-", "_")}_questions`;
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("id");

      if (error) {
        console.error(error);
      } else {
        setQuestions((data || []).sort(() => Math.random() - 0.5));
      }
      setLoading(false);
    };

    checkSubscriptionAndFetch();
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
      if (answers[q.id] === q.correct_option) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1rem",
        color: "#1e293b",
        textAlign: "center"
      }}>
        General Knowledge {testSlug?.toString().replace("-", " ").toUpperCase()}
      </h1>
      {questions.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No questions found.
        </p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q, index) => (
            <div key={q.id} style={{
              marginBottom: "1.5rem",
              background: "#fff",
              border: "1px solid #e2e8f0",
              padding: "1rem",
              borderRadius: "8px",
            }}>
              <p style={{
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#0f172a",
              }}>
                {index + 1}. {q.question}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["A", "B", "C", "D"].map((opt) => {
                  const isCorrect = opt === q.correct_option;
                  const isSelected = answers[q.id] === opt;
                  return (
                    <label
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                        color: submitted && isCorrect
                          ? "#16a34a"
                          : submitted && isSelected && !isCorrect
                          ? "#dc2626"
                          : "#334155",
                        fontWeight: submitted && (isCorrect || isSelected) ? 600 : undefined,
                        textDecoration:
                          submitted && isSelected && !isCorrect ? "line-through" : undefined,
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
            <button
              type="submit"
              style={{
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
              }}
            >
              ✅ Submit Answers
            </button>
          ) : (
            <p style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginTop: "1rem",
              textAlign: "center",
              color: "#16a34a",
            }}>
              🎉 You scored <strong>{score}</strong> out of {questions.length}
            </p>
          )}
        </form>
      )}
    </main>
  );
}
