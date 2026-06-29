import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { CATEGORIES, WORKERS, getCategory } from "@/lib/thozhil-data";
import { z } from "zod";

const search = z.object({ category: z.string().optional(), worker: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Book a service — THOZHIL" }] }),
  component: BookPage,
});

function BookPage() {
  const { category, worker: workerSlug } = Route.useSearch();
  const navigate = useNavigate();
  const cat = category || "electrician";
  const catMeta = getCategory(cat) ?? CATEGORIES[0];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [address, setAddress] = useState("");

  const catWorkers = WORKERS.filter((w) => w.category === cat);
  const initialWorker = workerSlug || catWorkers[0]?.id || WORKERS[0].id;
  const [workerId, setWorkerId] = useState(initialWorker);

  const selected = WORKERS.find((w) => w.id === workerId) ?? catWorkers[0] ?? WORKERS[0];

  return (
    <PhoneShell>
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-background/90 px-5 py-4 backdrop-blur-xl">
        <Link to="/category/$id" params={{ id: cat }} className="grid size-10 place-items-center rounded-full bg-card">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="font-display text-lg font-bold">Book {catMeta.en}</h1>
          <p className="text-[11px] text-muted-foreground">{catMeta.ta} · சேவை பதிவு</p>
        </div>
      </header>

      <div className="space-y-6 px-5 pb-32">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={catMeta.image}
              alt={catMeta.en}
              className="size-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <span className="absolute right-1 top-1 rounded-full bg-background/90 px-1 text-[11px]">{catMeta.icon}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{catMeta.en}</p>
            <p className="text-[11px] text-muted-foreground line-clamp-2">{catMeta.desc}</p>
          </div>
        </div>


        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">When</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3">
              <Calendar className="size-4 text-primary" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3">
              <Clock className="size-4 text-primary" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</h2>
          <label className="flex items-start gap-2 rounded-xl border border-border bg-card px-3 py-3">
            <MapPin className="mt-0.5 size-4 text-primary" />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Door no, Street, Area, City"
              rows={2}
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </section>

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {cat === "elder" ? "Choose a caregiver for your parents" : "Choose worker"} · {catWorkers.length} available
          </h2>
          {cat === "elder" && (
            <p className="mb-3 rounded-xl border border-primary/30 bg-primary/5 p-3 text-[11px] text-muted-foreground">
              🧓 Review verified caregiver profiles below. Tap one to expand, or open full profile before confirming.
            </p>
          )}
          <div className="space-y-2">
            {catWorkers.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No workers in this category yet. Try another service.
              </p>
            )}
            {catWorkers.map((w) => (
              <div
                key={w.id}
                className={`rounded-xl border p-3 transition ${
                  workerId === w.id ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <button onClick={() => setWorkerId(w.id)} className="flex w-full items-center gap-3 text-left">
                  <img
                    src={w.photo}
                    alt={w.name}
                    className="size-12 rounded-lg object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{w.name}</p>
                      {w.verified && <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-bold text-success">✓ VERIFIED</span>}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {w.district} · ★ {w.rating} · {w.jobs} jobs · {w.etaMin} min
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary">₹{w.price}</p>
                </button>
                {workerId === w.id && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    {w.reviews[0] && (
                      <p className="text-[11px] italic text-muted-foreground">
                        "{w.reviews[0].text}" — {w.reviews[0].user}
                      </p>
                    )}
                    <Link
                      to="/worker/$id"
                      params={{ id: w.id }}
                      className="inline-block text-[11px] font-semibold text-primary"
                    >
                      View full profile →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span>₹{selected.price}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Platform · 0%</span>
            <span className="text-success">No middleman</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
            <span className="font-semibold">Total estimate</span>
            <span className="font-display text-xl font-black text-primary">₹{selected.price}</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-background/95 p-4 backdrop-blur-xl">
        <button
          onClick={() => navigate({ to: "/confirmation", search: { worker: selected.id } })}
          className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01]"
        >
          Book Now · ₹{selected.price}
        </button>
      </div>
    </PhoneShell>
  );
}
