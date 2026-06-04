"use client";

import { LockKeyhole, ShieldCheck, FileCheck2 } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Objetivo desta política",
    content:
      "Esta Política de Privacidade descreve como o FoodFloripa coleta, utiliza, armazena e protege dados pessoais de usuários, parceiros e proprietários de estabelecimentos que interagem com a plataforma.",
  },
  {
    title: "2. Dados que podem ser coletados",
    content:
      "Podemos coletar dados fornecidos diretamente pelo titular, como nome, e-mail, telefone, mensagem enviada por formulário, informações de estabelecimento comercial e outros dados estritamente necessários para atendimento, contato, análise de solicitações e melhoria da plataforma.",
  },
  {
    title: "3. Finalidades do tratamento",
    content:
      "Os dados podem ser tratados para responder contatos enviados à plataforma, analisar pedidos de cadastro de negócios, avaliar solicitações comerciais, corrigir informações de estabelecimentos, melhorar a experiência do usuário, manter a segurança da aplicação e cumprir obrigações legais ou regulatórias.",
  },
  {
    title: "4. Base legal e conformidade com a LGPD",
    content:
      "O tratamento de dados pessoais é realizado em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018), com fundamento em bases legais aplicáveis, como consentimento, execução de procedimentos preliminares relacionados a contrato, cumprimento de obrigação legal e legítimo interesse, quando cabível.",
  },
  {
    title: "5. Compartilhamento de dados",
    content:
      "O FoodFloripa não comercializa dados pessoais. Os dados poderão ser compartilhados apenas quando necessário para prestação de serviços, uso de ferramentas de apoio à operação, cumprimento de obrigação legal, requisição de autoridade competente ou proteção de direitos legítimos da plataforma.",
  },
  {
    title: "6. Dados de estabelecimentos",
    content:
      "Informações públicas relacionadas a estabelecimentos comerciais podem ser consultadas em fontes abertas e utilizadas para composição, atualização e enriquecimento da base da plataforma. Sempre que possível, recomendamos validação pelo próprio proprietário para maior precisão dos dados exibidos.",
  },
  {
    title: "7. Armazenamento e segurança",
    content:
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger dados pessoais contra acessos não autorizados, perda, alteração, divulgação indevida ou qualquer forma de tratamento inadequado ou ilícito. Ainda assim, nenhum ambiente digital pode ser considerado totalmente isento de riscos.",
  },
  {
    title: "8. Retenção dos dados",
    content:
      "Os dados pessoais serão armazenados pelo tempo necessário para cumprir as finalidades descritas nesta política, atender exigências legais, regulatórias, contratuais ou para resguardar direitos da plataforma, sendo posteriormente eliminados ou anonimizados quando aplicável.",
  },
  {
    title: "9. Direitos do titular",
    content:
      "Nos termos da LGPD, o titular dos dados poderá solicitar, quando aplicável, confirmação da existência de tratamento, acesso aos dados, correção de informações incompletas ou desatualizadas, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento e revisão de decisões automatizadas, observadas as limitações legais.",
  },
  {
    title: "10. Cookies e tecnologias similares",
    content:
      "A plataforma poderá utilizar cookies e tecnologias semelhantes para melhorar navegação, desempenho, segurança, métricas de uso e experiência do usuário. O detalhamento e o gerenciamento desses recursos poderão ser ajustados conforme a evolução da plataforma.",
  },
  {
    title: "11. Links de terceiros",
    content:
      "O FoodFloripa pode apresentar links para serviços externos, como mapas, redes sociais e canais de contato. Esta Política de Privacidade não se aplica a ambientes de terceiros, sendo recomendável que o usuário consulte as políticas específicas de cada serviço acessado.",
  },
  {
    title: "12. Alterações nesta política",
    content:
      "Esta Política de Privacidade poderá ser atualizada periodicamente para refletir mudanças legais, operacionais, técnicas ou evoluções da plataforma. Recomendamos a consulta regular desta página.",
  },
  {
    title: "13. Contato",
    content:
      "Em caso de dúvidas, solicitações relacionadas a dados pessoais ou exercício de direitos previstos na LGPD, recomendamos contato pelos canais oficiais disponibilizados na página de Fale Conosco.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <LockKeyhole className="h-4 w-4" />
              Política de privacidade
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Política de Privacidade
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Este documento apresenta, de forma geral, como o FoodFloripa trata dados pessoais,
              respeitando princípios de transparência, segurança e conformidade com a LGPD.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Conformidade com LGPD
              </div>
              <div className="inline-flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-sky-300" />
                Última atualização: 08/04/2026 15:51
              </div>
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