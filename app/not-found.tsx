import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center px-6">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-sm text-muted">
          <span className="text-ok">$</span> cd this-page
        </p>
        <p className="mt-1 font-mono text-sm text-muted">cd: no such file or directory</p>
        <h1 className="mt-8 text-4xl font-semibold md:text-6xl">This page does not exist.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">The link may be old, or the project may have been renamed.</p>
        <Link href="/" className="mt-10 inline-flex h-11 items-center rounded-md bg-accent px-5 font-medium text-on-accent hover:brightness-110">Back to the portfolio</Link>
      </div>
    </main>
  );
}
