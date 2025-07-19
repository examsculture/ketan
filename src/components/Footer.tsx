"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        <Link href="/about" style={styles.link}>About Us</Link>
        <Link href="/services" style={styles.link}>Services</Link>
        <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
        <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
        <Link href="/refund" style={styles.link}>Refund Policy</Link>
        <Link href="/disclaimer" style={styles.link}>Disclaimer</Link>
        <Link href="/faq" style={styles.link}>FAQ</Link>
        <Link href="/contact" style={styles.link}>Contact Us</Link>
      </div>
      <p style={styles.paymentNote}>
        We use PayU Payment Gateway for secure transactions.
      </p>
      <p style={styles.copy}>
        &copy; {new Date().getFullYear()} Exams Culture. All rights reserved.
      </p>
    </footer>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    background: "#f1f5f9",
    color: "#334155",
    textAlign: "center",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "0.5rem",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
  paymentNote: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "0.5rem",
  },
  copy: {
    fontSize: "0.85rem",
    color: "#64748b",
  },
};
