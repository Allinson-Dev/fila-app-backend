'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Manifesto: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0.2, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section className="py-24 px-6 bg-obsidian-950 border-t border-bone-100/10 text-bone-100">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Divisor Editorial */}
        <div className="font-serif italic text-6xl text-bone-400/40 select-none">
          
        </div>

        {/* Manifesto com Animação GSAP */}
        <h2 
          ref={textRef}
          className="font-serif text-2xl md:text-4xl lg:text-5xl leading-snug font-normal text-bone-100 max-w-3xl mx-auto"
        >
          "Eu projeto e desenvolvo experiências digitais inspiradas em produtos que transformam a relação entre pessoas e tecnologia."
        </h2>

        <div className="w-12 h-[1px] bg-cyan-glow/50 mx-auto" />
      </div>
    </section>
  );
};