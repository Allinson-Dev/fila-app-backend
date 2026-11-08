interface OperatorControlsProps {
  onChamarProxima: () => void;
  onAvancarEtapa: () => void;
  onZerarContagem: () => void;
  transmissaoAtiva: boolean;
  onToggleTransmissao: (ativo: boolean) => void;
}

export function OperatorControls({
  onChamarProxima,
  onAvancarEtapa,
  onZerarContagem,
  transmissaoAtiva,
  onToggleTransmissao
}: OperatorControlsProps) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col justify-between shadow-xl">
      <div className="space-y-5">
        <div>
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
            TV Transmissão <span className="text-[10px] text-slate-500 font-normal">// Delay Control</span>
          </div>
          
          <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-200">Ativar Transmissão</div>
                <div className="text-[10px] text-slate-500">Sincronização em tempo real</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={transmissaoAtiva}
                  onChange={(e) => onToggleTransmissao(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#21262d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#238636]"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
            Opções de Operação
          </div>
          <div className="space-y-2">
            <button
              onClick={onChamarProxima}
              className="w-full bg-[#1f6feb] hover:bg-[#388bfd] text-white py-2 rounded-lg text-xs font-medium transition-colors shadow"
            >
              Chamar Próxima Senha
            </button>
            <button
              onClick={onAvancarEtapa}
              className="w-full bg-[#30363d] hover:bg-[#484f58] text-slate-200 py-2 rounded-lg text-xs font-medium transition-colors border border-[#484f58]"
            >
              Avançar Etapa do Atendimento
            </button>
            <button
              onClick={onZerarContagem}
              className="w-full bg-[#da3633]/20 hover:bg-[#da3633]/30 text-[#f85149] border border-[#da3633]/40 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              Zerar Contagem do Dia
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-[10px] text-slate-500 border-t border-[#30363d] pt-3">
        Landell.Studio // Fila OS v1.0
      </div>
    </div>
  );
}