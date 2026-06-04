import { PageHeader } from "@/components/console/PageHeader";

export default function ConsoleDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão inicial do console administrativo."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Admins", value: "12" },
          { label: "Places", value: "5.000" },
          { label: "Importações", value: "24" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}