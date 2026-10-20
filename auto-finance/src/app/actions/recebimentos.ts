"use server";

import { supabase } from "@/lib/supabase";

interface NovoRecebimento {
  descricao: string;
  origem: string;
  valor: number;
  dataPrevista: string;
}

export async function criarRecebimento(
  payload: NovoRecebimento
) {
  const categoria =
    payload.origem === "CLT" ||
    payload.origem === "VALE"
      ? "FIXO"
      : "VARIAVEL";

  const { error } = await supabase
    .from("lancamentos")
    .insert({
      descricao: payload.descricao,

      origem: payload.origem,

      valor: payload.valor,

      tipo: "ENTRADA",

      categoria,

      status: "PENDENTE",

      data_prevista: payload.dataPrevista,
    });

  if (error) {
    throw error;
  }

  return true;
}