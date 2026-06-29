import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, MapPin, Phone, Wallet, Banknote, Smartphone } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";
import { SafeImage } from "@/components/SafeImage";
import { WORKERS } from "@/lib/thozhil-data";
import bookingHero from "@/assets/booking-confirmed.jpg";
import { z } from "zod";

export const Route = createFileRoute("/confirmation")({
  validateSearch: z.object({ worker: z.string().optional() }),
  head: () => ({ meta: [{ title: "Booking Confirmed — THOZHIL" }] }),
  component: Confirmation,
});

function Confirmation() {
  const { worker } = Route.useSearch();
  const w = WORKERS.find((x) => x.id === worker) || WORKERS[0];
  const [eta, setEta] = useState(w.etaMin * 60);
  const [pay, setPay] = useState<"cash" | "upi" | "wallet">("upi");

  useEffect(() => {
    const t = setInterval(() => setEta((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(eta / 60);
  const secs = eta % 60;
  const bookingId = "TZL" + Math.random().toString(36).slice(2, 8).toUpperCase();

  return (
    <PhoneShell>
      <div className="px-5 pt-6">
        <div className="relative mb-5 overflow-hidden rounded-3xl shadow-card">
          <img src={bookingHero} alt="Booking confirmed" className="h-44 w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-success shadow-glow">
              <Check className="size-7 stroke-[3] text-success-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-success">Confirmed</p>
              <p className="text-sm font-semibold text-foreground">Your worker is on the way</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-display text-3xl font-black">Booking Confirmed!</h1>
          <p className="mt-1 text-sm text-muted-foreground">பதிவு உறுதி செய்யப்பட்டது</p>
          <p className="mt-2 inline-block rounded-full bg-card px-3 py-1 text-xs font-mono">
            ID · {bookingId}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="size-14 overflow-hidden rounded-xl bg-hero shadow-glow">
              <SafeImage src={w.photo} alt={w.name} fallbackLabel={w.avatar} className="size-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{w.name}</p>
              <p className="text-xs text-muted-foreground">{w.role} · ★ {w.rating}</p>
            </div>
            <a href={`tel:+919999999999`} className="grid size-10 place-items-center rounded-full bg-success/15">
              <Phone className="size-4 text-success" />
            </a>
          </div>

          <div className="mt-4 rounded-xl bg-muted p-4 text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Arriving in</p>
            <p className="font-display text-4xl font-black tabular-nums text-primary text-glow">
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">ETA · {w.distanceKm} km away</p>
          </div>

          {/* Live mini-map showing worker moving toward customer */}
          <LiveTrack worker={w} progress={1 - eta / (w.etaMin * 60)} />

          <Link
            to="/map"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm font-semibold text-primary"
          >
            <MapPin className="size-4" /> Open full map
          </Link>

        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Payment method · கட்டண முறை
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "cash", icon: Banknote, label: "Cash" },
              { id: "upi", icon: Smartphone, label: "UPI" },
              { id: "wallet", icon: Wallet, label: "Thozhil Wallet" },
            ] as const).map((p) => (
              <button
                key={p.id}
                onClick={() => setPay(p.id)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs transition ${
                  pay === p.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"
                }`}
              >
                <p.icon className="size-5" />
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-success/40 bg-success/10 px-4 py-3">
            <div className="flex items-center gap-2 text-xs">
              <Check className="size-4 text-success" />
              <span className="font-semibold text-foreground">
                {pay === "cash" ? "Cash" : pay === "upi" ? "UPI" : "Thozhil Wallet"}
              </span>
              <span className="text-muted-foreground">selected</span>
            </div>
            <span className="font-display text-base font-bold text-success">₹{w.price}</span>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Pay after the job · No middleman fees · அழைப்புக் கட்டணம் இல்லை
          </p>
        </div>


        <Link
          to="/home"
          className="mt-8 mb-10 block w-full rounded-xl border border-border bg-card py-3.5 text-center text-sm font-semibold"
        >
          Done
        </Link>
      </div>
    </PhoneShell>
  );
}

function LiveTrack({ worker, progress }: { worker: { name: string; avatar: string; photo: string }; progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  // Worker travels from top-left → customer at bottom-right
  const wx = 12 + p * 70; // %
  const wy = 22 + p * 60;
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-primary/10">
      <div className="flex items-center justify-between border-b border-border bg-card/60 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Live tracking</p>
        <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
          <span className="size-1.5 animate-pulse rounded-full bg-success" /> {Math.round(p * 100)}% to you
        </span>
      </div>
      <div className="relative h-48">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Roads */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 12 22 Q 40 45 82 82" stroke="var(--primary)" strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.6" />
          <path d="M 12 22 L 82 82" stroke="var(--primary)" strokeWidth="0.4" fill="none" opacity="0.3" />
        </svg>

        {/* Customer marker (destination) */}
        <div className="absolute" style={{ left: "82%", top: "82%", transform: "translate(-50%, -100%)" }}>
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">YOU</span>
            <MapPinSolid />
          </div>
        </div>

        {/* Worker avatar moving */}
        <div
          className="absolute transition-all duration-1000 ease-linear"
          style={{ left: `${wx}%`, top: `${wy}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <span className="absolute inset-0 -m-1 animate-pulse-ring rounded-full bg-primary/40" />
            <div className="relative size-10 overflow-hidden rounded-full border-2 border-primary bg-card shadow-glow">
              <img
                src={worker.photo}
                alt={worker.name}
                className="size-full object-cover"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground shadow">
              {worker.name.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPinSolid() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-destructive drop-shadow">
      <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

