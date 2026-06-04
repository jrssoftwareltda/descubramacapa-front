"use client";

import Link from "next/link";
import { Camera, ChefHat, Fish, Martini } from "lucide-react";

type RecommendedPlaceItem = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  primaryImageUrl?: string;
  priceLabel?: string;
};

type RecommendedShowcase = {
  key: string;
  title: string;
  icon: "camera" | "chef" | "drink" | "fish";
  places: RecommendedPlaceItem[];
};

function RecommendedIcon({ type }: { type: RecommendedShowcase["icon"] }) {
  if (type === "camera") return <Camera className="h-4 w-4" />;
  if (type === "chef") return <ChefHat className="h-4 w-4" />;
  if (type === "drink") return <Martini className="h-4 w-4" />;
  return <Fish className="h-4 w-4" />;
}

export function RecommendedRow({ items }: { items: RecommendedShowcase[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => {
        const firstPlace = item.places?.[0];

        if (!firstPlace) return null;

        return (
          <Link
            key={item.key}
            href={`/place/${firstPlace.slug}`}
            className="block"
          >
            <article className="group overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={firstPlace.primaryImageUrl || "/placeholder.jpg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 text-white">
                  <div>
                    <div className="inline-flex items-center gap-2 text-lg font-semibold">
                      <RecommendedIcon type={item.icon} />
                      {item.title}
                    </div>

                    <div className="mt-1 text-sm text-white/75">
                      {firstPlace.name}
                    </div>
                  </div>

                  <span className="text-sm text-white/70">
                    {firstPlace.priceLabel}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}