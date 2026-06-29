import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Upload, Check } from "lucide-react";
import { CATEGORIES, DISTRICTS } from "@/lib/thozhil-data";

export const Route = createFileRoute("/worker/register")({
  head: () => ({ meta: [{ title: "Worker Registration — THOZHIL" }] }),
  component: WorkerRegister,
});

function WorkerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "male",
    email: "",
    phone: "",
    aadhaar: "",
    address: "",
    district: "Salem",
    pincode: "",
    category: "electrician",
    experience: "",
    price: "",
    languages: "Tamil, English",
    bankAcc: "",
    ifsc: "",
    upi: "",
    workRadius: "5",
    availability: "fulltime",
    referredBy: "",
    photoUploaded: false,
    idUploaded: false,
    terms: false,
  });

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const canNext1 = form.fullName && form.phone.length === 10 && form.email && form.age;
  const canNext2 = form.address && form.district && form.pincode.length === 6;
  const canNext3 = form.category && form.experience && form.price;
  const canFinish = form.terms && form.photoUploaded && form.idUploaded;

  const submit = () => {
    try {
      localStorage.setItem("thozhil_worker", JSON.stringify({ ...form, id: "me", joinedAt: Date.now() }));
    } catch {}
    navigate({ to: "/worker/home" });
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="mx-auto max-w-md px-5 pt-8">
        <button onClick={() => (step === 1 ? navigate({ to: "/role" }) : setStep(step - 1))} className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" /> Back
        </button>

        <h1 className="mt-5 font-display text-2xl font-bold">Worker Registration</h1>
        <p className="text-xs text-muted-foreground">தொழிலாளர் பதிவு · Step {step} of 4</p>

        <div className="mt-4 flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-5">
          {step === 1 && (
            <>
              <p className="text-sm font-semibold">Personal details</p>
              <Field label="Full name *">
                <input className={inp} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="As per Aadhaar" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Age *">
                  <input type="number" className={inp} value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="28" />
                </Field>
                <Field label="Gender">
                  <select className={inp} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>
              <Field label="Mobile number *">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
                  <span className="text-sm text-muted-foreground">+91</span>
                  <input maxLength={10} className="flex-1 bg-transparent text-sm outline-none" value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" />
                </div>
              </Field>
              <Field label="Email *">
                <input type="email" className={inp} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@gmail.com" />
              </Field>
              <Field label="Languages spoken">
                <input className={inp} value={form.languages} onChange={(e) => set("languages", e.target.value)} placeholder="Tamil, English" />
              </Field>
              <button disabled={!canNext1} onClick={() => setStep(2)} className={btnPri}>
                Continue <ArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-semibold">Address & service area</p>
              <Field label="Full address *">
                <textarea rows={3} className={inp} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Door no, street, area" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="District *">
                  <select className={inp} value={form.district} onChange={(e) => set("district", e.target.value)}>
                    {DISTRICTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pincode *">
                  <input maxLength={6} className={inp} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} placeholder="636001" />
                </Field>
              </div>
              <Field label="Work radius (km)">
                <input type="number" className={inp} value={form.workRadius} onChange={(e) => set("workRadius", e.target.value)} placeholder="5" />
              </Field>
              <Field label="Aadhaar number">
                <input maxLength={12} className={inp} value={form.aadhaar} onChange={(e) => set("aadhaar", e.target.value.replace(/\D/g, ""))} placeholder="XXXX XXXX XXXX" />
              </Field>
              <button disabled={!canNext2} onClick={() => setStep(3)} className={btnPri}>
                Continue <ArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm font-semibold">Work & skills</p>
              <Field label="Primary skill / category *">
                <select className={inp} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.en}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Years of experience *">
                <input type="number" className={inp} value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="5" />
              </Field>
              <Field label="Charge per visit (₹) *">
                <input type="number" className={inp} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="350" />
              </Field>
              <Field label="Availability">
                <select className={inp} value={form.availability} onChange={(e) => set("availability", e.target.value)}>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="weekend">Weekends only</option>
                </select>
              </Field>
              <Field label="Bank account">
                <input className={inp} value={form.bankAcc} onChange={(e) => set("bankAcc", e.target.value)} placeholder="A/c number" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="IFSC">
                  <input className={inp} value={form.ifsc} onChange={(e) => set("ifsc", e.target.value.toUpperCase())} placeholder="SBIN0001234" />
                </Field>
                <Field label="UPI ID">
                  <input className={inp} value={form.upi} onChange={(e) => set("upi", e.target.value)} placeholder="name@upi" />
                </Field>
              </div>
              <Field label="Referred by (optional)">
                <input className={inp} value={form.referredBy} onChange={(e) => set("referredBy", e.target.value)} placeholder="Phone / name" />
              </Field>
              <button disabled={!canNext3} onClick={() => setStep(4)} className={btnPri}>
                Continue <ArrowRight className="size-4" />
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-sm font-semibold">Verification & documents</p>
              <UploadBox label="Profile photo *" done={form.photoUploaded} onUpload={() => set("photoUploaded", true)} />
              <UploadBox label="Aadhaar / ID proof *" done={form.idUploaded} onUpload={() => set("idUploaded", true)} />
              <label className="flex items-start gap-2 rounded-xl bg-muted p-3 text-xs">
                <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} className="mt-0.5" />
                <span>I agree to THOZHIL Trust policy, background verification and fair pricing terms.</span>
              </label>
              <button disabled={!canFinish} onClick={submit} className={btnPri}>
                <ShieldCheck className="size-4" /> Submit & Start earning
              </button>
              <p className="text-center text-[11px] text-muted-foreground">Verification usually completes in 24 hrs</p>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already registered? <Link to="/login" search={{ role: "worker" } as any} className="font-semibold text-primary">Worker Login</Link>
        </p>
      </div>
    </div>
  );
}

const inp =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";
const btnPri =
  "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition disabled:opacity-40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function UploadBox({ label, done, onUpload }: { label: string; done: boolean; onUpload: () => void }) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className={`flex w-full items-center gap-3 rounded-xl border-2 border-dashed p-4 text-left transition ${
        done ? "border-success bg-success/10" : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <div className={`grid size-10 place-items-center rounded-lg ${done ? "bg-success text-success-foreground" : "bg-muted"}`}>
        {done ? <Check className="size-5" /> : <Upload className="size-5 text-muted-foreground" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">{done ? "Uploaded" : "Tap to upload (jpg/png/pdf)"}</p>
      </div>
    </button>
  );
}
