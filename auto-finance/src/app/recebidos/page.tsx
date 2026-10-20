import Link from "next/link";

export default function RecebidosPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6">

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Recebidos
          </h1>

          <Link
            href="/recebidos/novo"
            className="
              rounded-lg
              bg-green-600
              px-4
              py-2
              text-white
            "
          >
            Novo Recebimento
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          Nenhum recebimento cadastrado.
        </div>

      </div>
    </main>
  );
}