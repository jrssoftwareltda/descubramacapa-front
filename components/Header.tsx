"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  onSearch?: (query: string) => void;
  initialQuery?: string;
  allowEmptySearch?: boolean;
};

export function Header({
  onSearch,
  initialQuery = "",
  allowEmptySearch = false,
}: HeaderProps) {
  const [query, setQuery] = useState(initialQuery);

  const submitSearch = useCallback(() => {
    const value = query.trim();

    if (!allowEmptySearch && !value) {
      return;
    }

    onSearch?.(value);
  }, [allowEmptySearch, onSearch, query]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submitSearch();
    },
    [submitSearch],
  );

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border border-white/15 bg-slate-950/50 px-5 py-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition"
          >
            <p className="text-2xl font-bold text-white">DescubraMacapa</p>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl"
          role="search"
          aria-label="Buscar places"
        >
          <div className="group flex w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-slate-300 shadow-inner shadow-white/5 transition-all duration-300 ease-out focus-within:border-sky-400/40 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(56,189,248,0.08)]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400"
              placeholder="Descubra lugares, pratos e experiências em Floripa..."
              aria-label="Pesquisar"
            />

            <button
              type="submit"
              aria-label="Buscar"
              className="flex items-center justify-center border-l border-white/10 px-4 text-slate-400 transition-colors duration-200 hover:bg-white/10 hover:text-white group-focus-within:text-sky-300"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
