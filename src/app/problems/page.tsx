import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProblemCard } from "@/components/problem/ProblemCard";
import "@/lib/problems/register";
import { getAllProblems } from "@/lib/problems/registry";

export const metadata = {
  title: "Problems — AlgoAnimation",
  description: "Browse algorithm problems with step-by-step animations.",
};

export default function ProblemsPage() {
  const problems = getAllProblems();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Problems</h1>
          <p className="mt-1 text-text-secondary">
            Step-by-step animated solutions to classic algorithm problems.
          </p>
        </div>

        {problems.length === 0 ? (
          <p className="text-text-muted">No problems yet. Check back soon!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
