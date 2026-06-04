"use client";

import { ValueItem } from "@/types/types";
import { HeartHandshake, Sparkles, Users } from "lucide-react";

function ValueIcon({ type }: { type: ValueItem["icon"] }) {
  if (type === "sparkles") return <Sparkles className="h-5 w-5 text-sky-300" />;
  if (type === "users") return <Users className="h-5 w-5 text-orange-300" />;
  return <HeartHandshake className="h-5 w-5 text-emerald-300" />;
}

export function ValueGrid({ items }: { items: ValueItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90">
            <ValueIcon type={item.icon} />
            {item.title}
          </div>
          <p className="mt-5 text-base leading-8 text-slate-300">{item.description}</p>
        </article>
      ))}
    </div>
  );
}