"use client";

import { Bot, Database, MapPinned, Sparkles } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function AutoRegistrationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <Bot className="h-4 w-4" />
              Cadastro automático
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Atualização automática de estabelecimentos
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              O FoodFloripa realiza buscas periódicas automáticas em bases públicas e gratuitas do Google
              para identificar estabelecimentos e manter a base principal da plataforma sempre mais atualizada.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Base viva, curadoria contínua e enriquecimento futuro
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-sky-300" />
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    Como funciona
                  </h2>
                </div>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Periodicamente, o FoodFloripa consulta informações básicas de estabelecimentos disponíveis
                  em fontes públicas gratuitas do Google para apoiar a atualização da base principal da plataforma.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <MapPinned className="h-5 w-5 text-orange-300" />
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    Recomendação principal
                  </h2>
                </div>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  Sempre recomendamos que os dados básicos do estabelecimento tenham como origem o próprio
                  Google ou sejam confirmados diretamente pelo proprietário, para maior consistência em
                  informações como nome, localização, telefone e horários.
                </p>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    Enriquecimento de conteúdo
                  </h2>
                </div>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  A proposta do FoodFloripa é ir além dos dados básicos. Nós ofereceremos formas de enriquecer
                  essas informações com conteúdo visual, contexto, atmosfera, sugestões de destaque e outros
                  elementos que valorizem a experiência do estabelecimento dentro da plataforma.
                </p>
              </article>

              <article className="rounded-[24px] border border-sky-400/10 bg-sky-500/[0.06] p-5 md:p-6">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  Importante
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                  A presença automática na base não substitui a participação ativa do proprietário. Sempre que
                  possível, recomendamos o envio ou validação dos dados para melhorar a qualidade e a riqueza
                  das informações exibidas no FoodFloripa.
                </p>
              </article>

              <div className="pt-2">
                <Link
                  href="/add-your-business"
                  className="mr-3 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Cadastro manual
                </Link>

                <Link
                  href="/contact"
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