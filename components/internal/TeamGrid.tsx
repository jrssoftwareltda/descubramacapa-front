"use client";

import { TeamMember } from "@/types/types";

export function TeamGrid({ items }: { items: TeamMember[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/50 shadow-2xl backdrop-blur-xl"
        >
          <div className="h-72 overflow-hidden">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="p-5">
            <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
            <p className="mt-2 text-base text-slate-300">{item.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}