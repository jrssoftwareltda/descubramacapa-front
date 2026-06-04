// app/plans/page.tsx
"use client";

import { BadgeDollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <BadgeDollarSign className="h-4 w-4" />
              Planos e preços
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Planos e preços
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              O FoodFloripa possui uma política de preços relacionada ao tipo de destaque desejado para o anúncio
              do estabelecimento dentro da plataforma.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Propostas alinhadas ao perfil e à necessidade de cada negócio
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  Como funciona nossa política de preços
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Os valores podem variar de acordo com o tipo de destaque pretendido, nível de visibilidade,
                  formato de apresentação do estabelecimento e necessidades específicas de divulgação dentro
                  do FoodFloripa.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  Recomendação por segurança
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Por questões de segurança e melhor entendimento comercial, recomendamos que o proprietário
                  entre em contato por meio do nosso formulário de Fale Conosco para informar suas necessidades
                  e os principais detalhes do estabelecimento.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  O que enviar no contato
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Informe o nome do estabelecimento, localização, perfil do público, objetivos de divulgação,
                  tipo de destaque desejado e qualquer informação adicional que ajude a entender melhor sua necessidade.
                </p>
              </article>

              <article className="rounded-[24px] border border-sky-400/10 bg-sky-500/[0.06] p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-emerald-300" />
                  <div>
                    <h2 className="text-xl font-semibold text-white md:text-2xl">
                      Retorno com orçamento
                    </h2>
                    <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                      Após o envio das informações, retornaremos o quanto antes com um orçamento alinhado
                      às necessidades do seu negócio e ao tipo de presença desejada na plataforma.
                    </p>
                  </div>
                </div>
              </article>

              <div className="pt-2">
                <Link
                  href="/add-your-business"
                  className="mr-3 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Cadastro gratuito
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}