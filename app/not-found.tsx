import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 pb-40 pt-44">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-light md:text-7xl">
          This page is <span className="font-semibold">not here.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-dim">The link may be old, or the project may have been renamed.</p>
        <Link href="/work/" className="mt-10 inline-block rounded-full bg-accent px-8 py-4 font-medium text-on-accent">Browse all work</Link>
      </div>
    </div>
  );
}
