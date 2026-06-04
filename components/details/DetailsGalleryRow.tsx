"use client";

import {
  Camera,
  Soup,
  SunMedium,
  UtensilsCrossed,
} from "lucide-react";
import { DetailsGalleryItem } from "@/types/types";

function GalleryIcon({ type }: { type: DetailsGalleryItem["icon"] }) {
  if (type === "dish") return <Soup className="h-5 w-5" />;
  if (type === "chair") return <UtensilsCrossed className="h-5 w-5" />;
  if (type === "sunset") return <SunMedium className="h-5 w-5" />;
  return <Camera className="h-5 w-5" />;
}

function badgeLabel(icon: DetailsGalleryItem["icon"]) {
  if (icon === "dish") return "Sabores";
  if (icon === "chair") return "Ambiente";
  if (icon === "sunset") return "Vista";
  return "Registros";
}

export function DetailsGalleryRow({ items }: { items: DetailsGalleryItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id}
          className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20"
        >
          <div className="relative h-[340px] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%)] opacity-80" />

            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md">
                <GalleryIcon type={item.icon} />
                {badgeLabel(item.icon)}
              </span>
            </div>

            <div className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="space-y-3">
                {item.eyebrow ? (
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-300">
                    {item.eyebrow}
                  </p>
                ) : null}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {item.title}
                    </h3>

                    {item.description ? (
                      <p className="mt-2 line-clamp-3 max-w-[92%] text-sm leading-6 text-slate-200/90">
                        {item.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-slate-300/90">
                        Explore este destaque do lugar.
                      </p>
                    )}
                  </div>
                </div>

                {item.meta?.length ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.meta.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={`${item.id}-${tagIndex}`}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/5" />
        </article>
      ))}
    </div>
  );
}
