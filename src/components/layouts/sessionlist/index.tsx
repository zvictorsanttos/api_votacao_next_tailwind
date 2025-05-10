'use client'

import { useState } from 'react'
import { abrirSessao } from '@/lib/api'

type Props = {
  pautaId: string
  onSessaoAberta: () => void
}

export default function SessaoForm({ pautaId, onSessaoAberta }: Props) {
  const [duracao, setDuracao] = useState(1)
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pautaId) return setMensagem('Informe o ID da pauta.')

    const res = await abrirSessao(pautaId, duracao)
    if (res?.error) {
      setMensagem(`Erro: ${res.error}`)
    } else {
      setMensagem('Sessão aberta com sucesso!')
      setDuracao(1)
      onSessaoAberta()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold">Abrir Sessão de Votação</h2>

      <p className="text-sm text-gray-600">ID da pauta: <strong>{pautaId}</strong></p>

      <input
        type="number"
        placeholder="Duração em minutos (padrão 1)"
        value={duracao}
        onChange={(e) => setDuracao(Number.parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Abrir Sessão
      </button>

      {mensagem && <p className="text-sm mt-2">{mensagem}</p>}
    </form>
  )
}
