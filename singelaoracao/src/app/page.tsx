// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Terço de Noiva Clássico Pérola',
      price: '189.90',
      category: 'Noiva',
      imageUrl: 'https://images.unsplash.com/photo-1584210636754-d8bc049c3623?auto=format&fit=crop&q=80&w=800',
      badge: 'Mais Vendido',
      description: 'Feito artesanalmente com pérolas selecionadas e crucifixe trabalhado.'
    },
    {
      id: 2,
      name: 'Terço em Madeira Oliveiras',
      price: '95.00',
      category: 'Madeira',
      imageUrl: 'https://images.unsplash.com/photo-1609137144843-2511470e5e5d?auto=format&fit=crop&q=80&w=800',
      badge: 'Especial',
      description: 'Contas em madeira natural com aroma suave e excelente durabilidade.'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#2D2626] font-sans">
      {/* Navbar Superior */}
      <header className="sticky top-0 z-50 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#E8A5A5]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl sm:text-3xl tracking-wide text-[#4A0E17]">
              Singela Oração
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#inicio" className="hover:text-[#DF9196] transition">Início</a>
            <a href="#produtos" className="hover:text-[#DF9196] transition">Terços</a>
            <a href="#sobre" className="hover:text-[#DF9196] transition">Nossa Arte</a>
            <a href="/admin" className="text-[#A8817D] hover:text-[#4A0E17] transition">Painel Admin</a>
          </nav>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#9DA893] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#88937e] transition shadow-sm"
          >
            Fale Conosco
          </a>
        </div>
      </header>

      {/* Hero Section Equilibrada com a Imagem de Fundo e Texto Legível */}
      <section id="inicio" className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1600"
            alt="Fundo Bouquet"
            className="w-full h-full object-cover object-center brightness-90"
          />
          {/* Camada translúcida para garantir leveza e legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF7]/80 via-[#FCFBF7]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest bg-[#DF9196]/20 text-[#4A0E17] px-3 py-1 rounded-full font-semibold">
            Artesanato Devocional
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#4A0E17] leading-tight">
            Terços que inspiram a fé e o amor
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Cada peça é confeccionada manualmente com oração, carinho e materiais nobres para acompanhar os seus momentos mais sagrados.
          </p>
          <div className="pt-4">
            <a
              href="#produtos"
              className="bg-[#4A0E17] text-[#FCFBF7] px-8 py-3 rounded-full font-medium hover:bg-[#63141f] transition shadow-md"
            >
              Ver Coleção
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Produtos */}
      <main id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A0E17]">Nossos Terços</h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Escolha o modelo ideal para o seu dia a dia, para presentear ou para o dia do seu matrimónio.
          </p>

          {/* Filtros */}
          <div className="flex justify-center gap-2 pt-4 flex-wrap">
            {['Todos', 'Noiva', 'Madeira'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  activeCategory === cat
                    ? 'bg-[#4A0E17] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#DF9196]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vitrine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[#E8A5A5]/20 shadow-sm hover:shadow-md transition group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#DF9196] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs text-[#A8817D] uppercase tracking-wider font-semibold">{product.category}</span>
                <h3 className="font-serif text-xl text-[#4A0E17]">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-[#4A0E17]">R$ {product.price}</span>
                  <a
                    href={`https://wa.me/5500000000000?text=Olá! Gostaria de encomendar o terço: ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#9DA893] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#88937e] transition"
                  >
                    Pedir no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-[#FAF5F2] border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="font-serif text-2xl text-[#4A0E17]">Singela Oração</p>
          <p className="text-xs text-gray-500">Feito com amor e devoção para você. Todos os direitos reservados.</p>
          <div className="pt-2">
            <a href="/admin" className="text-xs text-[#A8817D] hover:underline">Painel Admin Restrito</a>
          </div>
        </div>
      </footer>
    </div>
  );
}