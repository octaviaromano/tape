export default function LoginPage() {
  return (
    <main className="min-h-screen max-w-md mx-auto px-6 py-12">
      <h2 className="text-xl mb-6">Sign in</h2>

      <input
        placeholder="Email"
        className="border p-3 w-full"
      />

      <button className="mt-6 border px-4 py-2 w-full">
        Send magic link
      </button>
    </main>
  );
}