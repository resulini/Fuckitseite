import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { CheckCircle, Loader2 } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: SERVICES[0].id
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Данные формы:', formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6 text-green-400">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена</h3>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-gold-400"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          required
          placeholder="Ваше имя"
          className="w-full bg-dark-800 border border-white/10 rounded-xl px-5 py-4 text-white"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="tel"
          required
          placeholder="Телефон"
          className="w-full bg-dark-800 border border-white/10 rounded-xl px-5 py-4 text-white"
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
        />
      </div>
      <select
        value={formData.serviceId}
        onChange={e => setFormData({...formData, serviceId: e.target.value})}
        className="w-full bg-dark-800 border border-white/10 rounded-xl px-5 py-4 text-white"
      >
        {SERVICES.map(s => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-dark-900 py-4 rounded-xl font-bold flex items-center justify-center"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Записаться'}
      </button>
    </form>
  );
};
