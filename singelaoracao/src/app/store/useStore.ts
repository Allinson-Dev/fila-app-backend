import { create } from 'zustand';
import { Product } from '@/types'; // ou '@/app/types' se estiver dentro da app

interface StoreState {
  selectedProduct: Product | null;
  isModalOpen: boolean;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedProduct: null,
  isModalOpen: false,
  openModal: (product) => set({ selectedProduct: product, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedProduct: null }),
}));