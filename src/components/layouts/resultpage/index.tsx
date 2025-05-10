'use client'

import { useEffect, useState } from 'react'



type Pauta = {
  id: string
  titulo: string
  descricao: string
  resultado?: {
    total: number
    sim: number
    nao: number
    resultado: string
  }
}

type Props = {
  onSelecionarPauta?: (id: string) => void
}

export default function PautaList({ onSelecionarPauta }: Props) {
  const [pautas, setPautas] = useState<Pauta[]>([])

  useEffect(() => {
    async function fetchPautas() {
      const res = await fetch('/api/pauta')
      const data = await res.json()

      const pautasComResultado = await Promise.all(
        data.map(async (pauta: Pauta) => {
          const resultadoRes = await fetch(`/api/pauta/${pauta.id}/resultado`)
          const resultadoData = await resultadoRes.json()
          return { ...pauta, resultado: resultadoData }
        })
      )

      setPautas(pautasComResultado)
    }

    fetchPautas()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pautas</h2>
      <div className="space-y-4">
        {pautas.map((pauta) => (
          <div key={pauta.id} className="border rounded p-4 shadow">
            <h3 className="font-semibold text-lg">{pauta.titulo}</h3>
            <p className="text-sm text-gray-600">ID: {pauta.id}</p>
            <p className="text-sm">{pauta.descricao}</p>

            {pauta.resultado && (
              <div className="mt-2 space-y-1">
               <p className="text-green-600">✅ Sim: {pauta.resultado.sim}</p>
               <p className="text-red-600">❌ Não: {pauta.resultado.nao}</p>
                <p className="text-sm font-semibold">
                  Resultado: {pauta.resultado.resultado}
                </p>
              </div>
            )}

            {onSelecionarPauta && (
              <div className="mt-3">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                  onClick={() => onSelecionarPauta(pauta.id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Votar nesta pauta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
