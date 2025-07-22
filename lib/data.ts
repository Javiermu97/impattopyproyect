// RUTA: app/lib/data.ts

// --- ESTRUCTURA DE DATOS ---
export type ProductVariant = {
  color: string;
  colorHex: string;
  image: string;
};

export type ProductFeature = {
  title: string;
  description: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  dateAdded: Date;
  imageUrl: string;
  imageUrl2: string;
  galleryImages: string[];
  variants: ProductVariant[];
  description: string;
  promoSubtitle: string;
  features: ProductFeature[];
  videoUrl?: string;
};


// --- BASE DE DATOS SIMULADA ---
export const allProducts: Product[] = [
  {
    id: 1,
    name: 'REMOVE LINT™ - Quita Pelusas Eléctrico Recargable',
    price: 129000,
    oldPrice: 199000,
    inStock: true,
    dateAdded: new Date('2025-07-21'),
    imageUrl: '/pdp/lint-remover-main.png',
    imageUrl2: '/pdp/lint-remover-blue.png',
    galleryImages: ['/pdp/lint-remover-main.png', '/pdp/lint-remover-2.png'],
    variants: [
      { color: 'Rosa', colorHex: '#FFC0CB', image: '/pdp/lint-remover-main.png' },
      { color: 'Celeste', colorHex: '#ADD8E6', image: '/pdp/lint-remover-blue.png' },
    ],
    description: "Con un sólo gesto, nuestro saca pelusas eléctrico remueve las pelusas más rebeldes de tu ropa, muebles y más. Es recargable vía USB y sus cuchillas depositan los residuos en un contenedor interno para que no se esparzan.",
    promoSubtitle: "¡¡RENUEVA TODAS SUS PRENDAS ANTIGUAS AL INSTANTE!!",
    videoUrl: '/videos/quita-pelusas.mp4',
    features: [
      {
        title: "¡¡ESTE PRÁCTICO SACA PELUSA!!",
        description: "Es un dispositivo portátil diseñado para eliminar pelusas, pelos y motas de polvo de la ropa y otros tejidos, devolviéndoles su aspecto original.",
        image: "/pdp/feature-1.png"
      },
      {
        title: "DILE ADIÓS A LAS ODIOSAS PELUSAS",
    // Esta estructura con saltos de línea asegura que cada ítem esté en una nueva línea.
    description: `✅Mayor eficiencia: El rodillo giratorio motorizado recoge las pelusas de manera más profunda y rápida que los modelos manuales.
✅Portabilidad: Su tamaño compacto y funcionamiento a pilas permiten utilizarlo en cualquier lugar sin necesidad de estar cerca de una toma de corriente.
✅Hojas de corte: Algunos modelos incluyen hojas de corte que ayudan a eliminar las bolitas de tejido y las fibras deshilachadas.
✅Fácil limpieza: El contenedor de pelusas se extrae fácilmente para vaciarlo.`,
    image: "/pdp/feature-2.png"
      },
      // --- BLOQUE AÑADIDO ---
      
  {
    title: "CONSEJOS DE UTILIZACIÓN ❤️",
    // Esta estructura con saltos de línea asegura que cada ítem esté en una nueva línea.
    description: `✅Utiliza el quita pelusas regularmente: Para mantener tus prendas siempre impecables, es recomendable utilizarlo de forma periódica.
✅Lee las instrucciones: Cada quita pelusas tiene sus propias instrucciones de uso.
✅Prueba en un área pequeña: Antes de utilizarlo en toda la prenda, prueba en un área pequeña para asegurarte de que no dañe la tela.
✅Limpia el rodillo regularmente: Un rodillo limpio será más efectivo para eliminar las pelusas.`,
    image: "/pdp/feature-3.png"
  }
]
  },
  {
    id: 2,
    name: 'Cinta Mágica Doble Cara Transparente',
    price: 109000,
    oldPrice: 159000,
    inStock: true,
    dateAdded: new Date('2025-07-20'),
    imageUrl: '/pdp/tape-1.png',
    imageUrl2: '/pdp/tape-2.png',
    galleryImages: ['/pdp/tape-1.png', '/pdp/tape-2.png'],
    variants: [
      { color: 'Transparente', colorHex: '#FFFFFF', image: '/pdp/tape-1.png' },
    ],
    description: "Cinta de doble cara, lavable y reutilizable. Fuerte adherencia y alta resistencia para pegar lo que necesites sin dejar residuos.",
    promoSubtitle: "¡¡PEGA, DESPEGA Y REUTILIZA SIN LÍMITES!!",
    features: [
      {
        title: "SÚPER RESISTENTE Y VERSÁTIL",
        description: "Ideal para colgar cuadros, organizar herramientas o fijar alfombras. Soporta una gran cantidad de peso y se adhiere a múltiples superficies.",
        image: "/pdp/tape-1.png"
      },
      {
        title: "LAVABLE Y REUTILIZABLE",
        description: "Cuando la cinta se ensucie, simplemente lávala con agua, déjala secar y volverá a tener su máxima adherencia para que la uses una y otra vez.",
        image: "/pdp/tape-2.png"
      }
    ]
  },
  {
    id: 3,
    name: 'Mini Masajeador Eléctrico Portátil',
    price: 99000,
    oldPrice: 149000,
    inStock: false,
    dateAdded: new Date('2025-06-25'),
    imageUrl: '/product3.png',
    imageUrl2: '/product4.png',
    galleryImages: ['/product3.png', '/product4.png'],
    variants: [{ color: 'Blanco', colorHex: '#FFFFFF', image: '/product3.png' }],
    description: "Mini masajeador para aliviar tensiones en cuello, espalda y piernas. Llévalo a donde quieras.",
    promoSubtitle: "¡¡TU SPA PERSONAL EN CUALQUIER LUGAR!!",
    features: [
      {
        title: "ALIVIO INSTANTÁNEO",
        description: "Perfecto para relajar músculos cansados después de un largo día. Sus vibraciones ayudan a reducir el estrés y la tensión muscular.",
        image: "/product3.png"
      },
      {
        title: "COMPACTO Y POTENTE",
        description: "Su diseño ergonómico y tamaño de bolsillo te permite llevarlo en la cartera o mochila para usarlo en la oficina, el gimnasio o de viaje.",
        image: "/product4.png"
      }
    ]
  },
  {
    id: 4,
    name: 'Cargador Solar Portátil de Alta Capacidad',
    price: 199000,
    oldPrice: 399000,
    inStock: true,
    dateAdded: new Date('2025-07-15'),
    imageUrl: '/product4.png',
    imageUrl2: '/product5.png',
    galleryImages: ['/product4.png', '/product5.png'],
    variants: [{ color: 'Negro', colorHex: '#000000', image: '/product4.png' }],
    description: "Cargador solar portátil de alta capacidad, ideal para tus aventuras al aire libre. Nunca te quedes sin batería.",
    promoSubtitle: "¡¡ENERGÍA INFINITA BAJO EL SOL!!",
    features: [
      {
        title: "NUNCA TE QUEDES SIN BATERÍA",
        description: "Con su panel solar de alta eficiencia, este cargador te permite recargar tus dispositivos utilizando la energía del sol. Ideal para camping y excursiones.",
        image: "/product4.png"
      },
      {
        title: "GRAN CAPACIDAD Y MÚLTIPLES PUERTOS",
        description: "Su batería interna de alta capacidad puede cargar un teléfono varias veces. Equipado con múltiples puertos USB para cargar varios dispositivos a la vez.",
        image: "/product5.png"
      }
    ]
  },
  {
    id: 5,
    name: 'Organizador de Fregadero de Acero Inoxidable',
    price: 139000,
    oldPrice: 269000,
    inStock: true,
    dateAdded: new Date('2025-07-01'),
    imageUrl: '/product5.png',
    imageUrl2: '/product6.png',
    galleryImages: ['/product5.png', '/product6.png'],
    variants: [{ color: 'Gris', colorHex: '#808080', image: '/product5.png' }],
    description: "Organizador de fregadero para mantener todo en orden. Fabricado en acero inoxidable para mayor durabilidad.",
    promoSubtitle: "¡¡ORDEN Y ELEGANCIA EN TU COCINA!!",
    features: [
      {
        title: "MANTÉN TODO A MANO",
        description: "Espacio designado para esponjas, cepillos, jabón líquido y paños. Permite que todo se seque rápidamente, evitando la acumulación de humedad.",
        image: "/product5.png"
      },
      {
        title: "DISEÑO MODERNO Y DURADERO",
        description: "Fabricado en acero inoxidable de alta calidad, es resistente al óxido y fácil de limpiar, aportando un toque de elegancia a tu fregadero.",
        image: "/product6.png"
      }
    ]
  },
  {
    id: 6,
    name: 'Licuadora Portátil Recargable',
    price: 199000,
    oldPrice: 385000,
    inStock: true,
    dateAdded: new Date('2025-07-18'),
    imageUrl: '/product6.png',
    imageUrl2: '/product7.png',
    galleryImages: ['/product6.png', '/product7.png'],
    variants: [{ color: 'Verde', colorHex: '#008000', image: '/product6.png' }],
    description: "Licuadora portátil para tus batidos en cualquier lugar. Recargable y fácil de limpiar.",
    promoSubtitle: "¡¡BATIDOS FRESCOS DONDE QUIERAS!!",
    features: [
        {
            title: "POTENCIA Y PORTABILIDAD",
            description: "Prepara tus batidos, jugos y smoothies favoritos en segundos, estés donde estés. Su potente motor y batería recargable lo hacen perfecto para el gimnasio o la oficina.",
            image: "/product6.png"
        },
        {
            title: "FÁCIL DE USAR Y LIMPIAR",
            description: "Simplemente añade tus ingredientes, presiona un botón y listo. La limpieza es igual de sencilla: un poco de agua, jabón y una rápida activación del motor.",
            image: "/product7.png"
        }
    ]
  },
  {
    id: 7,
    name: 'Alfombra de Baño Súper Absorbente',
    price: 129000,
    oldPrice: 199000,
    inStock: false,
    dateAdded: new Date('2025-06-15'),
    imageUrl: '/product7.png',
    imageUrl2: '/product8.png',
    galleryImages: ['/product7.png', '/product8.png'],
    variants: [{ color: 'Azul', colorHex: '#0000FF', image: '/product7.png' }],
    description: "Alfombra de baño super absorbente de secado rápido. Antideslizante y suave al tacto.",
    promoSubtitle: "¡¡PISA SECO Y SEGURO AL SALIR DE LA DUCHA!!",
    features: [
        {
            title: "ABSORCIÓN INSTANTÁNEA",
            description: "Fabricada con materiales de última tecnología que absorben el agua en segundos, manteniendo el piso de tu baño siempre seco y seguro.",
            image: "/product7.png"
        },
        {
            title: "BASE ANTIDESLIZANTE",
            description: "Su base de goma se adhiere firmemente al suelo, evitando resbalones y accidentes. Es segura para toda la familia.",
            image: "/product8.png"
        }
    ]
  },
  {
    id: 8,
    name: 'Solución de Almacenamiento Plegable',
    price: 150000,
    oldPrice: 300000,
    inStock: true,
    dateAdded: new Date('2025-07-05'),
    imageUrl: '/product8.png',
    imageUrl2: '/product1.png',
    galleryImages: ['/product8.png', '/product1.png'],
    variants: [{ color: 'Beige', colorHex: '#F5F5DC', image: '/product8.png' }],
    description: "Solución de almacenamiento versátil y plegable para tu hogar. Ahorra espacio con estilo.",
    promoSubtitle: "¡¡ORGANIZA TU ESPACIO CON INTELIGENCIA!!",
    features: [
        {
            title: "AHORRA ESPACIO",
            description: "Estas cajas de almacenamiento son perfectas para guardar ropa, juguetes o documentos. Cuando no las necesites, simplemente pliégalas y guárdalas.",
            image: "/product8.png"
        },
        {
            title: "DISEÑO ELEGANTE",
            description: "Su acabado en tela de alta calidad y colores neutros se adapta a cualquier decoración. Son funcionales y decorativas al mismo tiempo.",
            image: "/product1.png"
        }
    ]
  },
];