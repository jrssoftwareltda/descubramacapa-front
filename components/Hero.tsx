"use client";

import { Flame } from "lucide-react";

export function Hero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  filters,
  meta,
}: {
  title: string;
  subtitle: string;
  eyebrow: string;
  backgroundImage: string;
  filters: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-visible px-4 pb-6 pt-4 md:px-8 md:pb-8">
      <div className="mx-auto max-w-7xl overflow-visible rounded-[32px] border border-white/10 bg-slate-950/40 shadow-[0_30px_120px_rgba(2,6,23,0.6)]">
        <div
          className="relative min-h-[540px] overflow-visible bg-cover bg-center md:min-h-[620px]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.78) 32%, rgba(2,6,23,0.35) 58%, rgba(2,6,23,0.78) 100%), url('${backgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.18),transparent_24%)]" />

          <div className="relative flex min-h-[540px] flex-col justify-between overflow-visible px-6 py-8 md:min-h-[620px] md:px-10 md:py-10">
            <div className="max-w-xl pt-8 md:pt-16">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-sm font-medium text-orange-200 backdrop-blur-md">
                <Flame className="h-4 w-4" />
                {eyebrow}
              </div>

              <h1 className="max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                {title}
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-200/90 md:text-2xl md:leading-10">
                {subtitle}
              </p>
            </div>

            <div className="relative z-50 space-y-5 overflow-visible">
              {filters}
              {meta}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}