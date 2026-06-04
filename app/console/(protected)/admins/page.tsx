"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/console/PageHeader";
import { AdminTable } from "@/components/console/AdminTable";
import { adminService } from "@/services/adminService";
import { AdminUser } from "@/types/admin";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.findAll().then((data) => {
      setAdmins(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader
        title="Administradores"
        description="Gerencie os usuários administrativos do console."
        actions={
          <Link
            href="/console/admins/new"
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Novo admin
          </Link>
        }
      />

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Carregando administradores...
        </div>
      ) : (
        <AdminTable admins={admins} />
      )}
    </div>
  );
}