"use client";

import { MapPin, Flame, SunMedium, Clock3, Star, UtensilsCrossed, Martini, Users, Heart } from "lucide-react";
import { TrendingPlace } from "@/types/types";
import Link from "next/link";

function badgeToneClass(type?: string) {
  switch (type) {
    case "commercial":
      return "bg-orange-500/90 text-white";
    case "category":
      return "bg-sky-500/90 text-white";
    case "experience":
      return "bg-amber-200 text-amber-950";
    case "status":
      return "bg-emerald-500/90 text-white";
    default:
      return "bg-blue-500/90 text-white";
  }
}

function badgeIcon(slug?: string, type?: string) {
  if (slug === "trending") return <Flame className="h-4 w-4" />;
  if (slug === "highlight") return <Star className="h-4 w-4" />;
  if (slug === "new") return <Star className="h-4 w-4" />;
  if (slug === "por-do-sol") return <SunMedium className="h-4 w-4" />;
  if (slug === "open-now" || slug === "closing-soon" || slug === "opens-later") {
    return <Clock3 className="h-4 w-4" />;
  }
  if (slug === "frutos-do-mar" || slug === "hamburguer" || slug === "sushi" || slug === "massas") {
    return <UtensilsCrossed className="h-4 w-4" />;
  }
  if (slug === "drinks") return <Martini className="h-4 w-4" />;
  if (slug === "familia") return <Users className="h-4 w-4" />;
  if (slug === "romantico") return <Heart className="h-4 w-4" />;

  if (type === "status") return <Clock3 className="h-4 w-4" />;
  if (type === "commercial") return <Flame className="h-4 w-4" />;
  if (type === "experience") return <Star className="h-4 w-4" />;

  return <Star className="h-4 w-4" />;
}

export function TrendingGrid({ items }: { items: TrendingPlace[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => {
        const primaryBadge = item.badges?.[0];
        const secondaryBadges = item.badges?.slice(1, 3) ?? [];

        return (
          <Link key={item.id} href={`/place/${item.slug ?? item.id}`} className="block">
            <article className="overflow-hidden rounded-[24px] border border-white/10 bg-white/95 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.38)]">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                {primaryBadge && (
                  <div className="absolute left-3 top-3">
                    <span
                      className={
                        badgeToneClass(primaryBadge.type) +
                        " inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold shadow-lg"
                      }
                    >
                      {badgeIcon(primaryBadge.slug, primaryBadge.type)}
                      {primaryBadge.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 p-5">
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>

                {item.subtitle && (
                  <p className="text-lg text-slate-600">{item.subtitle}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2 text-sm">
                  {secondaryBadges.map((badge) => (
                    <div
                      key={`${item.id}-${badge.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700"
                    >
                      {badgeIcon(badge.slug, badge.type)}
                      <span>{badge.label}</span>
                    </div>
                  ))}

                  {item.distance && (
                    <div className="inline-flex items-center gap-1 text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      {item.distance}
                    </div>
                  )}
                </div>

                {item.price && (
                  <div className="pt-2">
                    <span className="text-xl font-extrabold tracking-tight text-slate-800">
                      {item.price}
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}