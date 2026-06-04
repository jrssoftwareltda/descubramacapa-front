"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { DetailsPlaceRecommendation } from "@/types/types";

export function DetailsRecommendationRow({
  items,
}: {
  items: DetailsPlaceRecommendation[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/place/${item.slug}`}
          className="group block"
        >
          <article className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-lg transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
            
            {/* imagem */}
            <div className="h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* conteúdo */}
            <div className="space-y-3 p-5">
              <h3 className="text-xl font-semibold text-white group-hover:text-sky-300 transition">
                {item.title}
              </h3>

              <p className="text-sm text-slate-400">
                {item.subtitle}
              </p>

              {/* distância */}
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4" />
                {item.distance}
              </div>

              {/* preço */}
              <p className="pt-1 text-right text-xl font-bold text-white">
                {item.price}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}