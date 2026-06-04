"use client";

import { useState } from "react";
import { Mail, MapPin, MessageSquareMore, Send, Sparkles } from "lucide-react";
import { Header } from "@/components/internal/Header";
import { Footer } from "@/components/Footer";
import { emailService } from "@/services/emailService";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await emailService.contact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      if (response?.success) {
        setFeedback("Mensagem enviada com sucesso!");
        setForm({
          name: "",
          email: "",
          message: "",
        });
        return;
      }

      setError("Não foi possível enviar a mensagem. Tente novamente.");
    } catch (err: unknown) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_20%),linear-gradient(180deg,#020617_0%,#081225_30%,#07101d_100%)] text-white">
      <Header />

      <section className="px-4 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/45 shadow-[0_30px_120px_rgba(2,6,23,0.5)] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(251,146,60,0.08))] px-6 py-10 md:px-10 md:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
              <MessageSquareMore className="h-4 w-4" />
              Canal oficial de contato
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Fale Conosco
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Tem dúvidas, sugestões, interesse comercial ou quer indicar um novo
              lugar? Envie sua mensagem para o FoodFloripa.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Retornaremos assim que possível pelos canais informados.
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl md:p-7">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">
                    Envie sua mensagem
                  </h2>
                  <p className="mt-2 text-base leading-7 text-slate-300">
                    Preencha os campos abaixo para falar com nossa equipe.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {feedback && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                      {feedback}
                    </div>
                  )}

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      disabled={loading}
                      required
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                    />

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Seu e-mail"
                      disabled={loading}
                      required
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem"
                    disabled={loading}
                    required
                    className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Enviando..." : "Enviar mensagem"}
                  </button>
                </form>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-6 shadow-xl md:p-7">
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  Informações
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-300">
                  Estamos abertos a sugestões, novos parceiros, oportunidades
                  comerciais e melhorias para a plataforma.
                </p>

                <div className="mt-6 space-y-4 text-slate-200">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <Mail className="mt-0.5 h-5 w-5 text-sky-300" />
                    <div>
                      <p className="font-medium text-white">E-mail</p>
                      <p className="text-slate-300">contact@foodfloripa.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <MapPin className="mt-0.5 h-5 w-5 text-orange-300" />
                    <div>
                      <p className="font-medium text-white">Base</p>
                      <p className="text-slate-300">Florianópolis, SC</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-sky-400/10 bg-sky-500/[0.06] p-5">
                  <p className="text-sm leading-7 text-slate-300">
                    Para parcerias, divulgação de estabelecimentos ou correção de
                    informações da plataforma, envie uma mensagem com o máximo de
                    detalhes possível.
                  </p>
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