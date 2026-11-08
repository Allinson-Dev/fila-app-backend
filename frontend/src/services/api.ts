import axios from 'axios';
import type { TicketPriority } from '../types/queue';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // Ajuste para a porta do seu .NET
});

export interface Customer {
  id: number;
  nome: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
}

export const customerService = {
  // Buscar clientes com suporte à barra de pesquisa (Query `q`)
  search: async (query: string = ''): Promise<Customer[]> => {
    const response = await api.get(`/clientes?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Criar um novo cliente
  create: async (data: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await api.post('/clientes', data);
    return response.data;
  },

  // Gerar senha a partir de um cliente cadastrado (ajuste a rota conforme o SenhasController)
  generateTicketForCustomer: async (customerId: number, priority: TicketPriority) => {
    const response = await api.post('/senhas', { customerId, priority });
    return response.data;
  }
};