import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/lib/problems/register";
import { getProblemBySlug, getAllProblems } from "@/lib/problems/registry";
import { ProblemPageClient } from "./ProblemPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const mod = getProblemBySlug(slug);
  if (!mod) return { title: "Not Found" };
  return {
    title: `${mod.problem.title} — AlgoAnimation`,
    description: mod.problem.description,
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const mod = getProblemBySlug(slug);
  if (!mod) notFound();

  const initialSteps = mod.generateSteps(mod.problem.defaultInput);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <ProblemPageClient
          problem={mod.problem}
          initialSteps={initialSteps}
        />
      </main>
      <Footer />
    </div>
  );
}
