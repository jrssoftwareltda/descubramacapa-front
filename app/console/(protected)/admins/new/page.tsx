"use client";

import { useRouter } from "next/navigation";
import { AdminForm } from "@/components/console/AdminForm";
import { PageHeader } from "@/components/console/PageHeader";
import { adminService } from "@/services/adminService";

export default function NewAdminPage() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="Novo administrador"
        description="Cadastre um novo usuário administrativo."
      />

      <AdminForm
        submitLabel="Criar administrador"
        initialValues={{
          name: "",
          email: "",
          role: "ADMIN",
          status: "ACTIVE",
        }}
        onSubmit={async (values) => {
          await adminService.create(values);
          router.push("/console/admins");
        }}
      />
    </div>
  );
}