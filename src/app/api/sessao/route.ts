

import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import type { Sessao } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { pautaId, duracao } = body

  if (!pautaId) {
    return NextResponse.json(
      { error: 'ID da pauta é obrigatório.' },
      { status: 400 }
    )
  }

  db.read()

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const pautaExiste = db.data!.pautas.some((p) => p.id === pautaId)
  if (!pautaExiste) {
    return NextResponse.json(
      { error: 'Pauta não encontrada.' },
      { status: 404 }
    )
  }

  const agora = new Date()
  const encerramento = new Date(agora.getTime() + (duracao || 1) * 60000)

  const sessao: Sessao = {
    id: uuidv4(),
    pautaId,
    abertaEm: agora.toISOString(),
    encerraEm: encerramento.toISOString(),
    duracaoEmMinutos: 2
  }

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  db.data!.sessoes.push(sessao)
  db.write()

  return NextResponse.json(sessao, { status: 201 })
}
