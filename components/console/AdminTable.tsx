"use client";

import Link from "next/link";
import { AdminUser } from "@/types/admin";

export function AdminTable({ admins }: { admins: AdminUser[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Nome</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Email</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Perfil</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="px-4 py-4 text-sm font-medium text-slate-900">{admin.name}</td>
              <td className="px-4 py-4 text-sm text-slate-600">{admin.email}</td>
              <td className="px-4 py-4 text-sm text-slate-600">{admin.role}</td>
              <td className="px-4 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  admin.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-700"
                }`}>
                  {admin.status}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                <Link
                  href={`/console/admins/${admin.id}/edit`}
                  className="text-sm font-semibold text-slate-900 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}