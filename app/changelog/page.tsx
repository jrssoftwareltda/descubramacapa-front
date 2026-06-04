"use client";

import {
  AlertCircle,
  History,
  Mail,
  MousePointerClick,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";

const changelogItems = [
  {
    date: "14 de abril de 2026",
    version: "v1.4.0",
    category: "Contato e comunicação",
    title: "Fluxo de contato por e-mail revisado",
    description:
      "Ajustamos o fluxo de envio de mensagens do FoodFloripa para melhorar a comunicação com usuários e negócios, corrigindo problemas no formulário e refinando a experiência do botão de envio.",
    items: [
      "Revisão do fluxo de envio de e-mail de contato",
      "Correção no conteúdo enviado pela mensagem",
      "Melhoria visual e de interação no botão “Enviar mensagem”",
    ],
  },
  {
    date: "13 de abril de 2026",
    version: "v1.3.0",
    category: "Descoberta de lugares",
    title: "Busca, navegação e paginação mais claras",
    description:
      "Melhoramos a experiência de descoberta de lugares com ajustes no comportamento da busca, paginação mais previsível e navegação mais consistente na home.",
    items: [
      "Busca refinada para exibir resultados de forma mais objetiva",
      "Paginação atualizada para substituir os cards pelos próximos resultados",
      "Inclusão de botão de voltar e estado de loading mais coerente com o tema",
    ],
  },
  {
    date: "12 de abril de 2026",
    version: "v1.2.0",
    category: "Página de detalhes",
    title: "Nova seção de relacionados nas páginas de place",
    description:
      "Substituímos uma seção menos estratégica da página de detalhes por uma experiência mais útil de descoberta, mostrando lugares relacionados ao estabelecimento atual.",
    items: [
      "Substituição da subseção “Destaques da experiência” por “Relacionados”",
      "Preparação da estrutura para listar places similares",
      "Aprimoramento da jornada entre páginas de estabelecimentos",
    ],
  },
  {
    date: "11 de abril de 2026",
    version: "v1.1.0",
    category: "Resiliência da interface",
    title: "Tratamento de erros mais amigável no front-end",
    description:
      "Adicionamos uma abordagem mais clara para mensagens de erro, com foco em reduzir confusão na interface e tornar a experiência mais confiável quando algo falhar.",
    items: [
      "Criação de componente genérico para exibir erros amigáveis",
      "Melhoria visual alinhada ao tema da plataforma",
      "Estratégia para resetar estados da página em cenários de falha",
    ],
  },
  {
    date: "10 de abril de 2026",
    version: "v1.0.0",
    category: "UX e interação",
    title: "Refinamentos de usabilidade em botões, tabs e galeria",
    description:
      "Fizemos pequenos ajustes importantes de interação para deixar a navegação do FoodFloripa mais intuitiva, moderna e consistente em diferentes pontos da interface.",
    items: [
      "Cursor pointer em elementos clicáveis da interface",
      "Melhorias na galeria de fotos e nos tabs de categorias",
      "Ajustes de navegação com links mais consistentes para a home",
    ],
  },
];

function CategoryTone(category: string) {
  if (category === "Contato e comunicação") {
    return "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-400/20";
  }

  if (category === "Descoberta de lugares") {
    return "bg-sky-500/10 text-sky-200 border-sky-400/20";
  }

  if (category === "Página de detalhes") {
    return "bg-orange-500/10 text-orange-200 border-orange-400/20";
  }

  if (category === "Resiliência da interface") {
    return "bg-rose-500/10 text-rose-200 border-rose-400/20";
  }

  if (category === "UX e interação") {
    return "bg-emerald-500/10 text-emerald-200 border-emerald-400/20";
  }

  return "bg-white/5 text-slate-200 border-white/10";
}

function CategoryIcon(category: string) {
  if (category === "Contato e comunicação") {
    return <Mail className="h-4 w-4" />;
  }

  if (category === "Descoberta de lugares") {
    return <Search className="h-4 w-4" />;
  }

  if (category === "Página de detalhes") {
    return <Sparkles className="h-4 w-4" />;
  }

  if (category === "Resiliência da interface") {
    return <AlertCircle className="h-4 w-4" />;
  }

  return <MousePointerClick className="h-4 w-4" />;
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <History className="h-4 w-4" />
              O que mudou
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Changelog
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Acompanhe as principais evoluções recentes do FoodFloripa, incluindo melhorias
              na busca, páginas de detalhes, tratamento de erros, comunicação e experiência
              geral da plataforma.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="inline-flex items-center gap-2">
                <Rocket className="h-4 w-4 text-orange-300" />
                Evolução contínua do produto
              </div>
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-300" />
                Mais clareza sobre melhorias e entregas
              </div>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              {changelogItems.map((item) => (
                <article
                  key={`${item.version}-${item.date}`}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-200">
                      {item.version}
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${CategoryTone(
                        item.category
                      )}`}
                    >
                      {CategoryIcon(item.category)}
                      {item.category}
                    </span>

                    <span className="text-sm text-slate-400">{item.date}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-base leading-8 text-slate-300 md:text-lg">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-base text-slate-300 md:text-lg">
                    {item.items.map((change) => (
                      <li key={change} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
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