import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { CATEGORIES, CATEGORY_GROUPS } from "@/lib/thozhil-data";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "All Services — THOZHIL" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [q, setQ] = useState("");
  const filtered = CATEGORIES.filter(
    (c) => c.en.toLowerCase().includes(q.toLowerCase()) || c.ta.includes(q),
  );

  return (
    <PhoneShell withNav>
      <header className="sticky top-0 z-30 bg-background/90 px-5 pb-3 pt-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link to="/home" className="grid size-10 place-items-center rounded-full bg-card">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-bold">All Services</h1>
            <p className="text-[11px] text-muted-foreground">அனைத்து சேவைகள்</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-card px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="space-y-7 px-5 pb-10">
        {CATEGORY_GROUPS.map((g) => {
          const items = filtered.filter((c) => c.group === g.id);
          if (items.length === 0) return null;
          return (
            <section key={g.id}>
              <div className="mb-3">
                <h2 className="font-display text-base font-bold">{g.label}</h2>
                <p className="text-[11px] text-muted-foreground">{g.ta}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {items.map((c) => (
                  <Link
                    key={c.id}
                    to="/category/$id"
                    params={{ id: c.id }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:border-primary/40 hover:scale-[1.02]"
                  >
                    <div className="relative h-24 w-full overflow-hidden bg-muted">
                      <img
                        src={c.image}
                        alt={c.en}
                        loading="lazy"
                        className="size-full object-cover transition group-hover:scale-110"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                      <span className="absolute right-2 top-2 rounded-full bg-background/90 px-1.5 py-0.5 text-sm">{c.icon}</span>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold leading-tight">{c.en}</p>
                      <p className="text-[10px] text-muted-foreground">{c.ta}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
