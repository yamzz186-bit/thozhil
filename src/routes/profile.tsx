import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { Wallet, MapPin, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — THOZHIL" }] }),
  component: Profile,
});

function Profile() {
  const items = [
    { icon: Wallet, label: "Thozhil Wallet", value: "₹ 250" },
    { icon: MapPin, label: "Saved addresses", value: "3" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Trust & Safety" },
    { icon: HelpCircle, label: "Help · SMS support" },
  ];
  return (
    <PhoneShell withNav>
      <header className="bg-verse px-5 pb-10 pt-10">
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-2xl bg-hero text-2xl font-black text-primary-foreground shadow-glow">
            A
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Aravind</h1>
            <p className="text-xs text-muted-foreground">+91 98765 43210</p>
            <p className="mt-1 inline-block rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
              Verified Customer
            </p>
          </div>
        </div>
      </header>
      <div className="space-y-2 px-5 pt-6">
        {items.map((it) => (
          <button key={it.label} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4">
            <it.icon className="size-4 text-primary" />
            <span className="flex-1 text-left text-sm font-medium">{it.label}</span>
            {it.value && <span className="text-xs text-muted-foreground">{it.value}</span>}
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
        <Link to="/" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
          <LogOut className="size-4" /> Sign out
        </Link>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
