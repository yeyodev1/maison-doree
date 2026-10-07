export const WHATSAPP = 'https://wa.me/593985504731'

export const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/people/Maison-Dor%C3%A9e/61594443597304' },
  { name: 'Instagram', href: 'https://www.instagram.com/maisondoreec' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@maisondoreec' },
  { name: 'WhatsApp', href: WHATSAPP },
] as const

export interface Flavor {
  id: string
  name: string
  es: string
  note: string
  accent: string
  bottle: string
  ticket: string
  mini: string
  film: string
}

export const FLAVORS: Flavor[] = [
  {
    id: 'vanille',
    name: 'Vanille Classique',
    es: 'Vainilla clásica',
    note: 'Licor crema sabor a vainilla. La receta de la casa, suave y redonda.',
    accent: '#c9a24a',
    bottle: '/images/bottle-vanille.png',
    ticket: '/images/ticket-vanille.png',
    mini: '/images/mini-vanille.png',
    film: '/video/vanille.mp4',
  },
  {
    id: 'cacao',
    name: 'Nuit de Cacao',
    es: 'Noche de cacao',
    note: 'Licor crema sabor a cacao ecuatoriano. Profundo, sedoso, de sobremesa.',
    accent: '#8a5a3c',
    bottle: '/images/bottle-cacao.png',
    ticket: '/images/ticket-cacao.png',
    mini: '/images/mini-cacao.png',
    film: '/video/cacao.mp4',
  },
  {
    id: 'brise',
    name: 'Brise Mentholée',
    es: 'Brisa mentolada',
    note: 'Licor crema sabor a menta. Fresco y brillante, pensado para servir bien frío.',
    accent: '#3f8f3a',
    bottle: '/images/bottle-brise.png',
    ticket: '/images/ticket-brise.png',
    mini: '/images/mini-brise-v2.png',
    film: '/video/brise.mp4',
  },
  {
    id: 'creme',
    name: 'Crème Cappuccino',
    es: 'Crema de capuchino',
    note: 'Licor crema sabor a café liofilizado. Para quienes no perdonan el café.',
    accent: '#a0673f',
    bottle: '/images/bottle-creme.png',
    ticket: '/images/ticket-creme.png',
    mini: '/images/mini-creme.png',
    film: '/video/creme.mp4',
  },
]

export const NEW_FLAVORS = [
  {
    id: 'saint-manicho',
    name: 'Saint Manicho',
    es: 'Santo Manicho',
    note: 'Licor crema de chocolate y maní.',
    image: '/images/pared-saint-manicho.jpg',
  },
  {
    id: 'pistache',
    name: 'Délice de Pistache',
    es: 'Delicia de pistacho',
    note: 'Licor crema de pistacho.',
    image: '/images/pared-pistache.jpg',
  },
] as const
