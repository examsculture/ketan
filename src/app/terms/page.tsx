export default function TermsPage() {
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
        Terms and Conditions
      </h1>

      <p>
        Welcome to Exams Culture. By using our platform, you agree to the following
        terms and conditions. Please read them carefully.
      </p>

      <h2 style={styles.subheading}>1. Use of the Platform</h2>
      <p>
        Our website provides online test preparation for educational exams. You agree
        to use this platform only for lawful purposes and in a way that does not infringe
        the rights of others.
      </p>

      <h2 style={styles.subheading}>2. User Accounts</h2>
      <p>
        When you create an account, you are responsible for maintaining the confidentiality
        of your login credentials. You agree to provide accurate information and notify
        us of any unauthorized use of your account.
      </p>

      <h2 style={styles.subheading}>3. Test Content</h2>
      <p>
        All test questions and materials are provided for practice purposes only. While
        we strive for accuracy, we do not guarantee that all content is error-free.
      </p>

      <h2 style={styles.subheading}>4. Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, and logos, is the property
        of Exams Culture and protected by applicable copyright laws.
      </p>

      <h2 style={styles.subheading}>5. Limitation of Liability</h2>
      <p>
        Exams Culture will not be liable for any indirect or consequential damages arising
        from the use of our platform.
      </p>

      <h2 style={styles.subheading}>6. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms and conditions at any time. Changes will
        be effective when posted on this page.
      </p>

      <h2 style={styles.subheading}>7. Contact Us</h2>
      <p>
        If you have any questions about these terms, please contact us at:
      </p>
      <ul>
        <li>📞 +91 97265 82609</li>
        <li>📧 examsculture@gmail.com</li>
      </ul>
    </main>
  );
}

const styles = {
  subheading: {
    marginTop: "1.5rem",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
};
