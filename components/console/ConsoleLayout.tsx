import { ReactNode } from "react";
import { ConsoleSidebar } from "./ConsoleSidebar";
import { ConsoleHeader } from "./ConsoleHeader";

export function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ConsoleSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <ConsoleHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}