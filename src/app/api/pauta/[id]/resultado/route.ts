import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params)
  const pautaId = id

  await db.read()

  const votos = db.data?.votos.filter((v) => v.pautaId === pautaId) || []
  const total = votos.length
  const sim = votos.filter((v) => v.voto === 'SIM').length
  const nao = votos.filter((v) => v.voto === 'NAO').length

  return NextResponse.json({
    pautaId,
    total,
    sim,
    nao,
    resultado: sim > nao ? 'APROVADA' : sim < nao ? 'REPROVADA' : 'EMPATE',
  })
}
