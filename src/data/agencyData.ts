import { CaseStudy, ServicePillar, AwardItem, ClientReview } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-kinetics',
    title: 'AURA KINETICS',
    client: 'Aura Spatial Systems (San Francisco)',
    year: '2026',
    category: 'Spatial Web & Hardware Identity',
    award: 'Awwwards Site of the Day / FWA of the Month',
    tagline: 'Una interfaz sensorial 3D para la nueva era de la computación espacial',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    palette: { primary: '#6366f1', secondary: '#06b6d4', bg: '#0b0c16' },
    summary: 'Diseñamos y desarrollamos el ecosistema digital completo para Aura, transformando un producto de hardware complejo en una experiencia web inmersiva que batió récords de preventa mundial.',
    challenge: 'Explicar la tecnología háptica y óptica de próxima generación sin recurrir a textos técnicos densos ni renders estáticos tradicionales.',
    solution: 'Construimos una arquitectura de scroll interactivo con cinemática 3D por capas, donde cada movimiento del usuario manipula la luz, la topología del dispositivo y revela micro-detalles con aceleración de 60 FPS.',
    metrics: [
      { label: 'Conversión Preventa', value: '+380%', detail: 'superando objetivos de venture capital' },
      { label: 'Tiempo Promedio en Sitio', value: '4m 42s', detail: '3.8x por encima del estándar de la industria' },
      { label: 'Tasa de Rebote', value: '18.4%', detail: 'máxima retención en dispositivos móviles y desktop' }
    ],
    deliverables: [
      'Dirección de Arte & 3D Realtime',
      'Diseño UI/UX de Alta Gama',
      'Motor de Animación e Inercia Cinética',
      'Identidad Visual & Tipografía Dinámica'
    ],
    testimonial: {
      quote: 'Metamundo Motion no solo creó nuestro sitio web; crearon el estándar visual con el que nuestra compañía levantó su ronda Serie B de $24M.',
      author: 'Julian Vance',
      role: 'Chief Executive Officer',
      company: 'Aura Spatial Systems'
    }
  },
  {
    id: 'neo-nebula',
    title: 'NEO NEBULA',
    client: 'Nebula Sound & Luxury Couture (Paris / Tokyo)',
    year: '2025',
    category: 'E-Commerce de Lujo & Audio Interactivo',
    award: 'Awwwards Developer Site of the Year Nominee',
    tagline: 'La confluencia entre alta costura, sonido espacial y comercio digital inmersivo',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    palette: { primary: '#ec4899', secondary: '#8b5cf6', bg: '#100a18' },
    summary: 'Creamos una experiencia de compra multisensorial donde cada prenda y auricular de edición limitada responde con sonido envolvente y visualizaciones reactivas a la interacción del cliente.',
    challenge: 'Elevar el valor percibido de una colección cápsula de $3,500 USD por pieza eliminando la fricción tradicional del e-commerce estándar.',
    solution: 'Implementamos un visualizador de producto con física de telas en tiempo real, transiciones de pantalla sin parpadeos y pasarela de pago ultra fluida con tokenización de exclusividad.',
    metrics: [
      { label: 'Venta de Colección', value: '48 Minutos', detail: 'Sold-out completo de 5,000 unidades' },
      { label: 'Valor Promedio Pedido', value: '$2,450', detail: '+120% vs tiendas convencionales' },
      { label: 'Menciones Globales', value: '+1.2M', detail: 'Impacto orgánico en redes y prensa de moda' }
    ],
    deliverables: [
      'E-Commerce Interactivo de Lujo',
      'Audio Design Reactivo por Interacción',
      'Configurador 3D de Materiales',
      'Optimización de Rendimiento en Checkout'
    ],
    testimonial: {
      quote: 'Trabajar con Metamundo Motion fue la mejor decisión estratégica de nuestra marca. Su nivel de pulido visual y obsesión por el detalle no tiene competencia en el mundo.',
      author: 'Éléonore Moreau',
      role: 'Creative Director',
      company: 'Nebula Paris'
    }
  },
  {
    id: 'chrono-vault',
    title: 'CHRONO VAULT',
    client: 'Manufacture Horlogère Genevoise (Geneva)',
    year: '2025',
    category: 'Haute Horlogerie & 3D Configurator',
    award: 'Red Dot Best of the Best & FWA of the Day',
    tagline: 'Ingeniería suiza de precisión inmortalizada en una catedral digital interactiva',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547996160-71dfa63582d8?q=80&w=1200&auto=format&fit=crop',
    palette: { primary: '#f59e0b', secondary: '#06b6d4', bg: '#0d0d12' },
    summary: 'Desarrollamos el archivo digital y configurador exclusivo para una de las casas relojeras más prestigiosas de Suiza, permitiendo a coleccionistas vip explorar calibres con cientos de engranajes animados a escala microscópica.',
    challenge: 'Renderizar ensambles mecánicos con más de 400 piezas móviles en navegadores web móviles sin ralentizaciones ni pérdida de fidelidad fotográfica.',
    solution: 'Construimos un pipeline de renderizado optimizado con iluminación dinámica, raytracing simulado y descomposición anatómica por scroll asistido por inercia.',
    metrics: [
      { label: 'Pedidos Personalizados', value: '+215%', detail: 'consultas de clientes privados de alta gama' },
      { label: 'Frame Rate Promedio', value: '60 FPS', detail: 'estabilidad perfecta en iPhone y MacBooks' },
      { label: 'Premios de Diseño', value: '4 Laureles', detail: 'reconocimiento internacional de la crítica' }
    ],
    deliverables: [
      'Configurador 3D Mecánico Interactivo',
      'Experiencia VIP para Coleccionistas',
      'Micro-narrativa de Micro-ensambles',
      'Arquitectura de Seguridad Privada'
    ],
    testimonial: {
      quote: 'La elegancia con la que Metamundo tradujo la herencia centenaria de nuestros relojeros al formato digital nos dejó absolutamente sin palabras.',
      author: 'Henri de Chamonix',
      role: 'Head of Global Heritage',
      company: 'Genevoise Horlogerie'
    }
  },
  {
    id: 'synthesis-ai',
    title: 'SYNTHESIS NEURAL',
    client: 'Synthesis Intelligence Lab (New York / London)',
    year: '2026',
    category: 'AI Brand Universe & SaaS Platform',
    award: 'Awwwards Site of the Day / Mobile of the Day',
    tagline: 'Visualizando la inteligencia artificial de vanguardia a través de ondas vivas',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    palette: { primary: '#10b981', secondary: '#6366f1', bg: '#080e0f' },
    summary: 'Posicionamos a Synthesis como la plataforma de inteligencia artificial más deseada para creadores, logrando más de 120,000 registros en lista de espera durante su semana de lanzamiento.',
    challenge: 'Diferenciarse de la estética saturada de herramientas AI genéricas para transmitir poder creativo real y sofisticación.',
    solution: 'Creamos una identidad orgánica con campos de partículas cinéticas en tiempo real, tipografía monumental animada y flujos de demostración interactivos sin registro previo.',
    metrics: [
      { label: 'Lista de Espera', value: '128,000+', detail: 'usuarios registrados en 7 días' },
      { label: 'Viralidad en X/Tech', value: '#1 Trend', detail: 'millones de impresiones orgánicas' },
      { label: 'Tasa de Activación', value: '76%', detail: 'conversión a usuarios activos semanales' }
    ],
    deliverables: [
      'Plataforma Web de Lanzamiento Global',
      'Simuladores de Redes Neuronales en Canvas',
      'Sistema de Diseño Tipográfico Dinámico',
      'Estrategia de Crecimiento Viral'
    ],
    testimonial: {
      quote: 'Metamundo Motion es la agencia con mayor gusto visual y potencia técnica del planeta. Su trabajo redefinió la imagen de nuestra empresa en todo Silicon Valley.',
      author: 'Sophia Zhang',
      role: 'VP of Product Experience',
      company: 'Synthesis Neural'
    }
  }
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'spatial-web',
    number: '01',
    title: 'Sitios Web Inmersivos & Experiencias 3D',
    shortDesc: 'Diseño y desarrollo de sitios galardonados que cautivan visitantes y dominan la atención.',
    fullDesc: 'Construimos páginas web de nivel Awwwards y FWA que fusionan arte visual, micro-interacciones cinematográficas, aceleración por hardware a 60 FPS y una narrativa inmersiva que convierte a tu marca en líder indiscutible de su sector.',
    tags: ['Awwwards Standard', 'Scroll Cinemático', 'WebGL & Canvas', 'Física de Fluidos', 'Zero-Lag 60 FPS'],
    deliverables: [
      'Arquitectura de Scroll con Inercia Suave',
      'Modelado y Shaders 3D en Tiempo Real',
      'Narrativa Interactiva Pinned & Horizontal',
      'Optimización de Carga Ultrarrápida (<1.2s)'
    ],
    highlight: 'Retención de usuarios +320% superior a sitios convencionales.',
    bgAccent: 'from-indigo-600/20 to-cyan-500/10'
  },
  {
    id: 'kinetic-identity',
    number: '02',
    title: 'Identidades de Marca Dinámicas & Motion Systems',
    shortDesc: 'Branding que respira, se mueve y evoluciona en todos los puntos de contacto digitales.',
    fullDesc: 'Las marcas estáticas pertenecen al pasado. Diseñamos identidades visuales cinéticas con tipografía variable, isotipos en constante transformación, manuales de marca interactivos y assets de movimiento listos para campañas de alto impacto.',
    tags: ['Kinetic Branding', 'Tipografía Dinámica', 'Design Systems Vivos', '3D Motion Guidelines'],
    deliverables: [
      'Isotipos y Emblemas Vectoriales Animados',
      'Sistemas Tipográficos Reactivos',
      'Design Tokens para Web y Aplicaciones',
      'Kits de Animación para Redes y Eventos'
    ],
    highlight: 'Reconocimiento de marca instantáneo con impacto emocional.',
    bgAccent: 'from-cyan-500/20 to-emerald-500/10'
  },
  {
    id: 'luxury-ecommerce',
    number: '03',
    title: 'E-Commerce de Lujo & Alta Conversión',
    shortDesc: 'Tiendas online sofisticadas que multiplican el valor de ticket promedio y la fidelidad.',
    fullDesc: 'Transformamos la compra online en una experiencia sensorial irresistible. Integramos configuradores de producto 3D, sonido reactivo sutil y transiciones sin fricción diseñadas con psicología de compra para maximizar el ROI de cada campaña.',
    tags: ['High Ticket E-Commerce', 'Configuradores 3D', 'Checkout Sin Fricción', 'Audio Reactivo'],
    deliverables: [
      'Páginas de Producto Interactivas',
      'Visores de 360° con Materiales Reales',
      'Flujos de Pago Optimizados para Conversión',
      'Integración con Plataformas Globales'
    ],
    highlight: 'Aumento comprobado de hasta +140% en valor medio por orden.',
    bgAccent: 'from-purple-600/20 to-pink-500/10'
  },
  {
    id: 'creative-direction',
    number: '04',
    title: 'Dirección de Arte & Estrategia de Lanzamiento',
    shortDesc: 'Posicionamiento visual dominante para marcas que buscan liderar sus industrias.',
    fullDesc: 'Guiamos a fundadores y equipos creativos en el diseño de lanzamientos mundiales memorables. Desde el concepto visual inicial hasta la ejecución de trailers cinemáticos, animaciones de preventa y campañas que marcan tendencia en la cultura digital.',
    tags: ['Lanzamientos Globales', 'Keynotes Cinemáticas', 'Showreels de Producto', 'Estrategia Viral'],
    deliverables: [
      'Storyboards y Conceptos de Alto Impacto',
      'Producción de Teasers y Video Showreels',
      'Dirección Creativa Integral de Campaña',
      'Acompañamiento VIP en el Lanzamiento'
    ],
    highlight: 'Campañas con millones de visualizaciones orgánicas.',
    bgAccent: 'from-amber-500/20 to-orange-500/10'
  }
];

