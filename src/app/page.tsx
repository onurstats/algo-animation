import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const featuredProblems = [
  { title: "Two Sum", difficulty: "Easy" as const, slug: "two-sum", tags: ["Array", "Hash Map"] },
  { title: "Valid Parentheses", difficulty: "Easy" as const, slug: "valid-parentheses", tags: ["String", "Stack"] },
  { title: "Binary Search", difficulty: "Easy" as const, slug: "binary-search", tags: ["Array", "Binary Search"] },
  { title: "Reverse Linked List", difficulty: "Easy" as const, slug: "reverse-linked-list", tags: ["Linked List"] },
  { title: "Invert Binary Tree", difficulty: "Easy" as const, slug: "invert-binary-tree", tags: ["Tree", "DFS"] },
  { title: "Maximum Subarray", difficulty: "Medium" as const, slug: "maximum-subarray", tags: ["Array", "DP"] },
];

export default function Home() {
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
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            Featured Problems
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProblems.map((problem) => (
              <Link key={problem.slug} href={`/problems/${problem.slug}`}>
                <Card interactive className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">
                      {problem.title}
                    </h3>
                    <Badge difficulty={problem.difficulty} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-elevated px-2 py-0.5 text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
