

import { type NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import type { Pauta } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const body = await req.json()

  const { titulo, descricao } = body

  if (!titulo) {
    return NextResponse.json(
      { error: 'Título é obrigatório.' },
      { status: 400 }
    )
  }

  const novaPauta: Pauta = {
    id: uuidv4(),
    titulo,
    descricao,
    criadaEm: new Date().toISOString(),
  }

  db.read()
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  db.data!.pautas.push(novaPauta)
  db.write()

  return NextResponse.json(novaPauta, { status: 201 })
}


export async function GET(req: NextRequest) {
    db.read()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return NextResponse.json(db.data!.pautas || [])
  }
