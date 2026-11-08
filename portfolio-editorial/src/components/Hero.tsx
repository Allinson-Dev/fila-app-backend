'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-16 bg-obsidian-950 text-bone-100 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        
        {/* Etiqueta Editorial Nítida */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-obsidian-900 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-xl mb-8 group hover:border-violet-400 transition-colors duration-500"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 group-hover:text-violet-400 transition-colors animate-pulse" />
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold group-hover:text-violet-300 transition-colors">
            JUNIOR FRONT-END DEVELOPER // CURSANDO ADS
          </span>
        </motion.div>

        {/* Título com Destaque Colorido Nítido e Sólido */}
        <motion.h1 
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${mousePos.y * -8}deg)`,
          }}
          transition={{ type: 'spring', stiffness: 75, damping: 15 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-bone-50 mb-8 cursor-default"
        >
          Construindo interfaces que unem{' '}
          <span className="italic font-normal text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
            estética refinada
          </span>{' '}
          e alta performance.
        </motion.h1>

        {/* Sua Foto com Efeito 3D e Borda Colorida Nítida */}
        <motion.div 
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -12}deg)`,
          }}
          className="relative my-6 group cursor-pointer"
        >
          {/* Anel de luz vibrante */}
          <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-bone-100/40 bg-obsidian-900 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <img 
              src="/leonardo.jpg" 
              alt="Leonardo Landell" 
              onError={(e) => {
                // Fallback elegante enquanto você não salva a foto na pasta public/
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
              }}
              className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition duration-700 scale-100 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Subtítulo com Destaques Nítidos */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-base md:text-lg text-bone-200/90 max-w-2xl leading-relaxed font-light mb-8"
        >
          Especialista em ecossistemas reativos com{' '}
          <strong className="text-cyan-400 font-semibold underline decoration-cyan-400/40 underline-offset-4">
            React, Next.js e TypeScript
          </strong>
          . Foco em componentização limpa, arquitetura escalável e experiências 3D imersivas.
        </motion.p>

        {/* Localização */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-bone-400 uppercase mb-10">
          <span className="text-bone-200 font-semibold">LEONARDO LANDELL</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-cyan-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> São Paulo, SP
          </span>
        </div>

        {/* Botões de Ação com Alto Contraste */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a 
            href="#projetos"
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-bone-100 text-obsidian-950 font-mono text-xs font-bold tracking-widest hover:bg-cyan-400 transition-all duration-300 shadow-xl"
          >
            <span>VER PROJETOS</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>

          <motion.a 
            href="#contato"
            whileHover={{ scale: 1.06, borderColor: '#a855f7', boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-bone-100/30 bg-obsidian-900/80 backdrop-blur-xl font-mono text-xs tracking-widest text-bone-100 hover:text-violet-300 transition-all duration-300 shadow-xl"
          >
            <span>ENTRAR EM CONTATO</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};