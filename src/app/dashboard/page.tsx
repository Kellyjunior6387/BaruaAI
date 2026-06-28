import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Creator Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your experiences, view responses, and track open/share events.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 text-sm text-primary hover:underline"
        >
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
