
export default function CategoryLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-base-300" />

      <div className="mb-8 h-4 w-72 max-w-full animate-pulse rounded bg-base-300" />

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="h-10 w-28 animate-pulse rounded-lg bg-base-300" />
        <div className="h-10 w-28 animate-pulse rounded-lg bg-base-300" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-300 p-3"
          >
            <div className="mb-4 h-32 animate-pulse rounded-lg bg-base-300" />
            <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-base-300" />
            <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-base-300" />
            <div className="h-8 w-full animate-pulse rounded bg-base-300" />
          </div>
        ))}
      </div>
    </main>
  );
}
