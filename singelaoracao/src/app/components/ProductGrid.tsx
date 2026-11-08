import { getProducts } from '@/sanity/lib/client';
import Image from 'next/image';

export default async function ProductGrid() {
  // Busca os produtos direto do Sanity
  const products = await getProducts();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif text-center mb-12 text-brand-coffee">
        Nossas Coleções
      </h2>

      {/* Caso ainda não haja produtos, exibe um aviso amigável */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white/50 rounded-lg border border-brand-wood/20 max-w-md mx-auto">
          <p className="text-brand-coffee/70 font-serif text-lg">
            Nenhum terço cadastrado no momento.
          </p>
          <p className="text-sm text-brand-coffee/50 mt-2">
            Acesse o painel em <span className="underline font-mono">/studio</span> para cadastrar o primeiro produto junto com a cliente!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm border border-brand-wood/20 overflow-hidden">
              {product.imageUrl && (
                <div className="relative h-64 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="text-xs text-brand-rose font-semibold tracking-wider uppercase">
                  {product.code}
                </span>
                <h3 className="text-xl font-serif text-brand-coffee mt-1 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-brand-coffee/70 line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-brand-coffee">
                    R$ {product.price?.toFixed(2)}
                  </span>
                  <button className="bg-brand-rose text-white px-4 py-2 rounded text-sm hover:opacity-90 transition">
                    Encomendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}