"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { LoginResponse } from "@/types/admin";

export function ConsoleHeader() {
  const router = useRouter();
  const [session, setSession] = useState<LoginResponse | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSession(authService.getSession());
    setMounted(true);
  }, []);

  function handleLogout() {
    authService.logout();
    router.push("/console/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Console</h1>
        <p className="text-sm text-slate-500">Área administrativa do FoodFloripa</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">
            {mounted ? (session?.user.name ?? "Usuário") : "Usuário"}
          </p>
          <p className="text-xs text-slate-500">
            {mounted ? (session?.user.role ?? "-") : "-"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Sair
        </button>
      </div>
    </header>
  );
}