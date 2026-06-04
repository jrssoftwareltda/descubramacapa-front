"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminForm, AdminFormValues } from "@/components/console/AdminForm";
import { PageHeader } from "@/components/console/PageHeader";
import { adminService } from "@/services/adminService";

export default function EditAdminPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<AdminFormValues>({
    name: "",
    email: "",
    role: "ADMIN",
    status: "ACTIVE",
  });

  useEffect(() => {
    adminService.findById(params.id).then((admin) => {
      if (admin) {
        setInitialValues({
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: admin.status,
        });
      }
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Editar administrador"
        description="Atualize os dados do usuário administrativo."
      />

      <AdminForm
        submitLabel="Salvar alterações"
        initialValues={initialValues}
        onSubmit={async (values) => {
          await adminService.update(params.id, values);
          router.push("/console/admins");
        }}
      />
    </div>
  );
}
