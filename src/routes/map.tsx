import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Navigation } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { WorkerCard } from "@/components/WorkerCard";
import { WORKERS } from "@/lib/thozhil-data";

const FILTERS = ["All", "Electrician", "Plumber", "Carpenter", "AC Repair", "House Cleaning", "Elder Care"];

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Map — THOZHIL" }] }),
  component: MapPage,
});

function MapPage() {
  const [filter, setFilter] = useState("All");
  const list = WORKERS.filter((w) => filter === "All" || w.role === filter);

  return (
    <PhoneShell withNav>
      <div className="relative h-[60vh] overflow-hidden">
        {/* Map background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "oklch(0.18 0.01 60)",
            backgroundImage:
              "linear-gradient(oklch(0.28 0.02 60) 1px, transparent 1px), linear-gradient(90deg, oklch(0.28 0.02 60) 1px, transparent 1px), radial-gradient(circle at 30% 40%, oklch(0.25 0.05 45 / 0.4), transparent 50%), radial-gradient(circle at 70% 60%, oklch(0.22 0.04 160 / 0.3), transparent 50%)",
            backgroundSize: "32px 32px, 32px 32px, 100% 100%, 100% 100%",
          }}
        />
        {/* Roads */}
        <svg className="absolute inset-0 size-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q30,30 50,55 T100,40" stroke="oklch(0.4 0.02 60)" strokeWidth="0.6" fill="none" />
          <path d="M20,0 Q40,40 30,80 T50,100" stroke="oklch(0.4 0.02 60)" strokeWidth="0.5" fill="none" />
          <path d="M80,10 Q60,50 75,90" stroke="oklch(0.4 0.02 60)" strokeWidth="0.4" fill="none" />
        </svg>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-5">
          <Link to="/home" className="grid size-10 place-items-center rounded-full bg-card/80 backdrop-blur">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="rounded-full bg-card/80 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            Salem, Tamil Nadu
          </div>
          <button className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <Navigation className="size-4" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="relative z-10 -mx-1 mt-2 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card/80 text-foreground backdrop-blur"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* User pin */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success/40" />
            <div className="relative size-4 rounded-full border-2 border-background bg-success shadow-glow" />
          </div>
          <p className="mt-1 -translate-x-1/2 text-[10px] font-bold uppercase text-success">You</p>
        </div>

        {/* Worker pins */}
        {list.map((w) => (
          <Link
            key={w.id}
            to="/worker/$id"
            params={{ id: w.id }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 animate-pop-in"
            style={{ left: `${w.position.x}%`, top: `${w.position.y}%` }}
          >
            <div className="relative">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
              <div className="relative size-11 overflow-hidden rounded-full border-2 border-background bg-primary shadow-glow">
                <img
                  src={w.photo}
                  alt={w.name}
                  loading="lazy"
                  className="size-full object-cover"
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    t.replaceWith(Object.assign(document.createElement("div"), {
                      className: "size-full grid place-items-center text-[10px] font-bold text-primary-foreground",
                      textContent: w.avatar,
                    }));
                  }}
                />
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/90 px-1.5 py-px text-[9px] font-bold text-foreground shadow">
                {w.etaMin}m
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom carousel */}
      <div className="-mt-6 rounded-t-3xl border-t border-border bg-background px-5 pt-5">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
        <h3 className="mb-3 font-display text-lg font-bold">
          {list.length} workers nearby
        </h3>
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((w) => (
            <div key={w.id} className="w-[85%] shrink-0 snap-center">
              <WorkerCard worker={w} />
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
