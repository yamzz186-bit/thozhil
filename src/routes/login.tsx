import { createFileRoute, useNavigate, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, ArrowRight, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import logo from "@/assets/thozhil-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — THOZHIL" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    role: (s.role === "worker" ? "worker" : "customer") as "customer" | "worker",
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [tab, setTab] = useState<"customer" | "worker">(search.role);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const goNext = () => {
    if (tab === "worker") navigate({ to: "/worker/home" });
    else navigate({ to: "/home" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Airbnb-style full-bleed background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>


      <div className="relative mx-auto max-w-md px-6 pt-10 pb-10">
        <button onClick={() => navigate({ to: "/role" })} className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" /> Back
        </button>

        <Link to="/" className="mt-6 flex justify-center">
          <div className="relative">
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-primary/30" />
            <div className="relative grid size-20 place-items-center rounded-2xl bg-white p-2 shadow-glow">
              <img src={logo} alt="THOZHIL" className="size-full object-contain" />
            </div>
          </div>
        </Link>

        <h1 className="mt-6 text-center font-display text-3xl font-bold animate-float-up">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground animate-float-up" style={{ animationDelay: "120ms" }}>
          <Sparkles className="mr-1 inline size-3.5 text-primary" />
          வணக்கம் · Sign in to continue
        </p>


        <div className="mt-8 flex rounded-2xl bg-card p-1">
          {(["customer", "worker"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-3 text-sm font-semibold capitalize transition ${
                tab === t ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              {t === "customer" ? "Customer" : "Worker"}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {step === "phone" ? (
            <>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Mobile number</span>
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3.5">
                  <Phone className="size-4 text-primary" />
                  <span className="text-sm text-muted-foreground">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </label>
              <button
                disabled={phone.length !== 10}
                onClick={() => setStep("otp")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40"
              >
                Send OTP <ArrowRight className="size-4" />
              </button>
            </>
          ) : (
            <>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Enter 6-digit OTP</span>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-center text-2xl tracking-[0.5em] outline-none focus:border-primary"
                />
                <p className="mt-2 text-xs text-muted-foreground">Sent to +91 {phone}</p>
              </label>
              <button
                onClick={goNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-glow"
              >
                Verify & Continue <ArrowRight className="size-4" />
              </button>
            </>
          )}

          {tab === "worker" && (
            <p className="text-center text-xs text-muted-foreground">
              New worker? <Link to="/worker/register" className="font-semibold text-primary">Register here</Link>
            </p>
          )}

          <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" /> Secured by THOZHIL Trust
          </p>
        </div>
      </div>
    </div>
  );
}
