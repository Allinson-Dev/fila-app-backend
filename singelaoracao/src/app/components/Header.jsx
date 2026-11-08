'use client'

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function Header() {
  const whatsappNumber = "5500000000000"; // Substitua pelo número real da cliente
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre os terços artesanais da Singela Oração.");

  return (
    <header className="sticky top-0 z-50 bg-brand-pearl/80 backdrop-blur-md border-b border-brand-wood/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Nome da Marca */}
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-wide text-brand-coffee">
            Singela Oração
          </span>
          <span className="text-[10px] tracking-widest text-brand-coffee/60 uppercase">
            Terços Artesanais
          </span>
        </Link>

        {/* Navegação / Ações */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-whatsapp text-white px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Encomendar via WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
}