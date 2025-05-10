'use client'

import { useState } from 'react'
import { criarPauta } from '@/lib/api'

type Props = {
  onPautaCriada?: (id: string) => void
}

export default function PautaForm({ onPautaCriada }: Props) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await criarPauta(titulo, descricao)

    if (res?.error) {
      setMensagem(`Erro: ${res.error}`)
    } else {
      setMensagem('Pauta cadastrada com sucesso!')
      setTitulo('')
      setDescricao('')
      if (onPautaCriada && res.id) {
        onPautaCriada(res.id)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-center">Cadastrar nova pauta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título da pauta"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Descrição da pauta"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <p className="text-sm text-center text-gray-700">{mensagem}</p>
        )}
      </div>
    </div>
  )
}
