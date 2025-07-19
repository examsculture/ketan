export default function RefundPolicyPage() {
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
        Refund Policy
      </h1>

      <p>
        At Exams Culture, we are committed to providing the best possible experience
        for our users. Please read our refund policy carefully before making any purchase
        or subscribing to our services.
      </p>

      <h2 style={styles.subheading}>1. No Refunds for Digital Products</h2>
      <p>
        Since our products are digital and accessible immediately after purchase, we do not
        offer refunds once access to the tests or study materials has been granted.
      </p>

      <h2 style={styles.subheading}>2. Exceptional Circumstances</h2>
      <p>
        We may consider refund requests in the following cases:
      </p>
      <ul>
        <li>Technical issues that prevent access to the purchased content and cannot be resolved within a reasonable time.</li>
        <li>Duplicate payments for the same order.</li>
      </ul>

      <h2 style={styles.subheading}>3. Requesting a Refund</h2>
      <p>
        If you believe you are eligible for a refund, please contact us within 7 days
        of your purchase. Include your order details and a description of the issue.
      </p>

      <h2 style={styles.subheading}>4. Processing Time</h2>
      <p>
        Approved refunds will be processed within 5–7 business days and credited to
        your original payment method.
      </p>

      <h2 style={styles.subheading}>5. Contact Us</h2>
      <p>
        If you have any questions about our refund policy, you can reach us:
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
