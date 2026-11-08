"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  criarRecebimentoAction,
} from "../../actions/recebimentos";

export default function NovoRecebimentoPage() {
  const router = useRouter();

  const [descricao, setDescricao] =
    useState("");

  const [origem, setOrigem] =
    useState("CLT");

  const [valor, setValor] =
    useState("1000");

  const [dataPrevista, setDataPrevista] =
    useState("");

  function handleOrigemChange(
    origemSelecionada: string
  ) {
    setOrigem(origemSelecionada);

    if (origemSelecionada === "CLT") {
      setValor("1000");
      return;
    }

    if (origemSelecionada === "VALE") {
      setValor("882");
      return;
    }

    setValor("");
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await criarRecebimentoAction({
        descricao,
        origem,
        valor: Number(valor),
        dataPrevista,
      });

      router.push("/recebidos");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar recebimento");
    }
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Novo Recebimento
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) =>
            setDescricao(e.target.value)
          }
          className="w-full border p-3"
        />

        <select
          value={origem}
          onChange={(e) =>
            handleOrigemChange(
              e.target.value
            )
          }
          className="w-full border p-3"
        >
          <option value="CLT">
            CLT
          </option>

          <option value="VALE">
            VALE
          </option>

          <option value="13_SALARIO">
            13º SALÁRIO
          </option>

          <option value="EVENTO">
            EVENTO
          </option>

          <option value="SESSAO">
            SESSÃO
          </option>

          <option value="PROJETO">
            PROJETO
          </option>

          <option value="OUTROS">
            OUTROS
          </option>
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) =>
            setValor(e.target.value)
          }
          readOnly={
            origem === "CLT" ||
            origem === "VALE"
          }
          className="w-full border p-3"
        />

        <input
          type="date"
          value={dataPrevista}
          onChange={(e) =>
            setDataPrevista(
              e.target.value
            )
          }
          className="w-full border p-3"
        />

        <button
          type="submit"
          className="
            rounded
            bg-green-600
            px-4
            py-2
            text-white
          "
        >
          Salvar
        </button>
      </form>
    </main>
  );
}