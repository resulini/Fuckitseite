export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  date: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: number;
}

export enum BookingStatus {
  New = 'new',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface FaqItem {
  question: string;
  answer: string;
}