export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen max-w-md mx-auto px-6 py-12">
      {children}
    </main>
  );
}