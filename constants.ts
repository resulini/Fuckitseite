import { Service, FaqItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'classic',
    title: 'Классический массаж',
    description: 'Идеально для тех, кто хочет сбросить груз забот. Мы проработаем каждый сантиметр спины.',
    price: '2 500 ₽',
    duration: '60 мин',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop', // Realistic hands with oil
  },
  {
    id: 'sports',
    title: 'Спортивный массаж',
    description: 'Глубокая проработка мышц. Восстановление эластичности и снятие напряжения после нагрузок.',
    price: '3 000 ₽',
    duration: '60 мин',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop', // Deep tissue/muscle focus
  },
  {
    id: 'spa',
    title: 'Hot Stone Therapy',
    description: 'Массаж горячими камнями. Глубокое прогревание и расслабление каждой клеточки тела.',
    price: '5 500 ₽',
    duration: '90 мин',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop', // Hot stones
  }
];

export const TEAM = [
  {
    id: 1,
    name: 'Анна',
    role: 'Топ-мастер, SPA-терапевт',
    experience: 'Опыт 8 лет',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    specialization: 'Специалист по расслабляющим техникам и стоун-терапии.'
  },
  {
    id: 2,
    name: 'Михаил',
    role: 'Массажист-реабилитолог',
    experience: 'Опыт 12 лет',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    specialization: 'Глубокая проработка мышц, спортивный массаж, работа с триггерами.'
  },
  {
    id: 3,
    name: 'Виктория',
    role: 'Мастер коррекции фигуры',
    experience: 'Опыт 5 лет',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    specialization: 'Лимфодренаж, антицеллюлитные программы, обертывания.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Елена Смирнова',
    text: 'Лучший массаж в городе! Атмосфера просто космос, сразу забываешь о работе. Мастер Анна — волшебница.',
    rating: 5
  },
  {
    id: 2,
    name: 'Дмитрий Волков',
    text: 'Хожу на спортивный массаж после зала. Отлично снимает напряжение, восстанавливаюсь намного быстрее.',
    rating: 5
  },
  {
    id: 3,
    name: 'Мария К.',
    text: 'Очень чисто, уютно и тихо. Сервис на высоте, администраторы вежливые. Чай после сеанса — отдельный вид удовольствия.',
    rating: 5
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Нужно ли брать с собой полотенце?',
    answer: 'Нет, мы позаботились обо всем. Вам предоставят свежий халат, одноразовое белье, тапочки и пушистые полотенца. Просто приходите.'
  },
  {
    question: 'Есть ли противопоказания к массажу?',
    answer: 'Да, к основным относятся: высокая температура, острые воспалительные процессы, кожные заболевания в стадии обострения. Перед сеансом мастер обязательно уточнит состояние вашего здоровья.'
  },
  {
    question: 'Можно ли записаться вдвоем на одно время?',
    answer: 'Конечно. У нас есть парный кабинет, где вы сможете разделить моменты релаксации с близким человеком.'
  },
  {
    question: 'Какие масла вы используете?',
    answer: 'Мы используем только натуральные органические масла (кокосовое, миндальное, виноградной косточки) без синтетических отдушек. Для ароматерапии добавляем чистые эфирные масла.'
  }
];

export const CONTACT_INFO = {
  address: 'г. Екатеринбург, ул. Тихая Аллея, д. 12',
  phone: '+7 (999) 123-45-67',
  hours: 'Ежедневно с 10:00 до 22:00',
  instagram: '@estetika_tela_ekb'
};