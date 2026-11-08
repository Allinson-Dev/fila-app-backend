'use client';

export function Footer() {
  return (
    <footer className="bg-brand-wood/40 border-t border-brand-wood/60 py-12 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="font-serif text-xl text-brand-coffee block mb-2">
          Singela Oração
        </span>
        <p className="text-xs text-brand-coffee/60 tracking-wider uppercase mb-4">
          Terços Artesanais & Devoção
        </p>
        <p className="text-sm text-brand-coffee/70 font-light">
          © {new Date().getFullYear()} Singela Oração. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}