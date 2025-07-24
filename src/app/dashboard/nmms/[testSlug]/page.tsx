"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";

export default function NMMSIndividualTestPage() {
  const { testSlug } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [savingResult, setSavingResult] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const validTables: Record<string, string> = {
    "test-1": "nmms_test1_questions",
    "test-2": "nmms_test2_questions",
    "test-3": "nmms_test3_questions",
    "test-4": "nmms_test4_questions",
    "test-5": "nmms_test5_questions",
    "test-6": "nmms_test6_questions",
    "test-7": "nmms_test7_questions",
    "test-8": "nmms_test8_questions",
    "test-9": "nmms_test9_questions",
    "test-10": "nmms_test10_questions",
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!testSlug) {
        console.error("No testSlug found");
        setLoading(false);
        return;
      }

      const tableName = validTables[testSlug.toString()];

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
        const shuffled = (data || []).sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [testSlug]);

  useEffect(() => {
    if (submitted || loading || !timerEnabled) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, loading, timerEnabled]);

  const handleOptionChange = (questionId: number, selected: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);

    setSavingResult(true);
    setSaveMessage("Saving your result...");

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setSaveMessage("Could not identify user. Score not saved.");
      setSavingResult(false);
      return;
    }

    const { error } = await supabase.from("exam_results").insert({
      user_id: userData.user.id,
      exam_name: `NMMS ${testSlug}`,
      score: correctCount,
      total_questions: questions.length,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error saving result:", error);
      setSaveMessage("❌ Could not save your result.");
    } else {
      setSaveMessage("✅ Your result has been saved!");
    }

    setSavingResult(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) {
    return <p style={styles.loading}>Loading questions...</p>;
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
        NMMS {testSlug?.toString().replace("-", " ").toUpperCase()}
      </h1>
  
      {!submitted && (
        <>
          {timerEnabled ? (
            <p style={styles.timer}>⏳ Time Left: {formatTime(timeLeft)}</p>
          ) : (
            <p style={styles.timerDisabled}>⏸️ Timer Disabled</p>
          )}
          <button
            onClick={() => setTimerEnabled((prev) => !prev)}
            style={styles.toggleButton}
          >
            {timerEnabled ? "Disable Timer" : "Enable Timer"}
          </button>
        </>
      )}

      {questions.length === 0 ? (
        <p style={styles.noQuestions}>No questions found for this test.</p>
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
            <>
              <p style={styles.score}>
                🎉 You scored <strong>{score}</strong> out of {questions.length}
              </p>
              {savingResult ? (
                <p style={styles.saving}>{saveMessage}</p>
              ) : (
                saveMessage && <p style={styles.saving}>{saveMessage}</p>
              )}
            </>
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
    background: "#f8fafc",
    borderRadius: "8px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: "#1e293b",
    textAlign: "center",
  },
  timer: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#dc2626",
    marginBottom: "0.5rem",
  },
  timerDisabled: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#475569",
    marginBottom: "0.5rem",
  },
  toggleButton: {
    display: "block",
    margin: "0 auto 1rem",
    padding: "0.5rem 1rem",
    background: "#64748b",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  questionBlock: {
    marginBottom: "1.5rem",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  questionText: {
    marginBottom: "0.75rem",
    fontWeight: 600,
    color: "#0f172a",
    fontSize: "1.1rem",
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
    cursor: "pointer",
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
    textAlign: "center",
    color: "#16a34a",
  },
  saving: {
    textAlign: "center",
    marginTop: "0.5rem",
    fontSize: "1rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
  noQuestions: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#475569",
  },
};