export const AWARDS_LIST: AwardItem[] = [
  { year: '2026', title: 'Site of the Day', category: 'Spatial & 3D Interactive', institution: 'Awwwards', project: 'Aura Kinetics' },
  { year: '2026', title: 'FWA of the Month', category: 'Best Digital Experience', institution: 'FWA', project: 'Aura Kinetics' },
  { year: '2025', title: 'Site of the Day', category: 'Luxury E-Commerce', institution: 'Awwwards', project: 'Neo Nebula' },
  { year: '2025', title: 'Best of the Best', category: 'Product Interface Design', institution: 'Red Dot Award', project: 'Chrono Vault' },
  { year: '2025', title: 'Developer Award', category: '60 FPS Motion Performance', institution: 'Awwwards', project: 'Chrono Vault' },
  { year: '2025', title: 'FWA of the Day', category: 'Cutting Edge Web Tech', institution: 'FWA', project: 'Chrono Vault' },
  { year: '2024', title: 'Site of the Day', category: 'Artificial Intelligence UI', institution: 'Awwwards', project: 'Synthesis Neural' },
  { year: '2024', title: 'Agency of the Year (Nominee)', category: 'Interactive Motion Design', institution: 'Awwwards', project: 'Studio Portfolio' }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    quote: 'Metamundo Motion llevó nuestra visión a un nivel que ni siquiera imaginábamos posible. Nuestro sitio web es el arma comercial más potente que tenemos.',
    author: 'Julian Vance',
    role: 'CEO & Founder',
    company: 'Aura Spatial Systems',
    project: 'Aura Kinetics',
    impact: 'Ronda de inversión Serie B de $24M',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 'rev-2',
    quote: 'El nivel de obsesión visual, fluidez y elegancia que entregan no tiene comparación. Agotamos nuestra colección de lujo en menos de una hora.',
    author: 'Éléonore Moreau',
    role: 'Creative Director',
    company: 'Nebula Luxury Paris',
    project: 'Neo Nebula',
    impact: 'Sold-out en 48 minutos ($12M facturados)',
    avatarBg: 'bg-pink-600'
  },
  {
    id: 'rev-3',
    quote: 'Trabajar con ellos fue una experiencia transformadora. Combinan el mejor gusto estético del mundo con una ejecución técnica impecable.',
    author: 'Sophia Zhang',
    role: 'VP of Product Experience',
    company: 'Synthesis Neural',
    project: 'Synthesis AI',
    impact: '+128,000 usuarios en lista de espera',
    avatarBg: 'bg-emerald-600'
  }
];

export const AGENCY_STATS = [
  { value: '18+', label: 'Premios Awwwards & FWA', sub: 'reconocimiento internacional' },
  { value: '$140M+', label: 'Valor Generado para Clientes', sub: 'en ventas y rondas de inversión' },
  { value: '60 FPS', label: 'Rendimiento Sostenido', sub: 'cero tirones en cualquier pantalla' },
  { value: '100%', label: 'Satisfacción y Retención', sub: 'marcas líderes en el mundo' }
];
