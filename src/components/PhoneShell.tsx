import type { ReactNode } from "react";

export function PhoneShell({ children, withNav = false }: { children: ReactNode; withNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`mx-auto max-w-md ${withNav ? "pb-24" : ""}`}>{children}</div>
    </div>
  );
}
