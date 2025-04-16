// src/lib/db.ts

import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import type { Pauta, Sessao, Voto } from '@/types'

type Data = {
  pautas: Pauta[]
  sessoes: Sessao[]
  votos: Voto[]
}

const adapter = new JSONFileSync<Data>('src/lib/db.json')
const db = new LowSync<Data>(adapter, {
  pautas: [],
  sessoes: [],
  votos: [] 
})

db.read()
db.data ||= { pautas: [], sessoes: [], votos: [] }
db.write()

export default db
