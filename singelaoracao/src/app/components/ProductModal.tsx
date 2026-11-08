'use client';

import { useStore } from '@/app/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, MessageCircle } from 'lucide-react';

export function ProductModal() {
  const { selectedProduct, isModalOpen, closeModal } = useStore();

  if (!selectedProduct) return null;

  const whatsappNumber = "5500000000000";
  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse em encomendar o terço: *${selectedProduct.title}* (Código: ${selectedProduct.code}). Gostaria de tirar algumas dúvidas.`);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          
          {/* Backdrop com animação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0"
          />

          {/* Conteúdo do Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-brand-pearl rounded-3xl overflow-hidden shadow-xl max-w-2xl w-full border border-brand-wood z-10 flex flex-col md:flex-row"
          >
            {/* Botão de Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-brand-coffee p-2 rounded-full transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagem do Produto */}
<div className="relative w-full md:w-1/2 h-72 md:h-auto bg-brand-wood/30">
  {selectedProduct.imageUrl && (
    <Image
      src={selectedProduct.imageUrl}
      alt={selectedProduct.title}
      fill
      className="object-cover"
    />
  )}
</div>

            {/* Informações */}
            <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <span className="text-xs font-semibold text-brand-rose uppercase tracking-wider">
                  Cód: {selectedProduct.code}
                </span>
                <h3 className="font-serif text-2xl text-brand-coffee font-medium mt-1 mb-3">
                  {selectedProduct.title}
                </h3>
                <p className="text-brand-coffee/80 text-sm font-light leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6 border-t border-brand-wood/60 pt-4">
                  <span className="text-xs uppercase tracking-wider text-brand-coffee/60">Valor</span>
                  <span className="font-serif text-2xl font-semibold text-brand-coffee">
                    R$ {selectedProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand-whatsapp text-white py-3 rounded-xl font-medium transition-opacity hover:opacity-90 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Encomendar pelo WhatsApp
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}