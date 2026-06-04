"use client";

import { DetailsCategoryItem } from "@/types/types";
import {
  Camera,
  Soup,
  SunMedium,
  UtensilsCrossed,
} from "lucide-react";

function CategoryIcon({ type }: { type: DetailsCategoryItem["icon"] }) {
  if (type === "dish") return <Soup className="h-5 w-5" />;
  if (type === "chair") return <UtensilsCrossed className="h-5 w-5" />;
  if (type === "sunset") return <SunMedium className="h-5 w-5" />;
  return <Camera className="h-5 w-5" />;
}

type DetailsCategoryTabsProps = {
  items: DetailsCategoryItem[];
  onSelect?: (item: DetailsCategoryItem) => void;
};

export function DetailsCategoryTabs({
  items,
  onSelect,
}: DetailsCategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-5 text-lg text-white/75 md:text-xl">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item)}
          className={[
            "inline-flex items-center gap-3 rounded-2xl px-5 py-3 transition duration-200",
            "border border-transparent cursor-pointer",
            item.active
              ? "bg-sky-500/10 text-white shadow-inner shadow-sky-400/10 border-sky-400/20"
              : "hover:bg-white/5 hover:text-white",
          ].join(" ")}
          aria-pressed={item.active}
        >
          <CategoryIcon type={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}