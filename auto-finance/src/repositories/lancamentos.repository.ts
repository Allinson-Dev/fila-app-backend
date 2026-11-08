import { supabase } from "@/lib/supabase";

interface CriarRecebimentoDTO {
  descricao: string;
  origem: string;
  valor: number;
  dataPrevista: string;
}

export async function listarRecebimentos() {
  const { data, error } = await supabase
    .from("lancamentos")
    .select("*")
    .eq("tipo", "ENTRADA")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function criarRecebimento(
  payload: CriarRecebimentoDTO
) {
  const categoria =
    payload.origem === "CLT" ||
    payload.origem === "VALE"
      ? "FIXO"
      : "VARIAVEL";

  const { data, error } = await supabase
    .from("lancamentos")
    .insert({
      descricao: payload.descricao,
      origem: payload.origem,
      valor: payload.valor,

      tipo: "ENTRADA",

      categoria,

      status: "PENDENTE",

      data_prevista: payload.dataPrevista,

      competencia: payload.dataPrevista,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}