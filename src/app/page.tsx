import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProblemCard } from "@/components/problem/ProblemCard";
import { Button } from "@/components/ui/Button";
import "@/lib/problems/register";
import { getAllProblems } from "@/lib/problems/registry";

export default function Home() {
  const problems = getAllProblems();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            See the algorithm.
            <br />
            <span className="text-accent-blue">Understand the solution.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            Step-by-step animated visualizations of LeetCode problems. Watch
            algorithms come to life, understand every move, and master the
            patterns.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/problems">
              <Button size="lg">Browse Problems</Button>
            </Link>
            <a
              href="https://github.com/onurstats/algo-animation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                GitHub
              </Button>
            </a>
          </div>
        </section>

        {/* Featured Problems */}
        {problems.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-24">
            <h2 className="mb-8 text-2xl font-semibold text-foreground">
              Featured Problems
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problems.slice(0, 6).map((problem) => (
                <ProblemCard key={problem.slug} problem={problem} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
