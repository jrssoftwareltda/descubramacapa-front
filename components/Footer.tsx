"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-white/10 bg-slate-950/50 p-8 text-slate-300 shadow-2xl backdrop-blur-xl md:grid-cols-5">
        <div className="md:col-span-1">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition"
          >
            <Image
              src="/logo_food_floripa.svg"
              alt="FoodFloripa"
              width={160}
              height={40}
              priority
              className="h-7 md:h-8 w-auto"
            />
          </Link>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Descubra os melhores lugares para comer, beber e viver experiências
            em Florianópolis, SC.
          </p>
          <div className="mt-5 text-xs text-slate-500 opacity-80">
            © {new Date().getFullYear()} JRS SOFTWARE LTDA
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-3 text-lg">
            <li>
              <Link href="/about" className="hover:text-white transition">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Fale conosco
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            Para seu estabelecimento
          </h3>
          <ul className="mt-4 space-y-3 text-lg">
            <li>
              <Link
                href="/add-your-business"
                className="hover:text-white transition"
              >
                Cadastre seu negócio
              </Link>
            </li>
            <li>
              <Link
                href="/auto-registration"
                className="hover:text-white transition"
              >
                Cadastro automático
              </Link>
            </li>
            <li>
              <Link href="/plans" className="hover:text-white transition">
                Planos e preços
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Ajuda</h3>
          <ul className="mt-4 space-y-3 text-lg">
            <li>
              <Link href="/help" className="hover:text-white transition">
                Central de ajuda
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            Últimas atualizações
          </h3>
          <ul className="mt-4 space-y-3 text-lg">
            <li>
              <Link href="/changelog" className="hover:text-white transition">
                O que mudou
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
