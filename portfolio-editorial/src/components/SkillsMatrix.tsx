'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  desc: string;
  isCore: boolean;
}

const SKILLS_DATA: Skill[] = [
  { name: 'React.js', category: 'Frontend Core', desc: 'Arquitetura de componentes, Custom Hooks e performance.', isCore: true },
  { name: 'Next.js', category: 'Framework', desc: 'App Router, Server Components e otimização SEO.', isCore: true },
  { name: 'TypeScript', category: 'Linguagem', desc: 'Tipagem estática rigorosa e interfaces robustas.', isCore: true },
  { name: 'Tailwind CSS', category: 'Styling', desc: 'Design Systems atômicos e layouts responsivos.', isCore: true },
  { name: 'Zustand / Query', category: 'State Management', desc: 'Gerenciamento de estado global leve e cache assíncrono.', isCore: true },
  { name: 'Angular', category: 'Frontend', desc: 'Estruturação baseada em serviços e TypeScript.', isCore: false },
  { name: 'C#', category: 'Backend / OOP', desc: 'Conceitos de POO e sintaxe C#.', isCore: false },
  { name: 'MySQL', category: 'Database', desc: 'Consultas relacionais e modelagem de dados.', isCore: false },
  { name: 'Supabase', category: 'BaaS / SQL', desc: 'Autenticação, PostgreSQL e Webhooks.', isCore: false },
  { name: 'React Native', category: 'Mobile', desc: 'Aplicações móveis multi-plataforma.', isCore: false },
  { name: 'Sanity.io', category: 'Headless CMS', desc: 'Gerenciamento de conteúdo estruturado.', isCore: false },
  { name: 'Git & GitHub', category: 'Versionamento', desc: 'Fluxos de trabalho Git, PRs e Actions.', isCore: false },
];

export const SkillsMatrix: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'core' | 'secondary'>('all');

  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (filter === 'core') return skill.isCore;
    if (filter === 'secondary') return !skill.isCore;
    return true;
  });

  return (
    <section id="stack" className="py-24 px-6 bg-obsidian-900/40 backdrop-blur-xl text-bone-100 border-t border-bone-100/10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              // ARQUITETURA TÉCNICA
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-bone-50">
              Competências & Ecossistema
            </h2>
          </div>

          {/* Filtros com Glassmorphism */}
          <div className="flex items-center gap-2 p-1.5 bg-obsidian-950/80 backdrop-blur-md rounded-full border border-bone-100/10 self-start shadow-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${filter === 'all' ? 'bg-cyan-glow text-obsidian-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-bone-400 hover:text-bone-100'}`}
            >
              TODAS
            </button>
            <button
              onClick={() => setFilter('core')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-1 transition-all duration-300 ${filter === 'core' ? 'bg-cyan-glow text-obsidian-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-bone-400 hover:text-bone-100'}`}
            >
              <Sparkles className="w-3 h-3" /> CORE (PRINCIPAIS)
            </button>
            <button
              onClick={() => setFilter('secondary')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${filter === 'secondary' ? 'bg-bone-100 text-obsidian-950 font-bold' : 'text-bone-400 hover:text-bone-100'}`}
            >
              RADAR SECUNDÁRIO
            </button>
          </div>
        </div>

        {/* Grid com Glassmorphism e Glow no Hover */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 relative overflow-hidden group ${
                  skill.isCore 
                    ? 'bg-obsidian-900/80 border-cyan-glow/30 hover:border-cyan-glow/80 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]' 
                    : 'bg-obsidian-950/50 border-bone-100/10 hover:border-violet-glow/50 hover:shadow-[0_0_25px_rgba(138,43,226,0.15)] opacity-80 hover:opacity-100'
                }`}
              >
                {skill.isCore && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-glow/10 border-b border-l border-cyan-glow/30 rounded-bl-xl font-mono text-[10px] text-cyan-400 tracking-wider">
                    CORE SPOTLIGHT
                  </div>
                )}

                <span className="font-mono text-[11px] text-bone-400 uppercase tracking-widest block mb-1 group-hover:text-cyan-400 transition-colors">
                  {skill.category}
                </span>

                <h3 className="font-serif text-xl text-bone-50 mb-2 group-hover:text-bone-100 transition-colors">
                  {skill.name}
                </h3>

                <p className="font-sans text-xs text-bone-200/70 leading-relaxed">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};