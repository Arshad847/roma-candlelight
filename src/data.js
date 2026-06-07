export const menuCategories = [
  {
    id: 'antipasti',
    label: 'Antipasti',
    icon: '🫒',
    description: 'Small plates from market mornings and family aperitivo tables.',
    items: [
      {
        id: 'burrata',
        name: 'Burrata di Andria',
        ingredients: 'Puglian burrata, roasted datterini tomatoes, basil oil, grilled sourdough',
        dietary: ['vegetarian'],
        spice: 0,
        wine: 'Frascati Superiore',
        origin: 'Puglia',
        chefNote: 'Served slightly cool so the cream opens slowly over warm toast.',
        price: '18',
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600'
      },
      {
        id: 'carciofi',
        name: 'Carciofi alla Romana',
        ingredients: 'Roman artichokes, mentuccia, garlic confit, lemon zest',
        dietary: ['vegan', 'gluten-free'],
        spice: 0,
        wine: 'Vermentino di Gallura',
        origin: 'Lazio',
        chefNote: 'A springtime classic from our grandmother’s Sunday table.',
        price: '16',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600'
      },
      {
        id: 'polpette',
        name: 'Polpette al Sugo',
        ingredients: 'Veal and pork meatballs, San Marzano gravy, pecorino snowfall',
        dietary: [],
        spice: 1,
        wine: 'Chianti Classico',
        origin: 'Tuscany',
        chefNote: 'Slow-simmered for three hours for a silkier tomato finish.',
        price: '19',
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600'
      }
    ]
  },
  {
    id: 'pasta',
    label: 'Pasta',
    icon: '🍝',
    description: 'Hand-cut ribbons, bronze-die shapes, and sauces built for candlelight.',
    items: [
      {
        id: 'cacio',
        name: 'Tonnarelli Cacio e Pepe',
        ingredients: 'Fresh tonnarelli, pecorino romano DOP, toasted black pepper, butter emulsion',
        dietary: ['vegetarian'],
        spice: 1,
        wine: 'Lugana DOC',
        origin: 'Rome',
        chefNote: 'Pepper is bloomed at the last second to perfume the entire bowl.',
        price: '24',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600'
      },
      {
        id: 'amatriciana',
        name: 'Rigatoni all’Amatriciana',
        ingredients: 'Guanciale, San Marzano tomato, chili, pecorino romano',
        dietary: [],
        spice: 2,
        wine: 'Montepulciano d’Abruzzo',
        origin: 'Amatrice',
        chefNote: 'We render guanciale until the edges turn amber and glassy.',
        price: '26',
        image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600'
      },
      {
        id: 'pesto',
        name: 'Trofie al Pesto Genovese',
        ingredients: 'Trofie, basil from Ligurian seed, pine nuts, Parmigiano Reggiano, green beans',
        dietary: ['vegetarian'],
        spice: 0,
        wine: 'Pigato Riviera Ligure',
        origin: 'Liguria',
        chefNote: 'Pounded in small batches to keep the basil bright instead of bruised.',
        price: '23',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600'
      }
    ]
  },
  {
    id: 'secondi',
    label: 'Secondi',
    icon: '🔥',
    description: 'Wood-fired signatures and rustic main courses from the hearth.',
    items: [
      {
        id: 'branzino',
        name: 'Branzino al Limone',
        ingredients: 'Roasted sea bass, Amalfi lemon, fennel ash, caper leaf salad',
        dietary: ['gluten-free'],
        spice: 0,
        wine: 'Etna Bianco',
        origin: 'Sicily',
        chefNote: 'Finished over olive wood for a whisper of smoke.',
        price: '34',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600'
      },
      {
        id: 'osso',
        name: 'Osso Buco Milanese',
        ingredients: 'Braised veal shank, saffron risotto, gremolata, marrow jus',
        dietary: ['gluten-free'],
        spice: 0,
        wine: 'Barbera d’Asti',
        origin: 'Lombardy',
        chefNote: 'Cooked low and slow until the marrow enriches the sauce naturally.',
        price: '38',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
      },
      {
        id: 'pizza',
        name: 'Pizza alla Diavola',
        ingredients: '48-hour dough, fior di latte, spicy salame, Calabrian chili honey',
        dietary: [],
        spice: 3,
        wine: 'Nero d’Avola',
        origin: 'Campania',
        chefNote: 'The crust blisters in 90 seconds inside our oak-fired dome.',
        price: '22',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'
      }
    ]
  },
  {
    id: 'dolci',
    label: 'Dolci',
    icon: '🍷',
    description: 'Desserts and after-dinner comforts worthy of one more toast.',
    items: [
      {
        id: 'tiramisu',
        name: 'Tiramisù della Casa',
        ingredients: 'Espresso-soaked savoiardi, mascarpone cream, dark cocoa veil',
        dietary: ['vegetarian'],
        spice: 0,
        wine: 'Vin Santo',
        origin: 'Veneto',
        chefNote: 'Set overnight so the coffee and mascarpone melt into one texture.',
        price: '14',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600'
      },
      {
        id: 'panna',
        name: 'Panna Cotta al Marsala',
        ingredients: 'Vanilla bean panna cotta, Marsala fig compote, candied orange',
        dietary: ['gluten-free', 'vegetarian'],
        spice: 0,
        wine: 'Moscato d’Asti',
        origin: 'Piedmont',
        chefNote: 'The custard is barely set for a soft spoonful wobble.',
        price: '13',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600'
      }
    ]
  }
];

