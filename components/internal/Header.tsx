"use client";

import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border border-white/15 bg-slate-950/50 px-5 py-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition"
          >
            <Image
              src="/logo_food_floripa.svg"
              alt="FoodFloripa"
              width={160}
              height={40}
              priority
              className="h-8 md:h-9 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
