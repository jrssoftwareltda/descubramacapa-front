"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

type FriendlyErrorStateProps = {
  title?: string;
  message?: string;
  details?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
};

export function FriendlyErrorState({
  title = "Não foi possível carregar este conteúdo",
  message = "Ocorreu um problema ao buscar os dados. Tente novamente em instantes.",
  details,
  actionLabel = "Tentar novamente",
  onAction,
  compact = false,
}: FriendlyErrorStateProps) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl ${
        compact ? "p-5" : "p-8 md:p-10"
      }`}
    >
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="flex-1 space-y-2">
          <h3
            className={`font-bold text-white ${
              compact ? "text-lg" : "text-2xl"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-slate-300 ${
              compact ? "text-sm" : "text-base md:text-lg"
            }`}
          >
            {message}
          </p>

          {details ? (
            <p className="text-sm text-slate-500">{details}</p>
          ) : null}
        </div>

        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-5 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20"
          >
            <RefreshCcw className="h-4 w-4" />
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}