import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About — AlgoAnimation",
  description: "About AlgoAnimation — an educational algorithm visualization platform.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground">About</h1>
        <div className="mt-6 flex flex-col gap-4 text-text-secondary">
          <p>
            <strong className="text-foreground">AlgoAnimation</strong> is an
            educational platform that brings LeetCode problems to life through
            step-by-step animated visualizations.
          </p>
          <p>
            Watch algorithms execute in real time — see data structures change,
            pointers move, and variables update — all synchronized with
            syntax-highlighted code, just like a debugger.
          </p>

          <h2 className="mt-4 text-xl font-semibold text-foreground">
            Tech Stack
          </h2>
          <ul className="list-inside list-disc space-y-1">
            <li>Next.js 16 (App Router, Turbopack)</li>
            <li>TypeScript (strict mode)</li>
            <li>Tailwind CSS v4</li>
            <li>Framer Motion (animations)</li>
            <li>Shiki (syntax highlighting)</li>
            <li>Zustand (state management)</li>
          </ul>

          <h2 className="mt-4 text-xl font-semibold text-foreground">
            How It Works
          </h2>
          <p>
            Each problem has a <strong className="text-foreground">step generator</strong> that
            pre-computes every step of the algorithm. The animation engine then
            plays these steps with synchronized code highlighting, variable
            inspection, and data structure visualization.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
