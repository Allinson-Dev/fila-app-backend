import axios from 'axios';

// Aponta diretamente para a porta 5000 definida no Program.cs do backend
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para consumir os endpoints da API de filas
export const queueService = {
  // Buscar todas as senhas da fila
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },

  // Gerar nova senha no Kiosque
  createTicket: async (data: { customerName: string; priority: 'normal' | 'preferential' }) => {
    const response = await api.post('/tickets', data);
    return response.data;
  },

  // Chamar próximo cliente no Guichê
  callNext: async (serviceWindow: string) => {
    const response = await api.post('/tickets/call-next', { serviceWindow });
    return response.data;
  },

  // Concluir um atendimento
  completeTicket: async (id: string) => {
    const response = await api.put(`/tickets/${id}/complete`);
    return response.data;
  },
};