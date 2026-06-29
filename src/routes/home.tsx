import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, Siren, ChevronDown, Bell, Sparkles, Navigation, X, Check } from "lucide-react";
import verseHero from "@/assets/thozhilverse-hero.jpg";
import { PhoneShell } from "@/components/PhoneShell";
import { BottomNav } from "@/components/BottomNav";
import { WorkerCard } from "@/components/WorkerCard";
import { DISTRICTS, WORKERS, CATEGORIES, TN_DISTRICTS_ALL, POPULAR_DISTRICTS } from "@/lib/thozhil-data";


export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — THOZHIL" }] }),
  component: Home,
});

function Home() {
  const [district, setDistrict] = useState("Salem");
  const [openDistrict, setOpenDistrict] = useState(false);
  const [query, setQuery] = useState("");
  const [locPopup, setLocPopup] = useState(false);
  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "done">("idle");
  const [pickerQuery, setPickerQuery] = useState("");
  const [tempDistrict, setTempDistrict] = useState("Salem");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("thozhil_district");
      if (saved) {
        setDistrict(saved);
        setTempDistrict(saved);
      }
    } catch {}
    // Always show the location popup whenever Home opens
    setLocPopup(true);
  }, []);

  const useCurrentLocation = () => {
    setLocStatus("loading");
    const finish = (d: string) => {
      setTempDistrict(d);
      setLocStatus("done");
      setTimeout(() => setLocStatus("idle"), 800);
    };
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => finish("Salem"),
        () => finish("Salem"),
        { timeout: 6000 },
      );
    } else finish("Salem");
  };

  const confirmDistrict = () => {
    setDistrict(tempDistrict);
    try {
      localStorage.setItem("thozhil_district", tempDistrict);
    } catch {}
    setLocPopup(false);
  };

  const filteredDistricts = useMemo(() => {
    const list = TN_DISTRICTS_ALL.filter((d) => d.toLowerCase().includes(pickerQuery.toLowerCase()));
    const popular = POPULAR_DISTRICTS.filter((d) => list.includes(d));
    const rest = list.filter((d) => !POPULAR_DISTRICTS.includes(d));
    return { popular, rest };
  }, [pickerQuery]);

  const filtered = WORKERS.filter(
    (w) =>
      (w.district === district || district === "All") &&
      (w.name.toLowerCase().includes(query.toLowerCase()) ||
        w.role.toLowerCase().includes(query.toLowerCase())),
  );


  return (
    <PhoneShell withNav>
      {locPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex w-full max-w-md animate-float-up flex-col rounded-t-3xl border border-border bg-card shadow-card" style={{ maxHeight: "85vh" }}>
            <div className="flex items-start justify-between px-5 pt-5">
              <div>
                <h3 className="font-display text-xl font-bold">உங்கள் இருப்பிடம்?</h3>
                <p className="text-sm text-muted-foreground">Where are you?</p>
              </div>
              <button onClick={() => setLocPopup(false)} className="grid size-8 place-items-center rounded-full bg-muted">
                <X className="size-4" />
              </button>
            </div>

            <div className="px-5 pt-4">
              <button
                onClick={useCurrentLocation}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-glow"
                style={{ background: "#FF6B00" }}
              >
                <Navigation className="size-4" />
                {locStatus === "loading" ? "Detecting…" : locStatus === "done" ? "Located ✓" : "Use my current location"}
              </button>
            </div>

            <div className="px-5 pt-3">
              <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={pickerQuery}
                  onChange={(e) => setPickerQuery(e.target.value)}
                  placeholder="Search district…"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-3">
              {filteredDistricts.popular.length > 0 && (
                <>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Popular</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {filteredDistricts.popular.map((d) => (
                      <button
                        key={d}
                        onClick={() => setTempDistrict(d)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          tempDistrict === d ? "border-transparent text-white" : "border-border bg-card text-foreground"
                        }`}
                        style={tempDistrict === d ? { background: "#FF6B00" } : {}}
                      >
                        {tempDistrict === d && <Check className="mr-1 inline size-3" />}{d}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {filteredDistricts.rest.length > 0 && (
                <>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">All districts</p>
                  <div className="flex flex-wrap gap-2">
                    {filteredDistricts.rest.map((d) => (
                      <button
                        key={d}
                        onClick={() => setTempDistrict(d)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          tempDistrict === d ? "border-transparent text-white" : "border-border bg-card text-foreground"
                        }`}
                        style={tempDistrict === d ? { background: "#FF6B00" } : {}}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-border p-4">
              <button
                onClick={confirmDistrict}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-glow"
                style={{ background: "#FF6B00" }}
              >
                Confirm Location · உறுதிப்படுத்து
              </button>
            </div>
          </div>
        </div>
      )}


      <header className="sticky top-0 z-30 bg-background/90 px-5 pb-3 pt-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOpenDistrict((o) => !o)}
            className="flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-sm"
          >
            <MapPin className="size-4 text-primary" />
            <span className="font-semibold">{district}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <Link to="/notifications" className="relative grid size-10 place-items-center rounded-full bg-card">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </Link>
        </div>

        {openDistrict && (
          <div className="absolute left-5 right-5 top-16 max-h-72 overflow-auto rounded-2xl border border-border bg-card p-2 shadow-card">
            {DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => { setDistrict(d); setOpenDistrict(false); }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-accent ${
                  d === district ? "text-primary" : ""
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-card px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find electrician, plumber..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="px-5">
        {/* SOS */}
        <Link
          to="/category/$id"
          params={{ id: "sos-alert" }}
          className="mt-3 flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4"
        >
          <div className="relative grid size-12 place-items-center rounded-xl bg-destructive">
            <Siren className="size-6 text-destructive-foreground" />
            <span className="absolute inset-0 animate-pulse-ring rounded-xl bg-destructive/40" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-destructive">Emergency SOS</p>
            <p className="text-sm font-semibold">Worker at your door in 15 mins</p>
            <p className="text-[11px] text-muted-foreground">அவசர சேவை · 24×7</p>
          </div>
          <span className="rounded-full bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground">
            SOS
          </span>
        </Link>

        {/* Categories */}
        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Services · சேவைகள்
          </h2>
          <Link to="/categories" className="text-xs font-semibold text-primary">View all →</Link>
        </div>
        <div className="mt-3 -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.slice(0, 10).map((c) => (
            <Link
              key={c.id}
              to="/category/$id"
              params={{ id: c.id }}
              className="group flex w-28 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:border-primary/40 hover:scale-105"
            >
              <div className="relative h-20 w-full overflow-hidden bg-muted">
                <img src={c.image} alt={c.en} loading="lazy" className="size-full object-cover transition group-hover:scale-110" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <span className="absolute right-1.5 top-1.5 rounded-full bg-background/90 px-1.5 py-0.5 text-sm">{c.icon}</span>
              </div>
              <div className="px-2.5 py-2">
                <p className="text-[11px] font-semibold leading-tight">{c.en}</p>
                <p className="text-[9px] text-muted-foreground">{c.ta}</p>
              </div>
            </Link>
          ))}
        </div>


        {/* Thozhilverse */}
        <Link
          to="/map"
          className="relative mt-6 block overflow-hidden rounded-3xl shadow-card"
        >
          <img src={verseHero} alt="Thozhilverse" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/70 to-transparent" />
          <div className="relative p-5">
            <Sparkles className="size-5 text-primary" />
            <h3 className="mt-2 font-display text-2xl font-black tracking-tight text-glow">
              THOZHILVERSE
            </h3>
            <p className="text-xs text-muted-foreground">A new universe of work · புதிய உலகம்</p>
            <p className="mt-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              Explore the live map →
            </p>
          </div>
        </Link>


        {/* Workers */}
        <div className="mb-3 mt-7 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Nearby Workers</h2>
          <Link to="/map" className="text-xs font-semibold text-primary">View map</Link>
        </div>
        <div className="space-y-3">
          {filtered.map((w, i) => (
            <div key={w.id} className="animate-float-up" style={{ animationDelay: `${i * 60}ms` }}>
              <WorkerCard worker={w} />
            </div>
          ))}
        </div>

        {/* Elder care callout */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧓</span>
            <div>
              <p className="font-semibold">Elder Care for parents</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Book a caregiver remotely for your parents back home.
              </p>
              <Link to="/category/$id" params={{ id: "elder" }} className="mt-2 inline-block text-xs font-semibold text-primary">
                Book on their behalf →
              </Link>

            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </PhoneShell>
  );
}
