import React, { ReactNode } from 'react';
import { Menu, X, UserCheck, MessageCircle, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';

interface LayoutProps {
  children: ReactNode;
  onAdminClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(CONTACT_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-dark-900 font-sans text-stone-300 selection:bg-gold-500 selection:text-white relative">
      {/* Navigation - Floating Glass Style */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          isScrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        <div 
          className={`
            px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-between
            transition-all duration-500 border border-white/5
            ${isScrolled 
              ? 'bg-dark-900/80 backdrop-blur-xl shadow-lg' 
              : 'bg-transparent border-transparent'
            }
            ${/* FIX: Remove background when mobile menu is open to prevent clash */ ''}
            ${isMobileMenuOpen ? 'bg-transparent border-transparent shadow-none backdrop-blur-none' : ''}
            
            ${/* FIX: Always keep pill width on mobile (95%) and tablet (80%) */ ''}
            w-[95%] md:w-[80%] max-w-5xl
          `}
        >
          {/* Logo */}
          <div 
            className="text-xl md:text-2xl font-bold tracking-tight text-white cursor-pointer flex items-center gap-2 group relative z-50" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-dark-900 font-black text-xs shadow-gold group-hover:scale-110 transition-transform">
              ET
            </div>
            <span className="font-sans tracking-wide">ESTETIKA</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5">
            {['Услуги', 'О нас', 'FAQ', 'Контакты'].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item === 'Услуги' ? 'services' : item === 'О нас' ? 'about' : item === 'FAQ' ? 'faq' : 'contacts')}
                className="text-sm font-medium text-stone-400 hover:text-white hover:text-glow transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('booking')}
            className="hidden md:block px-6 py-2 bg-white text-dark-900 rounded-full text-sm font-bold hover:bg-gold-400 hover:shadow-gold transition-all transform hover:-translate-y-0.5"
          >
            Записаться
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white relative z-50 transition-transform duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            {isMobileMenuOpen ? <X size={24} className="text-gold-400" /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-dark-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-10 transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
             {/* Decorative element */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-600/10 rounded-full blur-[80px]"></div>

             <div className="flex flex-col items-center space-y-8 relative z-10">
              {['Услуги', 'О нас', 'FAQ', 'Контакты'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item === 'Услуги' ? 'services' : item === 'О нас' ? 'about' : item === 'FAQ' ? 'faq' : 'contacts')}
                  className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 hover:to-gold-400 transition-all tracking-wide"
                >
                  {item}
                </button>
              ))}
             </div>

             <div className="w-12 h-[1px] bg-white/10 relative z-10"></div>

             <button
              onClick={() => scrollToSection('booking')}
              className="relative z-10 px-12 py-5 bg-gold-500 text-dark-900 rounded-full text-xl font-bold shadow-gold transform active:scale-95 transition-all"
            >
              Записаться онлайн
            </button>
            
            <div className="absolute bottom-10 text-stone-600 text-xs tracking-widest uppercase">
              Estetika Tela
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-0 w-full overflow-hidden">
        {children}
      </main>

      {/* Floating Action Button (Telegram/WhatsApp) */}
      <a 
        href="https://t.me/estetika_tela" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center text-dark-900 shadow-gold-hover hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="Contact us on Telegram"
      >
        <MessageCircle size={28} />
      </a>

      {/* Footer */}
      <footer id="contacts" className="bg-dark-950 relative overflow-hidden border-t border-white/5 pt-20 pb-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-gold-500"></div>
                <h3 className="text-2xl font-bold text-white">ESTETIKA</h3>
              </div>
              <p className="text-stone-400 mb-6 font-light leading-relaxed text-sm">
                Пространство, где технологии встречают расслабление. 
                Минимализм, тишина и глубокое восстановление.
              </p>
              <button onClick={onAdminClick} className="text-xs text-stone-600 hover:text-gold-400 flex items-center gap-2 transition-colors">
                <UserCheck size={14}/> Вход для персонала
              </button>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Контакты</h4>
              <ul className="space-y-4 text-sm text-stone-400">
                <li className="flex flex-col">
                  <span className="text-stone-600 text-xs uppercase mb-1">Где мы</span>
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex flex-col group">
                   <span className="text-stone-600 text-xs uppercase mb-2">Связь</span>
                   {/* High Contrast Phone Block */}
                   <div className="flex items-center gap-3">
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold text-white hover:text-gold-400 transition-colors">
                        {CONTACT_INFO.phone}
                      </a>
                      <button 
                        onClick={handleCopyPhone}
                        className="p-2 rounded-full bg-white/10 hover:bg-gold-500 text-gold-400 hover:text-dark-900 transition-all shadow-sm"
                        title="Скопировать номер"
                        aria-label="Скопировать номер"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                   </div>
                   {copied && <span className="text-xs text-green-500 mt-1 block">Номер скопирован!</span>}
                </li>
              </ul>
            </div>

             <div>
              <h4 className="text-white font-bold mb-6">Меню</h4>
              <ul className="space-y-3 text-sm text-stone-400">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-gold-400 transition-colors">Услуги</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold-400 transition-colors">Мастера</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-gold-400 transition-colors">FAQ</button></li>
              </ul>
            </div>

            {/* Map Card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 relative group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&t=m&z=15&output=embed&iwloc=near&color_scheme=dark`}
                  className="filter grayscale invert-[0.9] opacity-60 group-hover:opacity-100 transition-all duration-500"
                  title="Salon Location"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl"></div>
            </div>
          </div>
          
          <div className="text-center text-xs text-stone-600 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2024 Estetika Tela. All rights reserved.</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};