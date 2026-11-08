import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BellRing, 
  CheckCircle2, 
  Sparkles,
  Search,
  UserPlus,
  X,
  RefreshCw,
  Sliders,
  Printer,
  Clock
} from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export interface Customer {
  id: number;
  nome: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
}

export interface Ticket {
  id: string;
  number: string;
  customerName: string;
  priority: 'normal' | 'preferential';
  status: 'waiting' | 'calling' | 'completed';
  serviceWindow?: string;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
}

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentCalling, setCurrentCalling] = useState<Ticket | null>(null);
  const [transmissionActive, setTransmissionActive] = useState(true);

  // Estados para Clientes e Totem/Busca
  const [customerQuery, setCustomerQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Formulário de Novo Cliente
  const [newNome, setNewNome] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [newTelefone, setNewTelefone] = useState('');
  const [newEndereco, setNewEndereco] = useState('');

  // Buscar clientes na API ao digitar na barra de pesquisa
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await api.get(`/clientes?q=${encodeURIComponent(customerQuery)}`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [customerQuery]);

  // Criar novo cliente
  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/clientes', {
        Nome: newNome,
        Cpf: newCpf,
        Telefone: newTelefone,
        Endereco: newEndereco
      });
      const createdCustomer: Customer = response.data;
      setSelectedCustomer(createdCustomer);
      setIsModalOpen(false);
      setNewNome('');
      setNewCpf('');
      setNewTelefone('');
      setNewEndereco('');
      alert('Cliente cadastrado com sucesso!');
    } catch (error: any) {
      console.error('Erro detalhado:', error.response?.data);
      alert(error.response?.data?.error || error.response?.data?.title || 'Erro ao cadastrar cliente.');
    }
  };

  // Gerar senha vinculada ou avulsa
  const handleCreateTicket = (priority: 'normal' | 'preferential') => {
    const count = tickets.length + 1;
    const prefix = priority === 'preferential' ? 'P' : 'N';
    const customerName = selectedCustomer ? selectedCustomer.nome : (priority === 'preferential' ? 'Cliente Preferencial' : 'Cliente Comum');

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newTicket: Ticket = {
      id: String(Date.now()),
      number: `${prefix}-${String(count).padStart(3, '0')}`,
      customerName,
      priority,
      status: 'waiting',
      createdAt: now
    };

    setTickets((prev) => [...prev, newTicket]);
    setSelectedCustomer(null);
    alert(`Senha ${newTicket.number} gerada com sucesso!`);
  };

  // Chamar especificamente por tipo (Normal ou Preferencial)
  const handleCallSpecific = (targetPriority: 'normal' | 'preferential', windowNumber: string) => {
    const waiting = tickets.filter((t) => t.status === 'waiting' && t.priority === targetPriority);
    
    if (waiting.length === 0) {
      alert(`Não há clientes ${targetPriority === 'preferential' ? 'preferenciais' : 'normais'} aguardando na fila.`);
      return;
    }

    const nextTicket = waiting[0];
    const callTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const updated = tickets.map((t) =>
      t.id === nextTicket.id ? { ...t, status: 'calling' as const, serviceWindow: windowNumber, calledAt: callTime } : t
    );

    setTickets(updated);
    setCurrentCalling({ ...nextTicket, serviceWindow: windowNumber, status: 'calling', calledAt: callTime });
  };

  // Concluir atendimento e registar horário de conclusão
  const handleComplete = (id: string) => {
    const completeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'completed', completedAt: completeTime } : t)));
    if (currentCalling?.id === id) setCurrentCalling(null);
  };

  const handleResetQueue = () => {
    if (confirm('Tem certeza que deseja zerar a contagem e reiniciar o dia?')) {
      setTickets([]);
      setCurrentCalling(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0047F7] text-[#FFE1CF] relative overflow-x-hidden flex flex-col font-sans">
      
      {/* Brilhos de Fundo Glassmorphic */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#FA4802]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-white/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/15 bg-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FA4802] rounded-2xl shadow-lg shadow-[#FA4802]/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Landell.Studio <span className="text-[#FA4802]">// Fila OS</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-white/30 shadow-md"
            >
              <Printer className="w-4 h-4 text-[#FA4802]" /> Relatório de Horários / Impressão
            </button>
            <span className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> API .NET Conectada (Porta 5000)
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal: Layout de 3 Colunas */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 w-full flex-grow relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUNA 1: TV PREVIEW / RETORNO DA TV */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFE1CF]/70">
              TV Preview // Retorno Monitor
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FA4802] animate-ping" />
          </div>

          <div className="bg-black/30 border border-white/15 rounded-2xl p-6 text-center shadow-inner space-y-4">
            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">
              {currentCalling ? currentCalling.number : '---'}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#FA4802] font-bold">Senha Atual em Exibição</div>
            
            <div className="space-y-2 text-left border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[#FFE1CF]/60">Cliente:</span>
                <span className="text-white font-medium truncate max-w-[180px]">
                  {currentCalling ? currentCalling.customerName : 'Nenhum'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FFE1CF]/60">Chamado às:</span>
                <span className="text-emerald-400 font-bold font-mono">{currentCalling?.calledAt || '--:--:--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FFE1CF]/60">Local:</span>
                <span className="text-white font-bold">{currentCalling ? currentCalling.serviceWindow : 'Aguardando'}</span>
              </div>
            </div>
          </div>

          {currentCalling && (
            <button
              onClick={() => handleComplete(currentCalling.id)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <CheckCircle2 className="w-4 h-4" /> Concluir Atendimento (Registar Hora Fim)
            </button>
          )}

          <div className="pt-4 border-t border-white/10">
            <span className="text-xs font-bold text-white block mb-3">Fila de Espera ({tickets.filter(t => t.status === 'waiting').length})</span>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {tickets.filter(t => t.status === 'waiting').map(t => (
                <div key={t.id} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-white block">{t.number}</span>
                    <span className="text-[10px] text-[#FFE1CF]/60 flex items-center gap-1"><Clock className="w-3 h-3"/> Criada às {t.createdAt}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#FFE1CF]/80 block truncate max-w-[100px]">{t.customerName}</span>
                    <span className={`text-[10px] font-bold ${t.priority === 'preferential' ? 'text-[#FA4802]' : 'text-white/60'}`}>
                      {t.priority === 'preferential' ? 'Preferencial' : 'Normal'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA 2: CONSULTAR POR CPF / GESTÃO DE CLIENTES & EMISSÃO */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFE1CF]/70">
              Consultar por CPF / Nome
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 bg-[#FA4802] hover:bg-[#FA4802]/90 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <UserPlus className="w-3.5 h-3.5" /> Novo Cliente
            </button>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#FFE1CF]/50" />
            <input
              type="text"
              value={customerQuery}
              onChange={(e) => setCustomerQuery(e.target.value)}
              placeholder="Consultar por CPF ou Nome..."
              className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white text-xs placeholder-[#FFE1CF]/50 focus:outline-none focus:border-[#FA4802]"
            />
          </div>

          {/* Lista de Clientes Cadastrados */}
          <div className="bg-black/25 border border-white/10 rounded-2xl overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider text-[#FFE1CF]/60 px-4 py-2 border-b border-white/10 bg-white/5 font-semibold">
              Clientes já cadastrados (Busca ativa)
            </div>
            <div className="max-h-[200px] overflow-y-auto divide-y divide-white/5">
              {customers.length > 0 ? (
                customers.map((c) => (
                  <div key={c.id} className="p-3 hover:bg-white/10 flex items-center justify-between transition-colors text-xs">
                    <div>
                      <p className="font-semibold text-white">{c.nome}</p>
                      <p className="text-[10px] text-[#FFE1CF]/70">CPF: {c.cpf}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        selectedCustomer?.id === c.id 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-[#0047F7] hover:bg-[#0039c4] text-white shadow'
                      }`}
                    >
                      {selectedCustomer?.id === c.id ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#FFE1CF]/50">Nenhum cliente encontrado na busca.</div>
              )}
            </div>
          </div>

          {selectedCustomer && (
            <div className="p-3 bg-[#FA4802]/20 border border-[#FA4802]/40 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#FA4802] font-bold uppercase">Atribuir Senha Para:</span>
                <p className="font-bold text-white">{selectedCustomer.nome}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-[10px] underline text-[#FFE1CF]/70 hover:text-white cursor-pointer">
                Remover
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleCreateTicket('normal')}
              className="py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow"
            >
              Gerar Normal
            </button>
            <button
              onClick={() => handleCreateTicket('preferential')}
              className="py-3 bg-[#FA4802] hover:bg-[#FA4802]/90 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-[#FA4802]/40"
            >
              Gerar Preferencial
            </button>
          </div>
        </div>

        {/* COLUNA 3: CONTROLES DO OPERADOR (COM BOTÕES ESPECÍFICOS DE CHAMADA) */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFE1CF]/70">
              Operator Commands
            </span>
            <Sliders className="w-4 h-4 text-[#FA4802]" />
          </div>

          <div className="space-y-3">
            {/* Botão de Chamar Preferencial */}
            <button
              onClick={() => handleCallSpecific('preferential', 'Guichê 01')}
              className="w-full py-3.5 bg-[#FA4802] hover:bg-[#FA4802]/90 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-[#FA4802]/40 transition-all duration-300 flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <BellRing className="w-4 h-4" /> Chamar Próxima Preferencial
            </button>

            {/* Botão de Chamar Normal */}
            <button
              onClick={() => handleCallSpecific('normal', 'Guichê 01')}
              className="w-full py-3.5 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/30 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-xs cursor-pointer shadow"
            >
              <BellRing className="w-4 h-4 text-[#FFE1CF]" /> Chamar Próxima Normal
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-[#FA4802]" /> Ver Registros e Horários
            </button>

            <button
              onClick={handleResetQueue}
              className="w-full py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Zerar Contagem do Dia
            </button>
          </div>

          <div className="bg-black/30 border border-white/15 rounded-2xl p-4 space-y-3">
            <span className="text-[11px] font-bold text-[#FFE1CF]/70 uppercase tracking-wider block">TV Transmissão // Delay Control</span>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-white font-medium">Ativar Transmissão</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={transmissionActive}
                  onChange={(e) => setTransmissionActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FA4802]"></div>
              </label>
            </div>
          </div>
        </div>

      </main>

      {/* MODAL DE RELATÓRIO / REGISTRO DE HORÁRIOS */}
      {isReportOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0047F7] border border-white/25 rounded-3xl p-8 max-w-3xl w-full shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
            <button onClick={() => setIsReportOpen(false)} className="absolute top-6 right-6 text-[#FFE1CF]/70 hover:text-white cursor-pointer print:hidden">
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Landell.Studio // Registo de Atendimentos</h3>
                <p className="text-xs text-[#FFE1CF]/80 mt-1">Histórico completo com marcação visual de chamada e conclusão.</p>
              </div>
              <button 
                onClick={handlePrint}
                className="px-4 py-2 bg-[#FA4802] text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer print:hidden"
              >
                <Printer className="w-4 h-4" /> Imprimir Relatório
              </button>
            </div>

            <div className="bg-black/30 border border-white/15 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/10 border-b border-white/10 text-white font-bold">
                    <th className="p-3">Senha</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Emissão</th>
                    <th className="p-3 text-emerald-400">Chamado às</th>
                    <th className="p-3 text-blue-300">Concluído às</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tickets.length > 0 ? (
                    tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono font-bold text-white">{t.number}</td>
                        <td className="p-3 text-[#FFE1CF]">{t.customerName}</td>
                        <td className="p-3">
                          <span className={`font-semibold ${t.priority === 'preferential' ? 'text-[#FA4802]' : 'text-[#FFE1CF]/80'}`}>
                            {t.priority === 'preferential' ? 'Preferencial' : 'Normal'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[#FFE1CF]/70">{t.createdAt}</td>
                        <td className="p-3 font-mono text-emerald-300 font-bold">{t.calledAt || '-'}</td>
                        <td className="p-3 font-mono text-blue-300 font-bold">{t.completedAt || '-'}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            t.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                            t.status === 'calling' ? 'bg-[#FA4802]/30 text-[#FFE1CF] animate-pulse' :
                            'bg-white/10 text-[#FFE1CF]/70'
                          }`}>
                            {t.status === 'completed' ? 'Concluído' : t.status === 'calling' ? 'Em Atendimento' : 'Aguardando'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-[#FFE1CF]/50">Nenhum atendimento registado hoje.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DE CADASTRO DE CLIENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0047F7] border border-white/25 rounded-3xl p-8 max-w-md w-full shadow-2xl relative space-y-6">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[#FFE1CF]/70 hover:text-white cursor-pointer">
              <X className="w-6 h-6" />
            </button>

            <div>
              <h3 className="text-2xl font-bold text-white">Novo Cadastro</h3>
              <p className="text-xs text-[#FFE1CF]/80 mt-1">Insira os dados do cliente para associar às futuras senhas.</p>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#FFE1CF]/80">Nome Completo *</label>
                <input type="text" required value={newNome} onChange={(e) => setNewNome(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#FA4802]" placeholder="Ex: Carlos Silva" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#FFE1CF]/80">CPF *</label>
                <input type="text" required value={newCpf} onChange={(e) => setNewCpf(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#FA4802]" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#FFE1CF]/80">Telefone</label>
                <input type="text" value={newTelefone} onChange={(e) => setNewTelefone(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#FA4802]" placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#FFE1CF]/80">Endereço</label>
                <input type="text" value={newEndereco} onChange={(e) => setNewEndereco(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-black/30 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#FA4802]" placeholder="Rua Exemplo, 123" />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#FA4802] hover:bg-[#FA4802]/90 text-white font-bold rounded-xl shadow-lg shadow-[#FA4802]/40 transition-all cursor-pointer mt-2">
                Cadastrar e Selecionar
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}