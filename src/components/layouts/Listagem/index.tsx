'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Resultado = {
  pautaId: string
  totalSim: number
  totalNao: number
}

type Pauta = {
  id: string
  titulo: string
}

export default function PautaList() {
  const [pautas, setPautas] = useState<Pauta[]>([])
  const [resultados, setResultados] = useState<Record<string, Resultado>>({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/pauta')
      const data = await res.json()
      setPautas(data)
      setLoading(false)

      for (const pauta of data) {
        const r = await fetch(`/api/pauta/${pauta.id}/resultado`)
        const result = await r.json()
        if (!result.error) {
          setResultados((prev) => ({ ...prev, [pauta.id]: result }))
        }
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="p-4">Carregando pautas...</p>

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Pautas</h2>
      {pautas.length === 0 && <p>Nenhuma pauta cadastrada ainda.</p>}

      {pautas.map((pauta) => (
        <div key={pauta.id} className="border p-4 rounded-xl shadow bg-white">
          <h3 className="text-lg font-semibold">{pauta.titulo}</h3>
          <p className="text-sm text-gray-600">ID: {pauta.id}</p>

          {resultados[pauta.id] ? (
            <div className="mt-2 text-sm">
              <p>✅ Sim: {resultados[pauta.id].totalSim}</p>
              <p>❌ Não: {resultados[pauta.id].totalNao}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Resultado ainda não disponível.</p>
          )}

          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
            onClick={() => router.push(`/votar/${pauta.id}`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Votar
          </button>
        </div>
      ))}
    </div>
  )
}
