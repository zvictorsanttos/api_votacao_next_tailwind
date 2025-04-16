export async function criarPauta(titulo: string, descricao: string) {
    try {
      const res = await fetch('/api/pauta', {
        method: 'POST',
        body: JSON.stringify({ titulo, descricao }),
        headers: { 'Content-Type': 'application/json' },
      })
      return await res.json()
    } catch (err) {
      return { error: 'Erro ao cadastrar pauta' }
    }
  }


  export async function abrirSessao(pautaId: string, duracao?: number) {
    try {
      const res = await fetch('/api/sessao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pautaId, duracao }),
      })
  
      return await res.json()
    } catch (error) {
      return { error: 'Erro ao abrir sessão' }
    }
  }

  export async function enviarVoto(data: {
    cpf: string
    pautaId: string
    voto: 'Sim' | 'Nao'
  }) {
    try {
      const res = await fetch('/api/voto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
  
      return await res.json()
    } catch (error) {
      return { error: 'Erro ao enviar voto' }
    }
    
  }
