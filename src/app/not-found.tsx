import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-lg text-text-secondary">Page not found</p>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </main>
    </div>
  );
}