export const reservationsSeed = {
  date: 'Tonight',
  times: [
    { id: 't1', time: '5:30 PM', level: 'calm' },
    { id: 't2', time: '6:15 PM', level: 'steady' },
    { id: 't3', time: '7:00 PM', level: 'peak' },
    { id: 't4', time: '7:45 PM', level: 'peak' },
    { id: 't5', time: '8:30 PM', level: 'steady' },
    { id: 't6', time: '9:15 PM', level: 'calm' }
  ],
  tables: [
    { id: 'A1', seats: 2, spot: 'Window alcove', mood: 'Candlelit and quiet' },
    { id: 'B2', seats: 4, spot: 'Olive courtyard', mood: 'Best for family sharing' },
    { id: 'C3', seats: 2, spot: 'Chef counter', mood: 'Watch pasta plating live' },
    { id: 'D4', seats: 6, spot: 'Brick arch booth', mood: 'Celebration ready' },
    { id: 'E5', seats: 4, spot: 'Wine cellar nook', mood: 'Most intimate' }
  ],
  extras: [
    'Birthday cannoli board',
    'Anniversary prosecco chill',
    'Window roses and candle set',
    'Chef tasting supplement'
  ]
};

export const storyCards = [
  {
    id: 'chef',
    eyebrow: 'Chef’s Table',
    title: 'Matteo Bellandi cooks like memory has a flame.',
    text: 'After apprenticeships in Trastevere and Bologna, Chef Matteo returned to his family’s recipes with lighter hands and deeper stockpots. His signature is restraint: fewer ingredients, better sourcing, longer simmering.'
  },
  {
    id: 'heritage',
    eyebrow: 'Family Heritage',
    title: 'Three generations, one red sauce ledger.',
    text: 'The restaurant’s menus borrow from a handwritten notebook begun by Nonna Livia in 1958. Every season adds a few fresh pages, but the soul remains Roman: pepper, pecorino, patience, and generous pours.'
  },
  {
    id: 'imports',
    eyebrow: 'Imported Ingredients',
    title: 'Olive oil, flour, tomatoes, and stories arrive together.',
    text: 'We bring in Sicilian olive oil, bronze-cut semolina, Calabrian chilies, and DOP cheeses from small producers we know by name. Their harvest notes shape how each dish lands on the table.'
  }
];

export const galleryCards = [
  { id: 'g1', title: 'Roman Evenings', stamp: 'Roma Centro', note: 'Lantern glow, open shutters, and a late bottle uncorked.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
  { id: 'g2', title: 'Pasta Morning', stamp: 'Bottega', note: 'Sheets of dough drying before the lunch bell rings.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800' },
  { id: 'g3', title: 'Pizza Fire', stamp: 'Forno', note: 'Oak embers and leopard-spotted crusts in ninety seconds.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
  { id: 'g4', title: 'Cellar Toast', stamp: 'Cantina', note: 'Barolo labels, candle wax, and soft brass jazz.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800' }
];

export const reviews = [
  {
    id: 'r1',
    name: 'Elena Marconi',
    detail: 'Anniversary dinner',
    text: 'The cacio e pepe arrived like silk and pepper perfume. We booked the wine cellar nook and the whole room felt suspended in amber light.',
    rating: 5
  },
  {
    id: 'r2',
    name: 'Victor Hale',
    detail: 'Neighborhood regular',
    text: 'Their reservations flow is incredibly easy, and the chef counter seats make dinner feel like a private performance.',
    rating: 5
  },
  {
    id: 'r3',
    name: 'Priya Sethi',
    detail: 'Family celebration',
    text: 'Peak-time indicators helped us choose a calmer slot for our parents. The osso buco and tiramisù were both unforgettable.',
    rating: 5
  }
];