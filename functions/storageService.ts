import { Booking, BookingStatus } from '../types';

const STORAGE_KEY = 'estetika_bookings';

export const getBookings = (): Booking[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    status: BookingStatus.New,
  };
  
  const bookings = getBookings();
  bookings.unshift(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  
  return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking['status']): void => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
};

export const deleteBooking = (id: string): void => {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};