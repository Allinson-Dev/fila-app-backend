export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0d1117] border-b border-[#21262d] text-slate-200">
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-sm tracking-wider text-slate-400">Landell.Studio</span>
        <span className="text-slate-600">//</span>
        <span className="font-bold text-sm tracking-wide text-blue-400">Fila OS</span>
      </div>
      <div className="flex items-center space-x-4 text-xs text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>API Conectada</span>
        </div>
      </div>
    </header>
  );
}