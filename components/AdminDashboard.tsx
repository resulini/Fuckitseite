import React, { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus, deleteBooking } from '../services/storageService';
import { Booking, BookingStatus } from '../types';
import { SERVICES } from '../constants';
import { ArrowLeft, RefreshCw, Trash2, Check, Clock, XCircle } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    updateBookingStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
      deleteBooking(id);
      loadData();
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch(status) {
      case BookingStatus.New: return 'bg-gold-900/30 text-gold-400 border border-gold-900';
      case BookingStatus.Confirmed: return 'bg-green-900/30 text-green-400 border border-green-900';
      case BookingStatus.Completed: return 'bg-dark-800 text-stone-400 line-through';
      case BookingStatus.Cancelled: return 'bg-red-900/30 text-red-400 border border-red-900';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-6 text-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Вернуться на сайт
          </button>
          <h1 className="text-2xl font-serif text-white">CRM: Управление записями</h1>
          <button onClick={loadData} className="p-2 bg-dark-900 rounded-full shadow-sm hover:text-gold-400 transition-all text-stone-400">
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-900 p-6 border-t-2 border-gold-500">
            <div className="text-stone-500 text-xs uppercase tracking-wider">Новые заявки</div>
            <div className="text-3xl font-semibold text-white mt-2">
              {bookings.filter(b => b.status === BookingStatus.New).length}
            </div>
          </div>
          <div className="bg-dark-900 p-6 border-t-2 border-green-500">
             <div className="text-stone-500 text-xs uppercase tracking-wider">Подтверждено</div>
            <div className="text-3xl font-semibold text-white mt-2">
              {bookings.filter(b => b.status === BookingStatus.Confirmed).length}
            </div>
          </div>
          <div className="bg-dark-900 p-6 border-t-2 border-stone-600">
             <div className="text-stone-500 text-xs uppercase tracking-wider">Всего записей</div>
            <div className="text-3xl font-semibold text-white mt-2">
              {bookings.length}
            </div>
          </div>
        </div>

        <div className="bg-dark-900 overflow-hidden border border-dark-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-dark-950 border-b border-dark-800">
                <tr>
                  <th className="p-4 font-medium text-stone-500 uppercase text-xs tracking-wider">Клиент</th>
                  <th className="p-4 font-medium text-stone-500 uppercase text-xs tracking-wider">Услуга</th>
                  <th className="p-4 font-medium text-stone-500 uppercase text-xs tracking-wider">Статус</th>
                  <th className="p-4 font-medium text-stone-500 uppercase text-xs tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-stone-600">Нет активных записей</td>
                  </tr>
                ) : (
                  bookings.map(booking => {
                    const serviceName = SERVICES.find(s => s.id === booking.serviceId)?.title || booking.serviceId;
                    return (
                      <tr key={booking.id} className="hover:bg-dark-800/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-white">{booking.clientName}</div>
                          <div className="text-sm text-stone-400">{booking.clientPhone}</div>
                          <div className="text-xs text-stone-600 mt-1">{new Date(booking.createdAt).toLocaleString('ru-RU')}</div>
                        </td>
                        <td className="p-4 text-stone-300">
                          {serviceName}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status === BookingStatus.New && 'Новая'}
                            {booking.status === BookingStatus.Confirmed && 'Подтверждена'}
                            {booking.status === BookingStatus.Completed && 'Завершена'}
                            {booking.status === BookingStatus.Cancelled && 'Отменена'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {booking.status === BookingStatus.New && (
                              <button 
                                onClick={() => handleStatusChange(booking.id, BookingStatus.Confirmed)}
                                className="p-1.5 text-green-500 hover:bg-green-900/20 rounded transition-colors"
                                title="Подтвердить"
                              >
                                <Check size={18} />
                              </button>
                            )}
                            {booking.status === BookingStatus.Confirmed && (
                              <button 
                                onClick={() => handleStatusChange(booking.id, BookingStatus.Completed)}
                                className="p-1.5 text-stone-400 hover:bg-dark-800 rounded transition-colors"
                                title="Завершить"
                              >
                                <Clock size={18} />
                              </button>
                            )}
                            <button 
                                onClick={() => handleStatusChange(booking.id, BookingStatus.Cancelled)}
                                className="p-1.5 text-red-500 hover:bg-red-900/20 rounded transition-colors"
                                title="Отменить"
                              >
                                <XCircle size={18} />
                              </button>
                            <button 
                              onClick={() => handleDelete(booking.id)}
                              className="p-1.5 text-stone-600 hover:text-red-500 hover:bg-red-900/10 rounded transition-colors"
                              title="Удалить"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};