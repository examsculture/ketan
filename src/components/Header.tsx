"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Exams Culture</h1>

      {/* Hamburger icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={styles.hamburger}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Navigation menu */}
      <nav
        style={{
          ...styles.nav,
          ...(menuOpen ? styles.navOpen : {}),
        }}
      >
        {/* Show Home only outside dashboard */}
        {!isDashboard && (
          <Link href="/" style={styles.navLink} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        )}
        <Link href="/dashboard" style={styles.navLink} onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href="/dashboard/leaderboard" style={styles.link}>
          🏆 Leaderboard
        </Link>
        <Link href="/dashboard/profile" style={styles.navLink} onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  hamburger: {
    display: "none",
    fontSize: "1.8rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  navOpen: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#2563eb",
    flexDirection: "column",
    padding: "1rem 0",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
  },
};
