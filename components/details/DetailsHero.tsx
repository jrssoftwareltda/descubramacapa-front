"use client";

export function DetailsHero({
  title,
  subtitle,
  price,
  status,
  backgroundImage,
  children,
}: {
  title: string;
  subtitle: string;
  price: string;
  status: string;
  backgroundImage: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-[0_30px_120px_rgba(2,6,23,0.6)]">
        <div
          className="relative min-h-[760px] bg-cover bg-center md:min-h-[860px]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.1) 18%, rgba(2,6,23,0.68) 60%, rgba(2,6,23,0.95) 100%), linear-gradient(90deg, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.55) 34%, rgba(2,6,23,0.18) 60%, rgba(2,6,23,0.5) 100%), url('${backgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_20%)]" />

          <div className="relative flex min-h-[760px] flex-col justify-between px-6 py-8 md:min-h-[860px] md:px-10 md:py-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-2">
                <span className="h-1.5 w-24 rounded-full bg-white/20" />
                <span className="h-1.5 w-16 rounded-full bg-white/20" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-3xl space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                  {title}
                </h1>

                <p className="text-2xl text-white/90 md:text-4xl">
                  {subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-2xl text-white/90 md:text-3xl">
                  <span>{price}</span>
                  <span className="text-emerald-400">✓ {status}</span>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}