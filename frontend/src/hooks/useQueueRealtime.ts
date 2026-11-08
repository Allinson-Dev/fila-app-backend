import { useEffect } from 'react';
import { queueHubConnection, startSignalRConnection } from '../services/signalr';

export function useQueueRealtime(onQueueUpdated: () => void) {
  useEffect(() => {
    // 1. Tenta escutar eventos via SignalR
    startSignalRConnection();

    queueHubConnection.on('QueueUpdated', () => {
      onQueueUpdated();
    });

    // 2. Fallback de Polling (recarrega a cada 3 segundos como segurança)
    const interval = setInterval(() => {
      onQueueUpdated();
    }, 3000);

    return () => {
      queueHubConnection.off('QueueUpdated');
      clearInterval(interval);
    };
  }, [onQueueUpdated]);
}