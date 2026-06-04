"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/console/dashboard" },
  { label: "Admins", href: "/console/admins" },
  { label: "Importação", href: "/console/imports" },
  { label: "Places", href: "/console/places" },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-8 text-xl font-bold text-slate-900">FoodFloripa</div>

      <nav className="space-y-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}