"use client";

export function DetailsInfoBar({
  items,
}: {
  items: { label: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-6 border-y border-white/10 py-5 text-xl text-slate-300 md:text-2xl">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-3">
          <span className="text-slate-400">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}