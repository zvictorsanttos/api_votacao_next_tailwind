"use client";

import { type SetStateAction, useState } from "react";
import CreatePautaForm from "@/components/layouts/createvote";
import SessaoForm from "@/components/layouts/sessionlist";
import VotoForm from "@/components/layouts/votepage";
import PautaList from "@/components/layouts/resultpage";

type Step =
  | "menu"
  | "criarPauta"
  | "abrirSessao"
  | "votar"
  | "verResultado"
  | "listarPautas";

export default function HomePage() {
  const [step, setStep] = useState<Step>("menu");
  const [pautaId, setPautaId] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          Sistema de Votação
        </h1>

        {/* Menu Inicial */}
        {step === "menu" && (
          <div className="text-center space-y-4 animate-fade-in">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              onClick={() => setStep("criarPauta")}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              📝 Cadastrar Nova Pauta
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              onClick={() => setStep("listarPautas")}
              className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
            >
              📄 Ver Pautas Existentes
            </button>
          </div>
        )}

        {/* Etapa: Criar Pauta */}
        {step === "criarPauta" && (
          <section className="animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <CreatePautaForm
                onPautaCriada={(id) => {
                  setPautaId(id);
                  setStep("abrirSessao");
                }}
              />
              <div className="mt-6 text-center">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                  onClick={() => setStep("menu")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Voltar ao Menu
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Etapa: Abrir Sessão */}
        {step === "abrirSessao" && pautaId && (
          <section className="animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <SessaoForm
                pautaId={pautaId}
                onSessaoAberta={() => setStep("votar")}
              />
            </div>
          </section>
        )}

        {/* Etapa: Votar */}
        {step === "votar" && pautaId && (
          <section className="animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <VotoForm
                pautaId={pautaId}
                onVotou={() => setStep("verResultado")}
              />
            </div>
          </section>
        )}

        {/* Etapa: Ver Resultado */}
        {step === "verResultado" && (
          <section className="animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <PautaList />
              <div className="text-center mt-6">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                  onClick={() => setStep("menu")}
                  className="text-sm text-red-600 hover:underline"
                >
                  ← Voltar ao Menu
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Etapa: Listar Pautas */}
        {step === "listarPautas" && (
          <section className="animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <PautaList
                onSelecionarPauta={(id: SetStateAction<string | null>) => {
                  setPautaId(id);
                  setStep("votar");
                }}
              />
              <div className="text-center mt-6">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                  onClick={() => setStep("menu")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Voltar ao Menu
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
