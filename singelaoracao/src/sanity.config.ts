import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default defineConfig({
  name: 'default',
  title: 'Singela Oração - Admin',

  projectId: projectId || 'insira-o-project-id-no-env',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // Altere aqui para /studio
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [
      {
        name: 'product',
        title: 'Terços / Produtos',
        type: 'document',
        fields: [
          { name: 'title', title: 'Nome do Terço', type: 'string' },
          { name: 'code', title: 'Código (Ex: TRC-01)', type: 'string' },
          { name: 'price', title: 'Preço (R$)', type: 'number' },
          { name: 'description', title: 'Descrição', type: 'text' },
          { 
            name: 'image', 
            title: 'Foto do Terço', 
            type: 'image', 
            options: { hotspot: true } 
          },
        ],
      },
    ],
  },
});