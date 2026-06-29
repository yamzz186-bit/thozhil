import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, BadgeCheck, MapPin, Briefcase, Phone, MessageCircle } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { WORKERS } from "@/lib/thozhil-data";

export const Route = createFileRoute("/worker/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — THOZHIL Worker` }],
  }),
  component: WorkerProfile,
  notFoundComponent: () => <div className="p-8 text-center">Worker not found</div>,
});

function WorkerProfile() {
  const { id } = Route.useParams();
  const w = WORKERS.find((x) => x.id === id);
  if (!w) throw notFound();

  return (
    <PhoneShell>
      <div className="relative h-56 overflow-hidden">
        <img src={w.photo} alt={w.name} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <Link to="/home" className="absolute left-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-card/70 backdrop-blur">
          <ArrowLeft className="size-4" />
        </Link>
      </div>

      <div className="-mt-16 px-5">
        <div className="relative rounded-3xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-start gap-4">
            <div className="size-20 shrink-0 overflow-hidden rounded-2xl shadow-glow ring-2 ring-primary">
              <img src={w.photo} alt={w.name} className="size-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold">{w.name}</h1>
                {w.verified && <BadgeCheck className="size-5 fill-success text-background" />}
              </div>
              <p className="text-sm text-muted-foreground">{w.role} · {w.roleTa}</p>
              <div className="mt-2 flex items-center gap-1">
                <Star className="size-4 fill-primary text-primary" />
                <span className="font-semibold">{w.rating}</span>
                <span className="text-xs text-muted-foreground">({w.jobs} jobs)</span>
              </div>
            </div>
          </div>

          {w.verified && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/10 p-3 text-xs">
              <BadgeCheck className="size-4 text-success" />
              <span className="font-semibold text-success">THOZHIL Verified</span>
              <span className="text-muted-foreground">· Aadhaar · Police check</span>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat icon={<Briefcase className="size-4" />} label="Jobs" value={`${w.jobs}+`} />
            <Stat icon={<MapPin className="size-4" />} label="Distance" value={`${w.distanceKm} km`} />
            <Stat icon={<Star className="size-4" />} label="Rating" value={w.rating.toString()} />
          </div>
        </div>

        <section className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[w.role, "Quick fix", "On-demand", "Emergency", "Weekend"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs">{s}</span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reviews</h2>
          <div className="space-y-2">
            {w.reviews.map((r, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{r.user}</span>
                  <span className="flex items-center gap-0.5 text-xs">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="size-3 fill-primary text-primary" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid grid-cols-3 gap-2 pb-32">
          <a href="tel:+919876543210" className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-xs hover:border-primary hover:bg-primary/5">
            <Phone className="size-4 text-primary" /> Call
          </a>
          <a
            href={`sms:+919876543210?body=${encodeURIComponent(`Hi ${w.name.split(" ")[0]}, I'd like to book you via THOZHIL.`)}`}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-xs hover:border-primary hover:bg-primary/5"
          >
            <MessageCircle className="size-4 text-primary" /> Chat
          </a>
          <Link to="/map" className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-xs hover:border-primary hover:bg-primary/5">
            <MapPin className="size-4 text-primary" /> Map
          </Link>
        </div>

      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-background/95 p-4 backdrop-blur-xl">
        <Link
          to="/book"
          search={{ worker: w.id, category: w.role.toLowerCase() }}
          className="block w-full rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground shadow-glow"
        >
          Book {w.name.split(" ")[0]} · ₹{w.price}
        </Link>
      </div>
    </PhoneShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3">
      <div className="flex justify-center text-primary">{icon}</div>
      <p className="mt-1 text-sm font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
