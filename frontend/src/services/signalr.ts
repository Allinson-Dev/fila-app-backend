import * as signalR from '@microsoft/signalr';

// Instância de conexão apontando para o Hub do .NET (URL padrão ex: /queueHub)
export const queueHubConnection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5000/queueHub', {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build();

export const startSignalRConnection = async () => {
  try {
    if (queueHubConnection.state === signalR.HubConnectionState.Disconnected) {
      await queueHubConnection.start();
      console.log('Conectado ao SignalR em tempo real!');
    }
  } catch (error) {
    console.error('Erro ao conectar ao SignalR:', error);
  }
};