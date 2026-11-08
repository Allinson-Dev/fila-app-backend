import { useEffect, useState } from 'react';
import { queueService } from './services/api';

// Dentro do seu componente:
useEffect(() => {
  async function loadQueue() {
    try {
      const data = await queueService.getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    }
  }

  loadQueue();
}, []);