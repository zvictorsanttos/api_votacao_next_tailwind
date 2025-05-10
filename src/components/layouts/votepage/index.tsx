'use client'

import Link from 'next/link'
import { useState } from 'react'
import PautaList from '../resultpage'

type Props = {
  pautaId: string
  onVotou: () => void
}

type Resultado = {
  pautaId: string
  sim: number
  nao: number
  total: number
  resultado: string
}

type Step =
  | 'menu'
  | 'criarPauta'
  | 'abrirSessao'
  | 'votar'
  | 'verResultado'
  | 'listarPautas'

export default function VotoForm({ pautaId, onVotou }: Props) {
  const [selectedPautaId, setSelectedPautaId] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('menu')
  const [cpf, setCpf] = useState('')
  const [voto, setVoto] = useState<'SIM' | 'NAO'>('SIM')
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  async function enviarVoto() {
    setErro(null)
    setLoading(true)

    const res = await fetch('/api/voto', {
      method: 'POST',
      body: JSON.stringify({ pautaId, cpf, voto }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErro(data.error || 'Erro ao votar.')
      setLoading(false)
      return
    }

    const resResultado = await fetch(`/api/pauta/${pautaId}/resultado`)
    const resultadoData = await resResultado.json()

    setResultado(resultadoData)
    setLoading(false)
    onVotou()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Votar na Pauta</h2>
      <p className="text-sm text-gray-600">ID da Pauta: {pautaId}</p>

      <div className="space-y-2">
        <label className="block">
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border rounded px-3 py-1 mt-1"
          />
        </label>

        <label className="block">
          Seu voto:
          <select
            value={voto}
            onChange={(e) => setVoto(e.target.value as 'SIM' | 'NAO')}
            className="w-full border rounded px-3 py-1 mt-1"
          >
            <option value="SIM">Sim</option>
            <option value="NAO">Não</option>
          </select>
        </label>
      </div>

      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
          onClick={enviarVoto}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          {loading ? 'Enviando...' : 'Confirmar Voto'}
        </button>

        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
          onClick={() => setStep('listarPautas')}
          className="text-sm text-blue-600 hover:underline"
        >
          Voltar para Listagem
        </button>
      </div>

      {step === 'listarPautas' && (
        <div className="border p-4 rounded-xl shadow bg-white">
          <PautaList
            onSelecionarPauta={(id) => {
              setSelectedPautaId(id)
              setStep('votar')
            }}
          />
          <div className="text-center mt-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              onClick={() => setStep('menu')}
              className="text-sm text-blue-600 hover:underline"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      )}

      {resultado && (
        <div className="mt-4 border p-4 rounded-xl bg-gray-100 text-sm">
          <h3 className="font-semibold">Resultado Atual</h3>
          <p>✅ Votos Sim: {resultado.sim}</p>
          <p>❌ Votos Não: {resultado.nao}</p>
          <p>Total de Votos: {resultado.total}</p>
          <p className="font-bold mt-2">
            Resultado Final: {resultado.resultado}
          </p>
        </div>
      )}
    </div>
  )
}
