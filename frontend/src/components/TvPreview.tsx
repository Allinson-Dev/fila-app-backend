interface TvPreviewProps {
  currentSenha?: {
    codigo: string;
    clienteNome: string;
    servicoNome: string;
    etapaNome: string;
  };
}

export function TvPreview({ currentSenha }: TvPreviewProps) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col justify-between shadow-xl">
      <div>
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3 flex items-center justify-between">
          <span>TV Preview</span>
          <span className="text-[10px] text-slate-500 font-normal">Retorno Monitor</span>
        </div>

        {/* Display principal da Senha */}
        <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-6 text-center shadow-inner">
          <div className="text-5xl font-extrabold text-blue-400 tracking-tight mb-2">
            {currentSenha?.codigo || "B 417"}
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-4">Senha Atual</div>
          
          <div className="space-y-1.5 text-left border-t border-[#21262d] pt-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Cliente:</span>
              <span className="text-slate-200 font-medium truncate max-w-[140px]">
                {currentSenha?.clienteNome || "Maciana Silva"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Serviço:</span>
              <span className="text-slate-200 font-medium">
                {currentSenha?.servicoNome || "Atendimento"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Etapa:</span>
              <span className="text-emerald-400 font-medium">
                {currentSenha?.etapaNome || "Recepção"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-slate-500 text-center">
        Sincronizado via SignalR Core
      </div>
    </div>
  );
}