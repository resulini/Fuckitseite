import React, { useState, useMemo, useRef } from 'react';
import { Layout } from './components/Layout';
import { BookingForm } from './components/BookingForm';
import { SERVICES, FAQ_ITEMS, TESTIMONIALS, TEAM } from './constants';
import { AdminDashboard } from './components/AdminDashboard';
import { ChevronDown, Plus, ArrowRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc' | 'duration'>('default');
  
  // REMOVED: Parallax hook causing crash (useScroll/useTransform)
  // Instead, we use simple relative/absolute positioning for stability.

  if (isAdmin) {
    return <AdminDashboard onBack={() => setIsAdmin(false)} />;
  }

  // Sorting Logic
  const sortedServices = useMemo(() => {
    const services = [...SERVICES];
    switch (sortOption) {
      case 'price-asc':
        return services.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
      case 'price-desc':
        return services.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
      case 'duration':
        return services.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      default:
        return services;
    }
  }, [sortOption]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout onAdminClick={() => setIsAdmin(true)}>
      {/* Hero Section - STABLE VERSION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">
        {/* Background Image: Absolute & Fixed-like via simple CSS */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           {/* Removed motion.div parallax y-transform to prevent visual crash/jitter on scroll */}
           <div className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2000&auto=format&fit=crop" 
                alt="Premium Spa Interior" 
                className="w-full h-full object-cover opacity-90"
              />
           </div>
           {/* Darker Overlay for Readability */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
           
           {/* Top Gradient for Header Readability */}
           <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/90 to-transparent z-10 pointer-events-none"></div>
           
           {/* Bottom Gradient for Smooth Transition */}
           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Abstract Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-600/20 rounded-full blur-[120px] opacity-30 animate-pulse z-0"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center px-4 md:px-6 w-full max-w-4xl"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md">
            <span className="text-gold-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Premium Wellness</span>
          </div>
          
          {/* Responsive Font Sizes */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 mb-6 tracking-[1px] md:tracking-[2px] leading-[0.95]">
            ESTETIKA <br />
            <span className="text-white text-glow">TELA</span>
          </h1>
          
          <p className="text-stone-200 text-base md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed px-2">
            Перезагрузка тела и разума. <br/>
            Профессиональный массаж в атмосфере абсолютного комфорта.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-6">
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-dark-900 rounded-full font-bold hover:bg-white transition-all hover:shadow-gold transform hover:-translate-y-1"
            >
              Выбрать процедуру
            </button>
            <button 
               onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
               className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold-400 text-gold-100 rounded-full font-medium hover:bg-gold-500 hover:text-dark-900 transition-all backdrop-blur-sm"
            >
              Узнать больше
            </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
          <span className="text-[10px] uppercase tracking-widest text-stone-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent"></div>
        </div>
      </section>

      {/* Services Section with Real Images */}
      <section id="services" className="py-24 md:py-32 bg-dark-900 relative">
        <div className="container mx-auto px-6">
          {/* Header Centered */}
          <div className="flex flex-col items-center justify-center text-center mb-16 gap-8">
             <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Наши услуги</h2>
                <p className="text-stone-400 max-w-md mx-auto">Выберите идеальный способ восстановления.</p>
             </div>
             
             <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/5">
                {['default', 'price-asc', 'duration'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => setSortOption(opt as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        sortOption === opt 
                        ? 'bg-gold-500 text-dark-900 shadow-gold' 
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {opt === 'default' ? 'Все' : opt === 'price-asc' ? 'Цена' : 'Время'}
                  </button>
                ))}
             </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
            {sortedServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                layout
                variants={fadeInUp}
                className="glass-card rounded-[2rem] flex flex-col justify-between group transition-all duration-500 relative overflow-hidden h-[500px]"
              >
                {/* Image Background for Top Half */}
                <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/95 z-10"></div>
                    <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                {/* Content Overlay - Adjusted padding and z-index for readability */}
                <div className="relative z-20 flex flex-col h-full justify-end p-6 md:p-10">
                   <div className="absolute top-6 right-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-stone-300">
                        {service.duration}
                        </span>
                   </div>

                  <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors drop-shadow-md">{service.title}</h3>
                    {/* Added padding to description to ensure it doesn't hit edges */}
                    <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-3 pr-2">{service.description}</p>
                    
                    <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                      {/* GOLD PRICE COLOR */}
                      <span className="text-xl md:text-2xl font-bold text-gold-400">{service.price}</span>
                      <button 
                        onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-10 h-10 rounded-full bg-white text-dark-900 flex items-center justify-center hover:bg-gold-400 hover:scale-110 transition-all duration-300 shadow-lg"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MASTERS / TEAM SECTION - REDESIGNED FOR READABILITY */}
      <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-700/5 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ваши <span className="text-gold-400">мастера</span></h2>
                <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
                    Наши специалисты — это профессионалы с медицинским образованием и многолетним опытом. 
                    Мы заботимся не только о вашем теле, но и о душевном равновесии.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM.map((member) => (
                    <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative flex flex-col h-full"
                    >
                        <div className="h-[500px] relative rounded-2xl overflow-hidden mb-0 shadow-2xl border border-white/5">
                            {/* Image fills the card */}
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                            />
                            
                            {/* Info is now in a Glass Card at the bottom, NOT overlapping directly on image without contrast */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <div className="glass-card bg-dark-900/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-glass">
                                    <div className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-1">{member.role}</div>
                                    <h3 className="text-2xl font-serif text-white mb-3">{member.name}</h3>
                                    <p className="text-stone-300 text-sm leading-relaxed border-t border-white/10 pt-3">
                                        {member.specialization}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/5">
                {[
                    { number: '5+', label: 'Лет опыта' },
                    { number: '2k+', label: 'Клиентов' },
                    { number: '100%', label: 'Стерильность' },
                    { number: 'Premium', label: 'Косметика' },
                ].map((badge, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold-300 to-gold-600 mb-2">{badge.number}</div>
                        <div className="text-stone-500 text-[10px] md:text-xs uppercase tracking-widest">{badge.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl font-bold text-white mb-12 text-center">Что говорят <span className="text-gold-400">клиенты</span></h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {TESTIMONIALS.map((review) => (
                   <div key={review.id} className="glass-card p-8 rounded-2xl relative">
                       <Quote className="absolute top-6 right-6 text-white/10" size={40} />
                       <div className="flex gap-1 mb-4">
                           {[...Array(review.rating)].map((_, i) => (
                               <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                           ))}
                       </div>
                       <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                       <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-600 flex items-center justify-center text-xs font-bold text-white">
                               {review.name.charAt(0)}
                           </div>
                           <span className="text-white font-medium text-sm">{review.name}</span>
                       </div>
                   </div>
               ))}
           </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-950"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-16 border border-white/5 bg-dark-900/80">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Запись на сеанс</h2>
              <p className="text-stone-400">Оставьте заявку, и мы свяжемся с вами в течение 15 минут.</p>
            </div>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-dark-900">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Частые вопросы</h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-stone-200 text-sm md:text-base pr-4">{item.question}</span>
                  <span className={`p-2 rounded-full bg-white/5 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === index ? 'rotate-45' : ''}`}>
                    <Plus size={16} className="text-gold-400" />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-stone-400 leading-relaxed text-sm">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;