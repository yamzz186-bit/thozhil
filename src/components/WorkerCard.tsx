import { Link } from "@tanstack/react-router";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Worker } from "@/lib/thozhil-data";
import { SafeImage } from "@/components/SafeImage";

export function WorkerCard({ worker, compact = false }: { worker: Worker; compact?: boolean }) {
  return (
    <Link
      to="/worker/$id"
      params={{ id: worker.id }}
      className="group block rounded-2xl border border-border bg-card p-4 shadow-card transition hover:border-primary/40 hover:shadow-glow"
    >
      <div className="flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl shadow-glow ring-2 ring-primary/40">
          <SafeImage src={worker.photo} alt={worker.name} fallbackLabel={worker.avatar} loading="lazy" className="size-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold text-foreground">{worker.name}</h3>
            {worker.verified && <BadgeCheck className="size-4 shrink-0 fill-success text-background" />}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {worker.role} · <span className="opacity-70">{worker.roleTa}</span>
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-foreground">
              <Star className="size-3 fill-primary text-primary" /> {worker.rating}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3" /> {worker.distanceKm} km
            </span>
            <span className="text-success">{worker.etaMin} min</span>
          </div>
        </div>
        {!compact && (
          <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition group-hover:scale-105">
            Book
          </span>
        )}
      </div>
      {worker.verified && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5 text-[10px] font-medium text-success">
          <BadgeCheck className="size-3" /> THOZHIL Verified · Aadhaar
        </div>
      )}
    </Link>
  );
}
