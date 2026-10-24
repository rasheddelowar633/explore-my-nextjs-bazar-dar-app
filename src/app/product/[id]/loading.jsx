
export default function ProductLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-6 h-5 w-32 animate-pulse rounded bg-base-300" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="h-72 animate-pulse rounded-2xl bg-base-300 sm:h-96" />

        <div className="space-y-5">
          <div className="h-8 w-3/4 animate-pulse rounded bg-base-300" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-base-300" />
          <div className="h-10 w-40 animate-pulse rounded bg-base-300" />
          <div className="h-4 w-full animate-pulse rounded bg-base-300" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-base-300" />
          <div className="h-12 w-44 animate-pulse rounded-lg bg-base-300" />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <div className="h-7 w-52 animate-pulse rounded bg-base-300" />
        <div className="h-40 animate-pulse rounded-xl bg-base-300" />
      </div>
    </main>
  );
}
