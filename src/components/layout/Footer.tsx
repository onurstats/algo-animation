export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-text-muted">
          AlgoAnimation — See the algorithm. Understand the solution.
        </p>
        <a
          href="https://github.com/onurstats/algo-animation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-muted transition-colors hover:text-text-secondary"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
