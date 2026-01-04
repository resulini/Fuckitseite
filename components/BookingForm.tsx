import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { createBooking } from '../services/storageService';
import { CheckCircle, Loader2 } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: SERVICES[0].id
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1. Save to Local Storage (Admin Dashboard)
    createBooking({
      clientName: formData.name,
      clientPhone: formData.phone,
      serviceId: formData.serviceId,
      date: new Date().toISOString()
    });

    // 2. Send to Telegram via Netlify Function
    try {
      const response = await fetch('/.netlify/functions/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: SERVICES.find(s => s.id === formData.serviceId)?.title || formData.serviceId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send telegram message');
      }

    } catch (err) {
      console.error('Telegram send error:', err);
      // We don't block the UI success state if telegram fails, 
      // but in a real app you might want to log this or retry.
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6 text-green-400 shadow-[0_0_20px_-5px_rgba(74,222,128,0.4)]">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Заявка успешно отправлена</h3>
        <p className="text-stone-400 mb-8 max-w-sm mx-auto">
          Наш администратор уже видит вашу заявку и позвонит вам в ближайшее время.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFormData({name:'', phone:'', serviceId: SERVICES[0].id}); }}
          className="text-sm font-bold text-white hover:text-gold-400 transition-colors"
        >
          Вернуться к форме
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-stone-500 font-bold ml-2">Имя</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold-500 focus:bg-dark-800 transition-all placeholder-stone-600"
            placeholder="Ваше имя"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-stone-500 font-bold ml-2">Телефон</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold-500 focus:bg-dark-800 transition-all placeholder-stone-600"
            placeholder="+7 (999) 000-00-00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-stone-500 font-bold ml-2">Выберите услугу</label>
        <div className="relative">
          <select
            value={formData.serviceId}
            onChange={e => setFormData({...formData, serviceId: e.target.value})}
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-gold-500 focus:bg-dark-800 transition-all cursor-pointer"
          >
            {SERVICES.map(s => (
              <option key={s.id} value={s.id} className="bg-dark-900 text-stone-300">
                {s.title} — {s.price}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-dark-900 py-4 rounded-xl mt-4 font-bold text-lg hover:bg-gold-400 hover:shadow-gold transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Подтвердить запись'}
      </button>

      <p className="text-[10px] text-stone-600 text-center">
        Нажимая кнопку, вы даете согласие на обработку персональных данных.
      </p>
    </form>
  );
};

const ChevronDownIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);