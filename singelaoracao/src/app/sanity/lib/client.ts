    import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false garante que veremos os novos produtos publicados na hora
});

// Função que busca os produtos cadastrados no Sanity
export async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    title,
    code,
    price,
    description,
    "imageUrl": image.asset->url
  }`;

  return await client.fetch(query);
}