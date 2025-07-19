export default function FAQPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
        Frequently Asked Questions (FAQ)
      </h1>

      <h2 style={styles.question}>1. What is Exams Culture?</h2>
      <p>
        Exams Culture is an online platform offering practice tests for various competitive
        exams, including NMMS, CET, and more. You can register, attempt tests, and track
        your progress.
      </p>

      <h2 style={styles.question}>2. How do I create an account?</h2>
      <p>
        Click the "Register" button on the homepage and fill in your name, email, and
        password to create a free account.
      </p>

      <h2 style={styles.question}>3. Is there any fee to take the tests?</h2>
      <p>
        Many tests are free to attempt. If any premium tests are introduced in the future,
        pricing and payment details will be clearly displayed before you purchase.
      </p>

      <h2 style={styles.question}>4. How are my scores calculated?</h2>
      <p>
        After you submit a test, your answers are automatically checked against the correct
        answers stored in our system. You will see your total score and detailed feedback.
      </p>

      <h2 style={styles.question}>5. Can I retake a test?</h2>
      <p>
        Yes, you can retake any test as many times as you like to improve your score and
        build confidence.
      </p>

      <h2 style={styles.question}>6. How can I contact support?</h2>
      <p>
        You can reach us anytime using the contact details below:
      </p>
      <ul>
        <li>📞 +91 97265 82609</li>
        <li>📧 examsculture@gmail.com</li>
      </ul>

      <h2 style={styles.question}>7. Is my personal information safe?</h2>
      <p>
        Yes. We respect your privacy and follow strict data protection policies. Please
        read our Privacy Policy for details.
      </p>
      <h2 style={styles.question}>8. Is my payment secure?</h2>
<p>
  Yes. We use PayU as our payment gateway, which is 100% secure and trusted by millions of users in India.
  All transactions are encrypted and processed safely. We never store your payment details on our servers.
</p>

    </main>
  );
}


const styles = {
  question: {
    marginTop: "1.5rem",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
};
