import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Exams Culture",
  description: "Online Exam Practice Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <ClientLayoutWrapper>
          <main style={styles.main}>{children}</main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    padding: 0,
  },
  main: {
    flex: 1,
  },
};
