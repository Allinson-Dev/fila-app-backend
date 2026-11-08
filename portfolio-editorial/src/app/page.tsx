'use client';

import { InteractiveCanvas } from '@/components/InteractiveCanvas';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Manifesto } from '@/components/Manifesto';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { BentoGridSection } from '@/components/BentoGridSection';
import { ProjectsSection } from '@/components/ProjectsSection'
 
export default function Home() {
  return (
    <main className="bg-obsidian-950 min-h-screen text-bone-100 selection:bg-cyan-glow selection:text-obsidian-950 relative overflow-hidden">
      {/* Fundo 3D Holográfico Interativo */}
      <InteractiveCanvas />
      
      {/* Camadas de Conteúdo */}
      <Navbar />
      <Hero />
      <Manifesto />
      <ProjectsSection />
      <SkillsMatrix />
      <BentoGridSection />
    </main>
  );
}