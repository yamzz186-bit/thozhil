import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bell, MapPin, Phone, Wallet, Star, CheckCircle2, XCircle, Briefcase, Clock, LogOut, UserCog, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/lib/thozhil-data";

export const Route = createFileRoute("/worker/home")({
  head: () => ({ meta: [{ title: "Worker Dashboard — THOZHIL" }] }),
  component: WorkerHome,
});


type Job = {
  id: string;
  customer: string;
  category: string;
  address: string;
  district: string;
  distanceKm: number;
  etaMin: number;
  price: number;
  note: string;
  phone: string;
  postedMinAgo: number;
  status: "new" | "accepted" | "rejected" | "completed";
};

const SEED_JOBS: Job[] = [
  { id: "j1", customer: "Kavitha S", category: "electrician", address: "12, Gandhi Street, Hasthampatti", district: "Salem", distanceKm: 1.2, etaMin: 15, price: 350, note: "Ceiling fan not working in bedroom", phone: "98765 43210", postedMinAgo: 2, status: "new" },
  { id: "j2", customer: "Arjun P", category: "plumber", address: "45, Lakshmi Nagar, Salem", district: "Salem", distanceKm: 2.8, etaMin: 22, price: 420, note: "Bathroom tap leaking continuously", phone: "98765 11122", postedMinAgo: 5, status: "new" },
  { id: "j3", customer: "Meena R", category: "electrician", address: "7B, Ammapet Main Rd", district: "Salem", distanceKm: 3.4, etaMin: 28, price: 500, note: "MCB tripping, need full check", phone: "98765 33344", postedMinAgo: 9, status: "new" },
  { id: "j4", customer: "Suresh", category: "ac", address: "23, Fairlands, Salem", district: "Salem", distanceKm: 4.1, etaMin: 32, price: 650, note: "Split AC not cooling, gas top-up", phone: "98765 55566", postedMinAgo: 12, status: "new" },
  { id: "j5", customer: "Divya K", category: "carpenter", address: "8, Shevapet, Salem", district: "Salem", distanceKm: 2.0, etaMin: 18, price: 600, note: "Wardrobe hinge replacement", phone: "98765 77788", postedMinAgo: 15, status: "new" },
  { id: "j6", customer: "Mani T", category: "plumber", address: "33, Five Roads, Salem", district: "Salem", distanceKm: 1.6, etaMin: 14, price: 380, note: "Sink pipe burst — urgent!", phone: "98770 11122", postedMinAgo: 18, status: "new" },
  { id: "j7", customer: "Bhuvana", category: "cleaning", address: "Periyar Nagar, Salem", district: "Salem", distanceKm: 2.4, etaMin: 20, price: 550, note: "Deep clean 2BHK before festival", phone: "98770 22233", postedMinAgo: 22, status: "new" },
  { id: "j8", customer: "Karthik R", category: "fridge", address: "Alagapuram, Salem", district: "Salem", distanceKm: 3.0, etaMin: 25, price: 600, note: "Fridge not cooling at all", phone: "98770 33344", postedMinAgo: 26, status: "new" },
  { id: "j9", customer: "Sangeetha", category: "electrician", address: "Suramangalam, Salem", district: "Salem", distanceKm: 4.5, etaMin: 35, price: 450, note: "Install 3 new lights and switch board", phone: "98770 44455", postedMinAgo: 31, status: "new" },
  { id: "j10", customer: "Vinoth K", category: "mechanic", address: "Kondalampatti, Salem", district: "Salem", distanceKm: 5.2, etaMin: 38, price: 380, note: "Bike not starting, urgent doorstep", phone: "98770 55566", postedMinAgo: 35, status: "new" },
  { id: "j11", customer: "Latha M", category: "cook", address: "Yercaud Rd, Salem", district: "Salem", distanceKm: 1.9, etaMin: 17, price: 700, note: "Cook for family function (12 ppl)", phone: "98770 66677", postedMinAgo: 41, status: "new" },
  { id: "j12", customer: "Ramesh", category: "carpenter", address: "Reddiyur, Salem", district: "Salem", distanceKm: 2.6, etaMin: 21, price: 850, note: "Custom kitchen shelf, 2 racks", phone: "98770 77788", postedMinAgo: 48, status: "new" },
  { id: "j13", customer: "Priya N", category: "baby", address: "Hasthampatti, Salem", district: "Salem", distanceKm: 1.4, etaMin: 13, price: 520, note: "Babysitter for evening 4-9 pm", phone: "98770 88899", postedMinAgo: 55, status: "new" },
  { id: "j14", customer: "Ganesh", category: "pest", address: "Shevapet, Salem", district: "Salem", distanceKm: 2.1, etaMin: 19, price: 900, note: "Cockroach + termite full house", phone: "98770 99900", postedMinAgo: 64, status: "new" },
  { id: "j15", customer: "Anu R", category: "paint", address: "Fairlands, Salem", district: "Salem", distanceKm: 3.3, etaMin: 27, price: 4500, note: "Paint living + 1 bedroom, white", phone: "98771 00011", postedMinAgo: 72, status: "new" },
];

