
import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import type { Voto } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { validarCpf} from '@/app/api/cpf/validateCpf'

export async function POST(req: NextRequest) {
  

  const { pautaId, cpf, voto } = await req.json()

  if (!pautaId || !cpf || !voto) {
    return NextResponse.json({ error: 'Campos obrigatórios.' }, { status: 400 })
  }

  if (!validarCpf(cpf)) {
    return NextResponse.json({ error: 'CPF inválido.' }, { status: 400 })
  }

  const votoUpper = voto.toUpperCase()
  if (votoUpper !== 'SIM' && votoUpper !== 'NAO') {
    return NextResponse.json({ error: 'Voto deve ser SIM ou NAO.' }, { status: 400 })
  }

  db.read()

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const sessao = db.data!.sessoes.find((s) => s.pautaId === pautaId)
  if (!sessao) {
    return NextResponse.json({ error: 'Sessão não encontrada.' }, { status: 404 })
  }

  const agora = new Date()
  if (agora > new Date(sessao.encerraEm)) {
    return NextResponse.json({ error: 'Sessão encerrada.' }, { status: 403 })
  }

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const jaVotou = db.data!.votos.find((v) => v.pautaId === pautaId && v.cpf === cpf)
  if (jaVotou) {
    return NextResponse.json({ error: 'Este CPF já votou nesta pauta.' }, { status: 409 })
  }

  const novoVoto: Voto = {
      id: uuidv4(),
      pautaId,
      cpf,
      voto: votoUpper,
      associadoId: ''
  }

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  db.data!.votos.push(novoVoto)
  db.write()

  return NextResponse.json(novoVoto, { status: 201 })
}
