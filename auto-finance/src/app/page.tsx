export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-8 text-4xl font-bold">
          Auto Finance
        </h1>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-sm text-gray-500">
              Saldo Atual
            </h2>

            <p className="text-3xl font-bold">
              R$ 0,00
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-sm text-gray-500">
              A Receber
            </h2>

            <p className="text-3xl font-bold text-green-600">
              R$ 0,00
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-sm text-gray-500">
              A Pagar
            </h2>

            <p className="text-3xl font-bold text-red-600">
              R$ 0,00
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-sm text-gray-500">
              Saldo Projetado
            </h2>

            <p className="text-3xl font-bold text-blue-600">
              R$ 0,00
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}