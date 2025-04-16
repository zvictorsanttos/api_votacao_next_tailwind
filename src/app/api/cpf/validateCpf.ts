export function validarCpf(cpf: string): boolean {
    const OnlyNumber = cpf.replace(/[^\d]+/g, '')
  
    if (OnlyNumber.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += Number.parseInt(OnlyNumber.charAt(i)) * (10 - i)
    }
  
    let resto = 11 - (soma % 11)
    const digito1 = resto === 10 || resto === 11 ? 0 : resto
  
    if (digito1 !== Number.parseInt(OnlyNumber.charAt(9))) return false
  
    soma = 0
    for (let i = 0; i < 10; i++) {
      soma += Number.parseInt(OnlyNumber.charAt(i)) * (11 - i)
    }
  
    resto = 11 - (soma % 11)
    const digito2 = resto === 10 || resto === 11 ? 0 : resto
  
    return digito2 === Number.parseInt(OnlyNumber.charAt(10))
  }