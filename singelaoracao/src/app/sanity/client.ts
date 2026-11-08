import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-01-01',
  useCdn: true,
})

// Dados mockados de fallback para o portfólio / testes iniciais
export const fallbackProducts = [
  {
    _id: '1',
    title: 'Terço Pérolas com Dourado',
    code: 'TRC-01',
    price: 89.90,
    description: 'Terço artesanal confeccionado com pérolas em ABS, entremeios dourados com strass e crucifixo trabalhado.',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: '2',
    title: 'Terço Azul Mariano',
    code: 'TRC-02',
    price: 95.00,
    description: 'Contas em cristal azul translúcido, detalhes em pérolas brancas e medalha especial de Nossa Senhora.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: '3',
    title: 'Terço Noiva Clássico',
    code: 'TRC-03',
    price: 120.00,
    description: 'Especialmente desenvolvido para o grande dia, com pérolas peroladas de alta qualidade e acabamento refinado.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
  }
];

export async function getProducts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackProducts;
  }
  
  try {
    const query = `*[_type == "product"]{_id, title, code, price, description, "imageUrl": image.asset->url}`;
    const products = await sanityClient.fetch(query);
    return products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.warn("Erro ao buscar do Sanity, utilizando dados de fallback.", error);
    return fallbackProducts;
  }
}