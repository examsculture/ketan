export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={styles.main}>
      {children}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    flex: 1,
    padding: "2rem",
  },
};
