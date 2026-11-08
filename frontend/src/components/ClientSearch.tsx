import { useState } from 'react';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
}

interface ClientSearchProps {
  clientes: Cliente[];
  onGerarSenha: (clienteId: number) => void;
  onNovoCliente: (clienteData: { nome: string; cpf: string; telefone: string; endereco: string }) => void;
}

export function ClientSearch({ clientes, onGerarSenha, onNovoCliente }: ClientSearchProps) {
  const [termoBusca, setTermoBusca] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  // Filtra clientes pelo CPF ou Nome
  const clientesFiltrados = clientes.filter(c => 
    c.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
    c.cpf.includes(termoBusca)
  );

  const handleSubmitNovo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cpf) return;
    onNovoCliente({ nome, cpf, telefone, endereco });
    setNome('');
    setCpf('');
    setTelefone('');
    setEndereco('');
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col space-y-5 shadow-xl">
      <div>
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
          Consultar por CPF / Nome
        </div>
        
        {/* Barra de Pesquisa */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Consultar por CPF ou Nome..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tabela / Lista de Clientes Ativos */}
        <div className="bg-[#0d1117] border border-[#21262d] rounded-lg overflow-hidden max-h-[220px] overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 px-3 py-2 border-b border-[#21262d] bg-[#161b22]">
            Clientes já cadastrados (Busca ativa)
          </div>
          <div className="divide-y divide-[#21262d]">
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between px-3 py-2.5 hover:bg-[#1f242c] transition-colors text-xs">
                  <div>
                    <div className="text-slate-200 font-medium">{cliente.nome}</div>
                    <div className="text-[10px] text-slate-500">CPF: {cliente.cpf}</div>
                  </div>
                  <button
                    onClick={() => onGerarSenha(cliente.id)}
                    className="bg-[#1f6feb] hover:bg-[#388bfd] text-white px-2.5 py-1 rounded text-[10px] font-medium transition-colors shadow"
                  >
                    Gerar Senha
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">Nenhum cliente encontrado.</div>
            )}
          </div>
        </div>
      </div>

      {/* Formulário Rápido de Novo Cliente */}
      <div className="border-t border-[#30363d] pt-4">
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
          Novo Registo Rápido
        </div>
        <form onSubmit={handleSubmitNovo} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="CPF (000.000.000-00)"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-1.5 rounded text-xs font-semibold transition-colors shadow"
          >
            Cadastrar e Gerar Senha
          </button>
        </form>
      </div>
    </div>
  );
}