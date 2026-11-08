'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const BentoGridSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'leonardolandell2000@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sobre" className="py-24 px-6 bg-obsidian-950 text-bone-100 border-t border-bone-100/10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Bento Grid: SOBRE MIM */}
        <div>
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4 block">
            01 — BENTO GRID / SOBRE MIM
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="md:col-span-2 p-8 rounded-2xl bg-obsidian-900 border border-bone-100/10 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl text-bone-50 mb-4">Engenharia Front-end & Craft</h3>
                <p className="font-sans text-sm text-bone-200/80 leading-relaxed mb-4">
                  Cursando Análise e Desenvolvimento de Sistemas (previsão 08/2028), dedico-me a dominar a construção de interfaces web modernas. Tenho compromisso absoluto com a fidelidade de UI/UX, acessibilidade e arquitetura limpa.
                </p>
              </div>
              <div className="font-mono text-xs text-cyan-400 pt-4 border-t border-bone-100/10">
                STATUS: Desenvolvendo aplicações com rigor de produção.
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-obsidian-900 border border-bone-100/10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-bone-400 uppercase tracking-wider">Formação</span>
                <h4 className="font-serif text-xl text-bone-50 mt-2">ADS</h4>
                <p className="font-sans text-xs text-bone-200/60 mt-1">Análise e Desenvolvimento de Sistemas</p>
              </div>
              <div className="font-mono text-xs text-bone-400 mt-6">
                Conclusão prevista: 2028
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-800 border border-bone-100/10 flex flex-col justify-center items-center text-center">
              <span className="font-serif italic text-lg text-bone-100">
                "It is not ready until it works."
              </span>
              <span className="font-mono text-[10px] text-cyan-400 mt-2 uppercase tracking-widest">
                — Filosofia de Código
              </span>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-obsidian-900 border border-bone-100/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-bone-400 uppercase tracking-wider">Base Operacional</span>
                <h4 className="font-serif text-xl text-bone-50 mt-1">São Paulo — SP, Brasil</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-glow/10 text-cyan-400 font-mono text-xs border border-cyan-glow/20">
                Remoto / Híbrido
              </span>
            </div>

          </div>
        </div>

        {/* Bento Grid: CONTATO HUB */}
        <div id="contato">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4 block">
            02 — BENTO GRID / CONTATO HUB
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="md:col-span-2 p-8 rounded-2xl bg-obsidian-900 border border-bone-100/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-bone-400 uppercase tracking-wider block mb-1">E-mail Direto</span>
                <span className="font-serif text-lg md:text-xl text-bone-50">{email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bone-100 text-obsidian-950 font-mono text-xs font-bold hover:bg-cyan-glow transition"
              >
                {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIADO!' : 'COPIAR E-MAIL'}</span>
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-obsidian-900 border border-bone-100/10 flex flex-col justify-between gap-4">
              <span className="font-mono text-xs text-bone-400 uppercase tracking-wider">Conectar</span>
              <div className="flex items-center gap-3">
                {/* LinkedIn SVG */}
                <a 
                  href="https://linkedin.com/in/Leonardo-Landell" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-obsidian-950 border border-bone-100/10 hover:border-cyan-glow text-bone-200 hover:text-cyan-glow transition flex items-center justify-center"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                {/* GitHub SVG */}
                <a 
                  href="https://github.com/LeonardoLandell" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-obsidian-950 border border-bone-100/10 hover:border-cyan-glow text-bone-200 hover:text-cyan-glow transition flex items-center justify-center"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};