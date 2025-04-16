export type Pauta = {
  id: string;
  titulo: string;
  descricao?: string;
  criadaEm: string;
};

export type Sessao = {
  duracaoEmMinutos: number;
  id: string;
  pautaId: string;
  abertaEm: string;
  encerraEm: string;
};

export type Voto = {
  id: string;
  cpf: number;
  pautaId: string;
  associadoId: string;
  voto: "SIM" | "NAO";
};

export type Resultado = {
  pautaId: string;
  totalSim: number;
  totalNao: number;
};
