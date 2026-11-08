"use server";

import {
  criarRecebimento,
} from "@/repositories/lancamentos.repository";

interface CriarRecebimentoDTO {
  descricao: string;
  origem: string;
  valor: number;
  dataPrevista: string;
}

export async function criarRecebimentoAction(
  payload: CriarRecebimentoDTO
) {
  return await criarRecebimento(payload);
}
