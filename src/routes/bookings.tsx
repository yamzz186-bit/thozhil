import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { WORKERS } from "@/lib/thozhil-data";
import { CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — THOZHIL" }] }),
  component: Bookings,
});

function Bookings() {
  return (
    <PhoneShell withNav>
      <header className="px-5 pt-8">
        <h1 className="font-display text-3xl font-black">Bookings</h1>
        <p className="text-sm text-muted-foreground">பதிவுகள்</p>
      </header>
      <div className="space-y-3 px-5 pt-6">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
            <Clock className="size-3.5" /> ACTIVE
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-hero text-sm font-bold text-primary-foreground">
              {WORKERS[0].avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{WORKERS[0].name}</p>
              <p className="text-xs text-muted-foreground">{WORKERS[0].role} · arriving in 14 min</p>
            </div>
            <Link to="/confirmation" search={{ worker: WORKERS[0].id }} className="text-xs font-semibold text-primary">
              Track →
            </Link>
          </div>
        </div>

        {WORKERS.slice(1, 4).map((w) => (
          <div key={w.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 className="size-3.5" /> Completed
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-xl bg-muted text-sm font-bold">
                {w.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.role} · ₹{w.price}</p>
              </div>
              <span className="text-xs text-muted-foreground">★ {w.rating}</span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
