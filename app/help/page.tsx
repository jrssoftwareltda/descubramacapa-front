// app/help/page.tsx
"use client";

import { CircleHelp, Mail, Search, ShieldCheck } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const faqItems = [
  {
    question: "O FoodFloripa é gratuito para quem acessa a plataforma?",
    answer:
      "Sim. O acesso público ao FoodFloripa é gratuito para usuários que desejam descobrir restaurantes, bares e experiências gastronômicas em Florianópolis.",
  },
  {
    question: "Como um estabelecimento pode aparecer no FoodFloripa?",
    answer:
      "O estabelecimento pode aparecer por cadastro manual solicitado pelo proprietário ou por atualização automática baseada em fontes públicas gratuitas, sempre com possibilidade de enriquecimento posterior.",
  },
  {
    question: "O cadastro do estabelecimento é gratuito?",
    answer:
      "Sim. Neste momento, o cadastro inicial do estabelecimento é gratuito. Recomendamos que a solicitação seja feita pelo formulário de Fale Conosco.",
  },
  {
    question: "Como funcionam os planos e preços?",
    answer:
      "Os valores podem variar conforme o tipo de destaque desejado para o anúncio. Por segurança e melhor alinhamento comercial, o ideal é entrar em contato e informar as necessidades do estabelecimento.",
  },
  {
    question: "Os dados dos estabelecimentos podem ser atualizados?",
    answer:
      "Sim. O FoodFloripa busca manter a base atualizada periodicamente, mas também recomenda que os dados básicos sejam confirmados pelo Google ou pelo próprio proprietário.",
  },
  {
    question: "Como posso corrigir uma informação incorreta?",
    answer:
      "Você pode entrar em contato pelo formulário da página de Fale Conosco, informando o nome do estabelecimento e quais dados precisam ser corrigidos.",
  },
  {
    question: "O FoodFloripa garante horários, preços ou disponibilidade?",
    answer:
      "Não. As informações podem mudar por decisão do estabelecimento ou fatores externos. Recomendamos sempre confirmar diretamente com o local antes da visita.",
  },
  {
    question: "Como entro em contato com a equipe do FoodFloripa?",
    answer:
      "Você pode usar o formulário da página de Fale Conosco para dúvidas, correções, parcerias, cadastro de negócio ou solicitações comerciais.",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <CircleHelp className="h-4 w-4" />
              Central de ajuda
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Como podemos ajudar?
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Reunimos aqui respostas objetivas para as principais dúvidas sobre o funcionamento
              do FoodFloripa, cadastro de estabelecimentos, atualização de informações e contato com nossa equipe.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Suporte informativo para usuários e proprietários
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Search className="h-5 w-5 text-sky-300" />
                <p className="text-base leading-7 md:text-lg">
                  Não encontrou sua resposta? Use nosso canal de contato e envie sua dúvida com o máximo
                  de detalhes possível.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6"
                >
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    {item.question}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-sky-400/10 bg-sky-500/[0.06] p-5 md:p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-sky-300" />
                <div>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    Precisa de ajuda personalizada?
                  </h2>
                  <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                    Para dúvidas específicas, correções de cadastro, parcerias, orçamento ou solicitações
                    comerciais, recomendamos utilizar a página de Fale Conosco.
                  </p>

                  <div className="mt-5">
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}