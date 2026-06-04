"use client";

import {
  ChevronRight,
  HeartHandshake,
  Link,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactPanel } from "@/components/internal/ContactPanel";
import { ValueGrid } from "@/components/internal/ValueGrid";
import { ValueItem, TeamMember } from "@/types/types";

const values: ValueItem[] = [
  {
    id: 1,
    title: "Curadoria",
    description:
      "Selecionamos experiências gastronômicas com identidade, atmosfera e potencial visual.",
    icon: "sparkles",
  },
  {
    id: 2,
    title: "Conexão local",
    description:
      "Valorizamos estabelecimentos e histórias que representam a energia de Floripa.",
    icon: "users",
  },
  {
    id: 3,
    title: "Experiência",
    description:
      "Nosso foco é fazer cada descoberta parecer especial, simples e memorável.",
    icon: "heart",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Curadoria FoodFloripa",
    role: "Seleção de lugares",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Time de Conteúdo",
    role: "Experiência e descoberta",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Parcerias Locais",
    role: "Relacionamento com estabelecimentos",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
  },
];

function InternalMeta() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200/80 md:text-base">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-sky-400" /> Florianópolis, SC
      </div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-orange-300" /> Curadoria visual
        inspirada em streaming
      </div>
    </div>
  );
}

function InternalHighlightCard() {
  return (
    <section className="px-4 pb-8 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[32px] border border-white/10 bg-slate-950/40 p-6 shadow-2xl backdrop-blur-xl md:grid-cols-2 md:p-8">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-sky-300/80">
            Quem somos
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Um guia visual para descobrir os melhores lugares de Floripa.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            O FoodFloripa nasceu para transformar a busca por estabelecimentos
            em uma experiência mais inspiradora, imersiva e elegante. Em vez de
            listas frias, queremos apresentar cada lugar como um conteúdo que dá
            vontade de explorar.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-sky-500/10 via-slate-900 to-orange-400/10 p-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-orange-200/80">
            Nossa proposta
          </p>
          <p className="text-lg leading-8 text-slate-200">
            Reunimos gastronomia, atmosfera, vista, vibe e conteúdo visual para
            ajudar pessoas a encontrarem lugares que combinem com o momento.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <Hero
        title="Quem Somos"
        subtitle="Conheça a proposta por trás do FoodFloripa e a visão de transformar descoberta gastronômica em experiência premium."
        eyebrow="Página institucional"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2200&auto=format&fit=crop"
        filters={
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md">
              <Users className="h-4 w-4 text-sky-300" /> Sobre a marca
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md">
              <HeartHandshake className="h-4 w-4 text-orange-300" /> Missão e
              valores
            </div>
          </div>
        }
        meta={<InternalMeta />}
      />

      <InternalHighlightCard />

      <section className="px-4 pb-8 md:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div>
            <SectionHeader
              title="Nossos valores"
              subtitle="Os princípios que guiam nossa curadoria, produto e relacionamento com o público e parceiros."
            />
            <ValueGrid items={values} />
          </div>

          <div>
            <SectionHeader
              title="Como pensamos a experiência"
              subtitle="Cada detalhe visual é pensado para dar destaque aos lugares e tornar a navegação mais inspiradora."
            />
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">
                  01
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Visual cinematográfico
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Hero images grandes, contraste forte e uma navegação inspirada
                  em plataformas de streaming.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">
                  02
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Curadoria prática
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  O usuário encontra rapidamente o lugar certo por estilo,
                  prato, vista, ambiente e ocasião.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">
                  03
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Conexão com a cidade
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Floripa não é pano de fundo: a identidade da cidade é parte
                  central da experiência do produto.
                </p>
              </div>
            </div>
          </div>
          {/*
          <div>
            <SectionHeader
              title="Time e operação"
              subtitle="Uma estrutura enxuta, focada em conteúdo, experiência do usuário e conexão com lugares locais."
            />
            <TeamGrid items={teamMembers} />
          </div>
          */}
        </div>
      </section>

      <Footer />
    </main>
  );
}
