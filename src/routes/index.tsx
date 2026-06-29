import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import splashHero from "@/assets/splash-hero.jpg";
import logo from "@/assets/thozhil-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THOZHIL — Reliable work, no middleman" },
      { name: "description", content: "Hyperlocal gig platform for daily wage workers across Tamil Nadu." },
      { property: "og:title", content: "THOZHIL" },
      { property: "og:description", content: "Reliable work, no middleman. நம்பகமான வேலை." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/role" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <img src={splashHero} alt="" className="absolute inset-0 size-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative z-10 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-pulse-ring rounded-3xl bg-primary/30" />
          <div className="relative mx-auto mb-6 grid size-36 place-items-center rounded-3xl bg-white p-3 shadow-glow">
            <img src={logo} alt="THOZHIL" className="size-full object-contain" />
          </div>
        </div>
        <p className="mt-3 animate-float-up text-sm font-medium uppercase tracking-[0.3em] text-primary" style={{ animationDelay: "120ms" }}>
          Reliable work, no middleman
        </p>
        <p className="mt-2 animate-float-up text-lg text-muted-foreground" style={{ animationDelay: "240ms" }}>
          நம்பகமான வேலை
        </p>

        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60">
          Tamil Nadu · v1.0
        </div>
      </div>
    </div>
  );
}
