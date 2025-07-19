export default function DisclaimerPage() {
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
        Disclaimer
      </h1>

      <p>
        The information provided by Exams Culture ("we," "us," or "our") on this website
        is for general informational and educational purposes only. All information is
        provided in good faith; however, we make no representation or warranty of any kind,
        express or implied, regarding the accuracy, adequacy, validity, reliability,
        availability, or completeness of any information on the site.
      </p>

      <h2 style={styles.subheading}>1. No Professional Advice</h2>
      <p>
        The content available on our platform is for educational practice only and does not
        constitute professional advice. You should consult appropriate professionals before
        making any decisions based on this information.
      </p>

      <h2 style={styles.subheading}>2. External Links Disclaimer</h2>
      <p>
        This website may contain links to other websites or content belonging to or originating
        from third parties. We do not investigate, monitor, or check such external links for
        accuracy or completeness, and we are not responsible for any information contained
        in any third-party websites.
      </p>

      <h2 style={styles.subheading}>3. Errors and Omissions Disclaimer</h2>
      <p>
        While we strive to ensure the information on this website is current and correct,
        there may be errors, inaccuracies, or omissions. We reserve the right to make changes
        or updates to the content at any time without prior notice.
      </p>

      <h2 style={styles.subheading}>4. Fair Use Disclaimer</h2>
      <p>
        We may use copyrighted material that has not always been specifically authorized by
        the copyright owner. We make such material available for educational purposes and
        believe this constitutes "fair use."
      </p>

      <h2 style={styles.subheading}>5. Limitation of Liability</h2>
      <p>
        Under no circumstances shall Exams Culture be liable for any loss or damage of any
        kind incurred as a result of the use of this website or reliance on any information
        provided here.
      </p>

      <h2 style={styles.subheading}>6. Contact Us</h2>
      <p>
        If you have any questions about this disclaimer, you can contact us:
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
