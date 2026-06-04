"use client";

import { FileText, ShieldCheck } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Aceitação dos termos",
    content:
      "Ao acessar e utilizar o FoodFloripa, você concorda com estes Termos de Uso. Caso não concorde com qualquer condição, recomendamos que não utilize a plataforma.",
  },
  {
    title: "2. Objetivo da plataforma",
    content:
      "O FoodFloripa é uma plataforma pública de descoberta de estabelecimentos e experiências gastronômicas em Florianópolis, com foco em conteúdo visual, navegação simples e curadoria de lugares.",
  },
  {
    title: "3. Uso permitido",
    content:
      "Você concorda em utilizar a plataforma de forma lícita, respeitosa e de acordo com a legislação aplicável, sem tentar comprometer a segurança, a disponibilidade ou a integridade do serviço.",
  },
  {
    title: "4. Conteúdo e informações",
    content:
      "As informações exibidas no FoodFloripa podem ser atualizadas, revisadas ou removidas a qualquer momento. Embora busquemos manter o conteúdo o mais preciso possível, horários, preços, imagens e descrições podem sofrer alterações pelos próprios estabelecimentos ou por fatores externos.",
  },
  {
    title: "5. Propriedade intelectual",
    content:
      "O layout, identidade visual, marca, textos, estrutura da plataforma e demais elementos do FoodFloripa não podem ser copiados, reproduzidos ou distribuídos sem autorização prévia, exceto quando permitido por lei.",
  },
  {
    title: "6. Links e terceiros",
    content:
      "A plataforma pode apresentar links para redes sociais, mapas, serviços de contato e páginas de terceiros. O FoodFloripa não se responsabiliza pelo conteúdo, políticas ou práticas desses serviços externos.",
  },
  {
    title: "7. Limitação de responsabilidade",
    content:
      "O FoodFloripa atua como plataforma informativa e de descoberta. Não garantimos disponibilidade contínua, ausência de erros ou adequação total das informações para todas as situações. O uso da plataforma é de responsabilidade do usuário.",
  },
  {
    title: "8. Alterações destes termos",
    content:
      "Podemos atualizar estes Termos de Uso periodicamente para refletir melhorias, mudanças legais ou novas funcionalidades. Recomendamos a consulta regular desta página.",
  },
  {
    title: "9. Contato",
    content:
      "Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelos canais oficiais informados na plataforma.",
  },
];

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <FileText className="h-4 w-4" />
              Documento institucional
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Termos de Uso
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Estes termos definem as condições gerais de acesso e uso da plataforma FoodFloripa.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Última atualização: 14/04/2026 15:11
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6"
                >
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                    {section.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