// Generate 100+ jobs across categories
const GEN_CUSTOMERS = ["Kavitha S","Arjun P","Meena R","Suresh","Divya K","Mani T","Bhuvana","Karthik R","Sangeetha","Vinoth K","Latha M","Ramesh","Priya N","Ganesh","Anu R","Naveen","Hari","Bala","Geetha","Selvi","Murali","Sundar","Lalitha","Saranya","Deepa","Anand","Vidhya","Yuvan","Ezhil","Sakthi"];
const GEN_AREAS = ["Hasthampatti","Five Roads","Shevapet","Ammapet","Fairlands","Suramangalam","Alagapuram","Kondalampatti","Yercaud Rd","Reddiyur","Periyar Nagar","Gandhi St","Lakshmi Nagar"];
const GEN_NOTES = ["Urgent fix needed today","Doorstep visit please","Need full inspection","Quote first, then proceed","Repeat customer — known issue","Quick visit, 30 mins","Bring spare parts","Estimate required","Emergency, ASAP","Schedule for evening"];
const GEN_CATS = ["electrician","plumber","carpenter","ac","fridge","cleaning","cook","baby","pest","paint","mechanic","tv","lock","welding","mason","laundry","garden","glass-cleaning","carwash"];

function genRand(seed: number) { return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
const _genJobs: Job[] = [];
for (let i = 0; i < 110; i++) {
  const r = genRand(i * 73 + 17);
  const cat = GEN_CATS[Math.floor(r() * GEN_CATS.length)];
  const cust = GEN_CUSTOMERS[Math.floor(r() * GEN_CUSTOMERS.length)];
  const area = GEN_AREAS[Math.floor(r() * GEN_AREAS.length)];
  const dist = Math.round((0.6 + r() * 6) * 10) / 10;
  _genJobs.push({
    id: `g${i}`,
    customer: cust,
    category: cat,
    address: `${10 + Math.floor(r() * 80)}, ${area}`,
    district: "Salem",
    distanceKm: dist,
    etaMin: Math.round(8 + dist * 5),
    price: 250 + Math.floor(r() * 1200),
    note: GEN_NOTES[Math.floor(r() * GEN_NOTES.length)],
    phone: `987${Math.floor(10000000 + r() * 89999999)}`,
    postedMinAgo: Math.floor(r() * 240),
    status: "new",
  });
}
const ALL_SEED_JOBS = [...SEED_JOBS, ..._genJobs];

function loadJobs(): Job[] {
  try {
    const s = localStorage.getItem("thozhil_jobs");
    if (s) {
      const parsed: Job[] = JSON.parse(s);
      if (parsed.length >= 100) return parsed;
    }
  } catch {}
  return ALL_SEED_JOBS;
}
function saveJobs(j: Job[]) {
  try {
    localStorage.setItem("thozhil_jobs", JSON.stringify(j));
  } catch {}
}


function WorkerHome() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"new" | "my">("new");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [worker, setWorker] = useState<any>(null);

  useEffect(() => {
    setJobs(loadJobs());
    try {
      const w = localStorage.getItem("thozhil_worker");
      if (w) setWorker(JSON.parse(w));
    } catch {}
  }, []);

  const update = (id: string, status: Job["status"]) => {
    const next = jobs.map((j) => (j.id === id ? { ...j, status } : j));
    setJobs(next);
    saveJobs(next);
  };

  const newJobs = useMemo(() => jobs.filter((j) => j.status === "new"), [jobs]);
  const myJobs = useMemo(() => jobs.filter((j) => j.status === "accepted" || j.status === "completed"), [jobs]);

  const earnings = myJobs.filter((j) => j.status === "completed").reduce((s, j) => s + j.price, 0);
  const todayJobs = myJobs.length;

  const logout = () => {
    navigate({ to: "/role" });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="bg-hero px-5 pb-6 pt-8 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Welcome back</p>
              <h1 className="font-display text-2xl font-bold">{worker?.fullName || "Worker"}</h1>
              <p className="mt-0.5 text-xs opacity-80 capitalize">
                {CATEGORIES.find((c) => c.id === worker?.category)?.en || "Pro"} · {worker?.district || "Salem"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="relative grid size-10 place-items-center rounded-full bg-white/20">
                <Bell className="size-4" />
                {newJobs.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold">
                    {newJobs.length}
                  </span>
                )}
              </button>
              <Link to="/worker/register" className="grid size-10 place-items-center rounded-full bg-white/20" aria-label="Edit profile">
                <UserCog className="size-4" />
              </Link>
              <button onClick={logout} className="grid size-10 place-items-center rounded-full bg-white/20">
                <LogOut className="size-4" />
              </button>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat icon={<Wallet className="size-4" />} label="Earned" value={`₹${earnings}`} />
            <Stat icon={<Briefcase className="size-4" />} label="Jobs" value={`${todayJobs}`} />
            <Stat icon={<Star className="size-4" />} label="Rating" value="4.8" />
          </div>
        </header>

        <div className="sticky top-0 z-20 bg-background/95 px-5 py-3 backdrop-blur-xl">
          <div className="flex rounded-xl bg-card p-1">
            <button
              onClick={() => setTab("new")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "new" ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              New Jobs ({newJobs.length})
            </button>
            <button
              onClick={() => setTab("my")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === "my" ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              My Jobs ({myJobs.length})
            </button>
          </div>
        </div>

        <div className="px-5">
          {tab === "new" && (
            <div className="space-y-3">
              {newJobs.length === 0 && (
                <Empty title="No new jobs yet" subtitle="We'll ping you the moment a customer books." />
              )}
              {newJobs.map((j, i) => (
                <div key={j.id} className="animate-float-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <JobCard job={j} onAccept={() => update(j.id, "accepted")} onReject={() => update(j.id, "rejected")} />
                </div>
              ))}
            </div>
          )}

          {tab === "my" && (
            <div className="space-y-3">
              {myJobs.length === 0 && <Empty title="No accepted jobs" subtitle="Accept a job from the New Jobs tab." />}
              {myJobs.map((j) => (
                <MyJobCard key={j.id} job={j} onComplete={() => update(j.id, "completed")} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Link
        to="/role"
        className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-card"
      >
        Switch role →
      </Link>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/15 px-3 py-2.5 backdrop-blur">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider opacity-80">{icon}{label}</div>
      <p className="mt-0.5 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function JobCard({ job, onAccept, onReject }: { job: Job; onAccept: () => void; onReject: () => void }) {
  const cat = CATEGORIES.find((c) => c.id === job.category);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-start gap-3 p-4">
        <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-2xl">{cat?.icon || "🛠"}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{cat?.en || job.category}</p>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">₹{job.price}</span>
          </div>
          <p className="text-xs text-muted-foreground">{job.customer} · {job.postedMinAgo} min ago</p>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-border bg-muted/40 px-4 py-3 text-xs">
        <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" /> {job.address}, {job.district}</p>
        <p className="flex items-center gap-2 text-muted-foreground"><Clock className="size-3.5 text-primary" /> ~{job.etaMin} min ride · {job.distanceKm} km</p>
        <p className="flex items-start gap-2 italic text-foreground">“{job.note}”</p>
      </div>

      <div className="flex gap-2 border-t border-border p-3">
        <button onClick={onReject} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:border-destructive/40 hover:text-destructive">
          <XCircle className="size-4" /> Reject
        </button>
        <button onClick={onAccept} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
          <CheckCircle2 className="size-4" /> Accept
        </button>
      </div>
    </div>
  );
}

function MyJobCard({ job, onComplete }: { job: Job; onComplete: () => void }) {
  const cat = CATEGORIES.find((c) => c.id === job.category);
  const done = job.status === "completed";
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-2xl">{cat?.icon || "🛠"}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{cat?.en}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${done ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
              {done ? "Completed" : "In Progress"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{job.customer}</p>
          <p className="mt-1 flex items-start gap-1.5 text-xs"><MapPin className="mt-0.5 size-3 text-primary" /> {job.address}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a href={`tel:+91${job.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold">
          <Phone className="size-3.5 text-primary" /> Call
        </a>
        <a href={`sms:+91${job.phone.replace(/\s/g, "")}?body=${encodeURIComponent("Hi, I'm on the way for your THOZHIL booking.")}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold">
          <MessageCircle className="size-3.5 text-primary" /> Chat
        </a>
        <Link to="/map" className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold">
          <MapPin className="size-3.5 text-primary" /> Map
        </Link>
      </div>
      {!done && (
        <button onClick={onComplete} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-glow">
          <CheckCircle2 className="size-3.5" /> Mark Done · Collect ₹{job.price}
        </button>
      )}

    </div>
  );
}

function Empty({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
      <Briefcase className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
