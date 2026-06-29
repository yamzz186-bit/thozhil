import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Star } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { CATEGORIES, WORKERS, getCategory } from "@/lib/thozhil-data";

export const Route = createFileRoute("/category/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${getCategory(params.id)?.en ?? "Service"} — THOZHIL` }],
  }),
  loader: ({ params }) => {
    const cat = getCategory(params.id);
    if (!cat) throw notFound();
    return { cat };
  },
  notFoundComponent: () => (
    <PhoneShell>
      <div className="px-5 py-10 text-center">
        <p className="text-sm text-muted-foreground">Service not found.</p>
        <Link to="/categories" className="mt-3 inline-block text-sm font-semibold text-primary">Back to services</Link>
      </div>
    </PhoneShell>
  ),
  errorComponent: () => (
    <PhoneShell>
      <div className="px-5 py-10 text-center text-sm text-destructive">Something went wrong.</div>
    </PhoneShell>
  ),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const cat = CATEGORIES.find((c) => c.id === id)!;
  const workers = WORKERS.filter((w) => w.category === id);

  return (
    <PhoneShell>
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <img
          src={cat.image}
          alt={cat.en}
          className="size-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <Link to="/categories" className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-background/80 backdrop-blur">
          <ArrowLeft className="size-4" />
        </Link>
        <span className="absolute right-4 top-4 rounded-full bg-background/90 px-2 py-1 text-lg">{cat.icon}</span>
        <div className="absolute bottom-3 left-5 right-5">
          <h1 className="font-display text-2xl font-black">{cat.en}</h1>
          <p className="text-xs text-muted-foreground">{cat.ta}</p>
        </div>
      </div>

      <div className="space-y-6 px-5 pb-32 pt-5">
        <p className="text-sm leading-relaxed text-foreground/90">{cat.desc}</p>

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's included</h2>
          <ul className="grid grid-cols-2 gap-2">
            {cat.includes.map((it) => (
              <li key={it} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm">
                <Check className="size-4 text-success" />
                {it}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">Available pros</h2>
              <p className="text-[11px] text-muted-foreground">{workers.length} verified near you</p>
            </div>
          </div>
          <div className="space-y-2">
            {workers.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No pros listed yet — we'll assign the best one when you book.
              </p>
            )}
            {workers.map((w) => (
              <Link
                key={w.id}
                to="/worker/$id"
                params={{ id: w.id }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-primary/40"
              >
                <img
                  src={w.photo}
                  alt={w.name}
                  className="size-12 rounded-lg object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold">{w.name}</p>
                    {w.verified && <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-bold text-success">✓</span>}
                  </div>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Star className="size-3 fill-primary text-primary" /> {w.rating} · {w.district} · {w.etaMin} min
                  </p>
                </div>
                <p className="text-sm font-bold text-primary">₹{w.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-background/95 p-4 backdrop-blur-xl">
        <button
          onClick={() => navigate({ to: "/book", search: { category: cat.id } })}
          className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]"
        >
          Book {cat.en} →
        </button>
      </div>
    </PhoneShell>
  );
}
