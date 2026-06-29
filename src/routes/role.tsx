import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User, HardHat, ArrowRight, ShieldCheck, Sparkles, Wrench, MapPin, Briefcase } from "lucide-react";
import logo from "@/assets/thozhil-logo.png";

export const Route = createFileRoute("/role")({
  head: () => ({ meta: [{ title: "Choose your role — THOZHIL" }] }),
  component: RolePage,
});

function RolePage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Airbnb-style full-bleed background (matches login) */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>

      {/* Floating icons */}
      <Wrench className="pointer-events-none absolute left-6 top-32 size-6 animate-float-up text-primary/50" style={{ animationDuration: "2.5s", animationDelay: "200ms" }} />
      <Briefcase className="pointer-events-none absolute right-8 top-44 size-7 animate-float-up text-primary/50" style={{ animationDuration: "2.8s", animationDelay: "400ms" }} />
      <MapPin className="pointer-events-none absolute bottom-32 left-10 size-5 animate-float-up text-primary/50" style={{ animationDuration: "2.2s", animationDelay: "600ms" }} />

      <div className="relative mx-auto max-w-md px-6 pt-10 pb-10">
        <div className="flex justify-center">
          <Link to="/" className="group relative inline-block">
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-primary/30" />
            <div className="relative grid size-24 place-items-center rounded-2xl bg-white p-2 shadow-glow transition group-hover:scale-105">
              <img src={logo} alt="THOZHIL" className="size-full object-contain" />
            </div>
          </Link>
        </div>

        <div className="mt-6 text-center animate-float-up">
          <h1 className="font-display text-3xl font-bold">
            Who are you?
          </h1>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="size-3 text-primary" /> யார் நீங்கள்? · Choose to continue
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate({ to: "/login", search: { role: "customer" } as any })}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-card transition hover:-translate-y-1 hover:border-primary hover:shadow-glow animate-float-up"
            style={{ animationDelay: "120ms" }}
          >
            <span className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
            <div className="relative grid size-16 place-items-center rounded-2xl bg-hero shadow-glow">
              <User className="size-8 text-primary-foreground" />
            </div>
            <div className="relative flex-1">
              <p className="font-display text-lg font-bold">I am a Customer</p>
              <p className="text-xs text-muted-foreground">வாடிக்கையாளர் · Book trusted workers nearby</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Hire pros · 15-min ETA
              </p>
            </div>
            <ArrowRight className="relative size-5 text-muted-foreground transition group-hover:translate-x-2 group-hover:text-primary" />
          </button>

          <button
            onClick={() => navigate({ to: "/worker/register" })}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-card transition hover:-translate-y-1 hover:border-primary hover:shadow-glow animate-float-up"
            style={{ animationDelay: "220ms" }}
          >
            <span className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
            <div className="relative grid size-16 place-items-center rounded-2xl bg-hero shadow-glow">
              <HardHat className="size-8 text-primary-foreground" />
            </div>
            <div className="relative flex-1">
              <p className="font-display text-lg font-bold">I am a Worker</p>
              <p className="text-xs text-muted-foreground">தொழிலாளி · Earn from jobs nearby</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Earn ₹1000+ daily · No fees
              </p>
            </div>
            <ArrowRight className="relative size-5 text-muted-foreground transition group-hover:translate-x-2 group-hover:text-primary" />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card/60 p-4 text-center backdrop-blur animate-float-up" style={{ animationDelay: "320ms" }}>
          <p className="text-xs text-muted-foreground">Already have an account?</p>
          <div className="mt-2 flex gap-2">
            <Link
              to="/login"
              search={{ role: "customer" } as any}
              className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-glow"
            >
              Customer Login
            </Link>
            <Link
              to="/login"
              search={{ role: "worker" } as any}
              className="flex-1 rounded-xl border border-primary/40 bg-background py-2.5 text-xs font-semibold text-primary"
            >
              Worker Login
            </Link>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" /> Secured by THOZHIL Trust
        </p>
      </div>
    </div>
  );
}
