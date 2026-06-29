import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCircle2, Star, Siren, Wallet } from "lucide-react";
import { PhoneShell } from "@/components/PhoneShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — THOZHIL" }] }),
  component: NotificationsPage,
});

const NOTIFS = [
  {
    icon: CheckCircle2,
    color: "text-success",
    title: "Ravi Kumar accepted your booking",
    desc: "Electrician · arriving in 14 min",
    time: "2 min ago",
    unread: true,
  },
  {
    icon: Siren,
    color: "text-destructive",
    title: "SOS available in Salem",
    desc: "3 workers online for emergency calls.",
    time: "20 min ago",
    unread: true,
  },
  {
    icon: Star,
    color: "text-primary",
    title: "Rate Senthil M",
    desc: "How was the plumbing job yesterday?",
    time: "1 day ago",
    unread: false,
  },
  {
    icon: Wallet,
    color: "text-primary",
    title: "₹500 paid to Lakshmi K",
    desc: "Cash on completion · 0% platform fee",
    time: "2 days ago",
    unread: false,
  },
  {
    icon: Bell,
    color: "text-muted-foreground",
    title: "Elder Care now in Coimbatore",
    desc: "Book a caregiver for your parents remotely.",
    time: "3 days ago",
    unread: false,
  },
];

function NotificationsPage() {
  return (
    <PhoneShell>
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-background/90 px-5 py-4 backdrop-blur-xl">
        <Link to="/home" className="grid size-10 place-items-center rounded-full bg-card">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="font-display text-lg font-bold">Notifications</h1>
          <p className="text-[11px] text-muted-foreground">அறிவிப்புகள்</p>
        </div>
      </header>

      <div className="space-y-2 px-5 pb-10">
        {NOTIFS.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${
                n.unread ? "border-primary/40 bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-background">
                <Icon className={`size-5 ${n.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.desc}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
              </div>
              {n.unread && <span className="mt-1 size-2 rounded-full bg-primary" />}
            </div>
          );
        })}
      </div>
    </PhoneShell>
  );
}
