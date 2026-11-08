export function Hero() {
  const whatsappNumber = "5500000000000";
  const whatsappMessage = encodeURIComponent("Olá! Vim pela página e gostaria de encomendar um terço personalizado.");

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-brand-pearl to-brand-wood/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Slogan com toque delicado */}
        <span className="inline-block text-xs uppercase tracking-widest text-brand-rose font-semibold mb-4 bg-brand-rose/10 px-3 py-1 rounded-full">
          Feito à mão com devoção e carinho
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-coffee tracking-tight mb-6 leading-tight">
          Cada laço, cada conta, <br />
          <span className="text-brand-gold italic">uma singela oração.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-brand-coffee/80 text-base sm:text-lg mb-10 font-light">
          Conheça nossa vitrine virtual de terços artesanais exclusivos para momentos especiais, batizados, noivas e lembranças que marcam vidas.
        </p>

        {/* CTA principal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#vitrine"
            className="w-full sm:w-auto bg-brand-coffee text-brand-pearl px-8 py-3.5 rounded-full font-medium transition-all hover:bg-brand-coffee/90 shadow-md"
          >
            Ver Vitrine de Terços
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-brand-coffee/30 text-brand-coffee px-8 py-3.5 rounded-full font-medium transition-all hover:bg-brand-wood/50"
          >
            Falar com a Artesã
          </a>
        </div>

      </div>
    </section>
  );
}