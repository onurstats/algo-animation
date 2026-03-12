export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-border bg-background/80" />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="flex flex-col gap-6">
          {/* Header skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-8 w-64 animate-pulse rounded-lg bg-surface" />
            <div className="h-5 w-48 animate-pulse rounded-lg bg-surface" />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Visualization skeleton */}
            <div className="min-h-[280px] animate-pulse rounded-xl bg-surface" />
            {/* Code panel skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-[300px] animate-pulse rounded-xl bg-surface" />
              <div className="h-[120px] animate-pulse rounded-xl bg-surface" />
            </div>
          </div>

          {/* Controls skeleton */}
          <div className="h-12 animate-pulse rounded-xl bg-surface" />
        </div>
      </main>
    </div>
  );
}
