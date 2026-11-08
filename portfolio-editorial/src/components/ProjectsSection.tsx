'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  techs: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  highlight?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    title: 'Lumos Workspace',
    category: 'React // Produtividade & Reatividade',
    description: 'Um ambiente de trabalho digital imersivo projetado para centralizar tarefas e otimizar fluxos de trabalho. Desenvolvido com arquitetura de componentes modulares em React, gestão de estado global eficiente e foco em micro-interações fluidas.',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/LeonardoLandell',
    highlight: true,
  },
  {
    title: 'Maison Noire',
    category: 'Editorial // Campanha de Moda Italiana',
    description: 'Plataforma web desenvolvida para uma campanha editorial de moda italiana de alta-costura. O projeto traduz o minimalismo sofisticado e o luxo atemporal através de uma direção de arte impecável, tipografia refinada e animações fluidas.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/LeonardoLandell',
  },
  {
    title: 'Toque de Cura',
    category: 'Landing Page // Conversão & Serviços',
    description: 'Landing page de alta conversão estruturada estrategicamente para a contratação de massagens terapêuticas. Focada em experiência do utilizador (UX), clareza de chamada para ação (CTA) e carregamento otimizado.',
    techs: ['React', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/LeonardoLandell',
  },
];

// Componente Individual com Efeito 3D Tilt para os Projetos
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`rounded-3xl border backdrop-blur-2xl transition-all duration-300 ease-out relative overflow-hidden group flex flex-col justify-between ${
        project.highlight 
          ? 'bg-obsidian-900/90 border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,240,255,0.15)] md:col-span-2' 
          : 'bg-obsidian-950/70 border-bone-100/10 hover:border-violet-400/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
      }`}
    >
      <div style={{ transform: 'translateZ(25px)' }} className="flex flex-col h-full p-8 transition-transform duration-300">
        
        {/* Header do Card */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            {project.category}
          </span>
          {project.highlight && (
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-wider font-semibold">
              FEATURED PROJECT
            </span>
          )}
        </div>

        {/* Imagem Editorial do Projeto com Zoom no Hover */}
        <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden mb-6 border border-bone-100/10 bg-obsidian-950">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Informações */}
        <h3 className="font-serif text-2xl text-bone-50 mb-3 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>

        <p className="font-sans text-sm text-bone-200/80 leading-relaxed mb-6 font-light">
          {project.description}
        </p>

        {/* Tecnologias Utilizadas */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techs.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 rounded-lg bg-obsidian-950/80 border border-bone-100/10 font-mono text-xs text-bone-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links de Ação */}
        <div className="flex items-center gap-4 pt-4 border-t border-bone-100/10 mt-auto">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-obsidian-950 bg-bone-100 px-5 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-colors shadow-lg"
            >
              <span>VER PROJETO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-bone-100 border border-bone-100/20 px-5 py-2.5 rounded-full hover:border-violet-400 hover:text-violet-300 transition-colors"
            >
              {/* GitHub SVG Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>CÓDIGO FONTE</span>
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projetos" className="py-24 px-6 bg-obsidian-950 text-bone-100 border-t border-bone-100/10 relative overflow-hidden">
      
      {/* Glow Atmosférico */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-glow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              // PORTFÓLIO DE ENGENHARIA
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-bone-50">
              Projetos Selecionados
            </h2>
          </div>
          <p className="font-sans text-sm text-bone-200/70 max-w-md font-light">
            Aplicações web desenvolvidas com foco em arquitetura limpa, tipagem estática rigorosa e experiências visuais imersivas.
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};