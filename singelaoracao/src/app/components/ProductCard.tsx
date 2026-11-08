'use client';

import Image from 'next/image';
import { Product } from '@/app/types';
import { useStore } from '@/app/store/useStore';
import { MessageCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const openModal = useStore((state) => state.openModal);

  const whatsappNumber = "5500000000000";
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de encomendar o terço: *${product.title}* (Código: ${product.code}). Poderia me informar mais detalhes?`);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-wood/60 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col"
    >
      {/* Imagem do Produto */}
<div className="relative h-64 w-full bg-brand-wood/20 overflow-hidden cursor-pointer" onClick={() => openModal(product)}>
  {product.imageUrl && (
    <Image
      src={product.imageUrl}
      alt={product.title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )}
</div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 
            onClick={() => openModal(product)}
            className="font-serif text-lg text-brand-coffee font-medium mb-2 cursor-pointer hover:text-brand-rose transition-colors"
          >
            {product.title}
          </h3>
          <p className="text-brand-coffee/70 text-sm line-clamp-2 mb-4 font-light">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-brand-coffee/60">Valor</span>
            <span className="font-serif text-xl font-semibold text-brand-coffee">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openModal(product)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-brand-coffee/20 text-brand-coffee text-xs font-medium hover:bg-brand-wood/40 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Detalhes
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-whatsapp text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Encomendar
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}