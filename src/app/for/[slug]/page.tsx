interface PageProps {
  params: {
    slug: string;
  };
}

export default function RecipientPage({ params }: PageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          For: {params.slug}
        </h1>
        <p className="text-lg text-muted-foreground">
          This is the interactive experience for {params.slug}.
        </p>
      </div>
    </main>
  );
}
