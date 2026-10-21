import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-dvh max-w-xl place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">error 404 · 0 rows returned</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-fg">Page not found</h1>
        <Link href="/" className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-fg">
          Back to home
        </Link>
      </div>
    </main>
  );
}
