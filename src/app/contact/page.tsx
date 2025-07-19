export default function ContactPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
        Contact Us
      </h1>

      <p style={{ marginBottom: "1rem" }}>
        📞 <strong>Mobile:</strong>{" "}
        <a href="tel:+919726582609" style={{ color: "#2563eb", textDecoration: "none" }}>
          +91 97265 82609
        </a>
      </p>

      <p style={{ marginBottom: "1rem" }}>
        📧 <strong>Email:</strong>{" "}
        <a
          href="mailto:examsculture@gmail.com"
          style={{ color: "#2563eb", textDecoration: "none" }}
        >
          examsculture@gmail.com
        </a>
      </p>

      <p>
        📍 <strong>Address:</strong><br />
        Patel Baldevbhai,<br />
        Patel Vaas,<br />
        Mokasan, Jasalpur,<br />
        Gujarat - 382715
      </p>
    </main>
  );
}
