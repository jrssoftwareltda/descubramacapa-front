"use client";

import { DetailsTagItem } from "@/types/types";
import { Flame, Heart, Users, Utensils } from "lucide-react";

function TagIcon({ type }: { type: DetailsTagItem["icon"] }) {
  if (type === "flame") return <Flame className="h-5 w-5 text-orange-300" />;
  if (type === "group") return <Users className="h-5 w-5 text-slate-200" />;
  if (type === "plate") return <Utensils className="h-5 w-5 text-sky-200" />;
  return <Heart className="h-5 w-5 text-amber-300" />;
}

export function DetailsTagChips({ items }: { items: DetailsTagItem[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={[
            "inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-lg text-white/90 shadow-lg backdrop-blur-lg md:text-2xl",
            item.highlight ? "bg-white/[0.04]" : "bg-sky-500/10",
          ].join(" ")}
        >
          <TagIcon type={item.icon} />
          {item.label}
        </div>
      ))}
    </div>
  );
}