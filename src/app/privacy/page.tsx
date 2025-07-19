export default function PrivacyPolicyPage() {
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
        Privacy Policy
      </h1>

      <p>
        At Exams Culture, we are committed to protecting your personal information and
        your right to privacy. This policy explains how we collect, use, and safeguard
        your data.
      </p>

      <h2 style={styles.subheading}>1. Information We Collect</h2>
      <p>
        We collect personal information you provide when registering on our platform,
        such as your name, email address, mobile number, and any data related to your
        test performance.
      </p>

      <h2 style={styles.subheading}>2. How We Use Your Information</h2>
      <p>
        We use your information to:
      </p>
      <ul>
        <li>Create and manage your user account</li>
        <li>Provide access to online tests</li>
        <li>Communicate important updates</li>
        <li>Improve our services</li>
      </ul>

      <h2 style={styles.subheading}>3. Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal information. We may share your data with
        trusted service providers who help us operate our platform, as required by law,
        or to protect our rights.
      </p>

      <h2 style={styles.subheading}>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your
        information. However, no online service is 100% secure.
      </p>

      <h2 style={styles.subheading}>5. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information.
        Please contact us to make such requests.
      </p>

      <h2 style={styles.subheading}>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on
        this page with an updated revision date.
      </p>

      <h2 style={styles.subheading}>7. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, you can contact us:
      </p>
      <ul>
        <li>📞 +91 97265 82609</li>
        <li>📧 examsculture@gmail.com</li>
        <li>📍 Patel Baldevbhai, Patel Vaas, Mokasan, Jasalpur, Gujarat 382715</li>
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
