export type TicketStatus = 'waiting' | 'calling' | 'completed' | 'cancelled';
export type TicketPriority = 'normal' | 'preferential';

export interface Ticket {
  id: string;
  number: string;
  customerName: string;
  priority: TicketPriority;
  serviceWindow?: string;
  status: TicketStatus;
  createdAt: string;
}