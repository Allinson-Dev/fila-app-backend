'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-obsidian-950/70 backdrop-blur-xl border-b border-bone-100/10 text-bone-100 font-mono text-xs transition-all duration-300 shadow-2xl shadow-cyan-glow/5"
    >
      <div className="tracking-widest uppercase text-bone-200 hover:text-cyan-400 transition-colors cursor-pointer">
        LEONARDO LANDELL
      </div>

      <nav className="hidden md:flex items-center gap-8 tracking-widest text-bone-400">
        <a href="#sobre" className="hover:text-cyan-400 transition-colors duration-200">SOBRE</a>
        <a href="#projetos" className="hover:text-cyan-400 transition-colors duration-200">PROJETOS</a>
        <a href="#stack" className="hover:text-cyan-400 transition-colors duration-200">STACK</a>
        <a href="#contato" className="hover:text-cyan-400 transition-colors duration-200">CONTATO</a>
      </nav>

      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="tracking-widest text-[10px]">DISPONÍVEL, SP</span>
      </div>
    </motion.header>
  );
};