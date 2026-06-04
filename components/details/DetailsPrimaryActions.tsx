"use client";

import type { ReactNode } from "react";

export type DetailsPrimaryActionItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

type DetailsPrimaryActionsProps = {
  actions: DetailsPrimaryActionItem[];
};

export function DetailsPrimaryActions({
  actions,
}: DetailsPrimaryActionsProps) {
  if (!actions?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => {
        const content = (
          <>
            <span className="shrink-0">{action.icon}</span>
            <span>{action.label}</span>
          </>
        );

        const baseClassName =
          "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition duration-200 hover:scale-[1.02] hover:bg-white/15 active:scale-[0.99]";

        if (action.href) {
          return (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClassName}
              aria-label={action.label}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className={baseClassName}
            aria-label={action.label}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}