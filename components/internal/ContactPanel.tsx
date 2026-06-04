"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export function ContactPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-slate-400"
            placeholder="Seu nome"
          />
          <input
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-slate-400"
            placeholder="Seu e-mail"
          />
        </div>
        <input
          className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-slate-400"
          placeholder="Assunto"
        />
        <textarea
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-slate-400"
          placeholder="Escreva sua mensagem"
        />
        <button className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02]">
          Enviar mensagem
        </button>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-6 shadow-xl">
        <h3 className="text-2xl font-semibold text-white">Informações</h3>
        <p className="mt-3 text-base leading-7 text-slate-300">
          Estamos abertos a sugestões, novos parceiros, oportunidades comerciais e melhorias para a plataforma.
        </p>

        <div className="mt-6 space-y-4 text-slate-200">
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Mail className="mt-0.5 h-5 w-5 text-sky-300" />
            <div>
              <p className="font-medium text-white">E-mail</p>
              <p className="text-slate-300">contact@foodfloripa.com</p>
            </div>
          </div>
          {/*
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Phone className="mt-0.5 h-5 w-5 text-emerald-300" />
            <div>
              <p className="font-medium text-white">Telefone</p>
              <p className="text-slate-300">(48) 9 8765-4321</p>
            </div>
          </div>
          */}
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-orange-300" />
            <div>
              <p className="font-medium text-white">Base</p>
              <p className="text-slate-300">Florianópolis, SC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
