export async function validarCPF(cpf: string) {
    // CPF inválido aleatoriamente
    if (Math.random() < 0.2) {
      return { status: 404, body: { status: 'INVALID_CPF' } }
    }
  
    // CPF válido: pode ou não votar
    const podeVotar = Math.random() < 0.5
    return {
      status: 200,
      body: { status: podeVotar ? 'ABLE_TO_VOTE' : 'UNABLE_TO_VOTE' },
    }
  }
  