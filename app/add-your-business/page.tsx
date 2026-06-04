// app/cadastre-seu-negocio/page.tsx
"use client";

import { BriefcaseBusiness, Mail, Sparkles } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function RegisterBusinessPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <BriefcaseBusiness className="h-4 w-4" />
              Para estabelecimentos
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Cadastre seu negócio
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Quer divulgar seu restaurante, bar, café ou outro estabelecimento no FoodFloripa?
              O cadastro é gratuito e pode ser solicitado de forma simples pelo nosso canal de contato.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Solicitação rápida, sem custo de cadastro
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  Como solicitar
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Para pedir o cadastro do seu negócio, basta enviar uma mensagem pelo formulário da página
                  de Fale Conosco informando os dados principais do estabelecimento.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  O que informar
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Envie nome do estabelecimento, localização, tipo de negócio, telefone, Instagram e,
                  se possível, algumas fotos para análise inicial.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  Cadastro gratuito
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Neste momento, o cadastro no FoodFloripa é gratuito. Após o envio, sua solicitação poderá
                  ser analisada antes da publicação.
                </p>
              </article>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]"
                >
                  Fale conosco
                </Link>
              </div>

              <div className="rounded-[24px] border border-sky-400/10 bg-sky-500/[0.06] p-5 text-sm leading-7 text-slate-300">
                Dica: no formulário de contato, use o assunto <span className="font-semibold text-white">“Cadastro de negócio” </span>
                para facilitar a triagem da solicitação.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}