export const OrdersSummarySkeleton = () => {
  return (
    <section className='grid gap-3 md:grid-cols-3' aria-label='Orders summary skeleton'>
      {Array.from({ length: 3 }).map((_, index) => (
        <article key={index} className='rounded-lg border border-border bg-card p-4 text-card-foreground'>
          <div className='h-3 w-20 animate-pulse rounded bg-muted' />
          <div className='mt-3 h-8 w-12 animate-pulse rounded bg-muted' />
        </article>
      ))}
    </section>
  )
}

