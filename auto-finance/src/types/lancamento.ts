export type TipoLancamento =
  | "ENTRADA"
  | "SAIDA";

export type CategoriaLancamento =
  | "FIXO"
  | "VARIAVEL";

export type StatusLancamento =
  | "PENDENTE"
  | "PAGO";

export interface Lancamento {
  id: string;

  descricao: string;

  tipo: TipoLancamento;

  categoria: CategoriaLancamento;

  valor: number;

  status: StatusLancamento;

  data_prevista: string | null;

  data_pagamento: string | null;

  recorrente: boolean;

  dia_recorrencia: number | null;

  observacao: string | null;

  created_at: string;
}