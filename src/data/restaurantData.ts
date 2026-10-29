import { MenuItem, Testimonial, RestaurantEvent, GalleryItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'Saffron & Stone Indian Kitchen',
  shortName: 'Saffron & Stone',
  tagline: 'Where Flavour Meets Elegance',
  phone: '+91 98765 43210',
  secondaryPhone: '+91 22 4892 1100',
  email: 'hello@saffronandstone.in',
  contactEmail: 'hello@saffronandstone.in',
  address: 'Saffron & Stone Indian Kitchen, 14/B Heritage Promenade, Colaba Waterfront, Mumbai, Maharashtra 400001, India',
  hours: {
    mon_thu: '11:00 AM – 10:30 PM',
    fri_sun: '10:00 AM – 11:30 PM',
    weekday: '11:00 AM – 10:30 PM',
    weekend: '10:00 AM – 11:30 PM',
    lunch: '11:00 AM – 03:30 PM',
    dinner: '07:00 PM – 10:30 PM',
  },
  company: {
    name: 'Ashivam Technologies',
    logo: '/assets/aistudio/image_fa912bac.png',
    attachmentAsset: '/assets/aistudio/image_fa912bac.png',
    description: 'Smart restaurant operations for menus, reviews, and memorable guest experiences.',
    followText: 'Manage your restaurant menu, showcase your dishes, and collect guest reviews in one place.',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tripadvisor: 'https://tripadvisor.com',
    google: 'https://google.com/maps',
  }
};

// 6 Signature dishes - each with dedicated unique photography
export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Saffron Special Biryani',
    description: 'Aged long-grain basmati infused with Kashmiri royal saffron, tender marinated cuts, caramelised shallots, and fragrant whole spices slow-cooked in a sealed clay handi.',
    price: 795,
    category: 'Biryanis',
    isVegetarian: false,
    isBiryani: true,
    isSignature: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_saffron_biryani_1793203589529.jpg',
    rating: 4.9,
    prepTime: '25 mins',
    tags: ['Royal Heritage', 'Chef Signature', 'Dum Cooked']
  },
  {
    id: 'sig-2',
    name: 'Stone-Grilled Chicken',
    description: 'Free-range chicken steeped in smoked Kashmiri red chili, Greek yogurt and toasted coriander, charred to juicy tenderness over volcanic basalt rock stones.',
    price: 685,
    category: 'Starters',
    isVegetarian: false,
    isStarter: true,
    isSignature: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_stone_grilled_chicken_1793203590142.jpg',
    rating: 4.8,
    prepTime: '20 mins',
    tags: ['Volcanic Rock Charred', 'House Special']
  },
  {
    id: 'sig-3',
    name: 'Creamy Butter Paneer',
    description: 'Velvety slow-simmered vine tomato gravy with house-churned cultured butter, kasuri methi, roasted artisan cottage cheese cubes, and rich malai.',
    price: 595,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    isSignature: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_butter_paneer_1793203631938.jpg',
    rating: 4.9,
    prepTime: '18 mins',
    tags: ['Vegetarian Favorite', 'Rich Cream Gravy']
  },
  {
    id: 'sig-4',
    name: 'Tandoori Platter',
    description: 'An opulent charcoal-grilled degustation featuring rosemary lamb seekh, tandoori prawns, and charred kebabs served with mint dip and pickled shallots.',
    price: 1195,
    category: 'Starters',
    isVegetarian: false,
    isStarter: true,
    isSignature: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_tandoori_platter_1793203632328.jpg',
    rating: 5.0,
    prepTime: '25 mins',
    tags: ['Grand Sharing', 'Charcoal Clay Oven']
  },
  {
    id: 'sig-5',
    name: 'Garlic Butter Prawns',
    description: 'Jumbo coastal Arabian Sea tiger prawns tossed in melted golden butter, roasted garlic crisps, freshly cracked peppercorn, and chopped flat parsley.',
    price: 895,
    category: 'Non-veg items',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_garlic_prawns_1793203633854.jpg',
    rating: 4.9,
    prepTime: '15 mins',
    tags: ['Coastal Catch', 'Garlic Infused']
  },
  {
    id: 'sig-6',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark Valrhona 72% chocolate fondant with a molten core, paired with hand-churned pistachio saffron bean ice cream and edible 24K gold foil.',
    price: 495,
    category: 'Veg items',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 0,
    image: '/src/assets/images/dish_lava_cake_1793203632849.jpg',
    rating: 4.9,
    prepTime: '12 mins',
    tags: ['Warm Molten Center', 'Pastry Chef Pick']
  }
];

// Expanded interactive menu items with Veg Curries, Biryanis, Meals & Thalis, Starters, Drinks
// Each item has a 100% unique photograph!
export const FULL_MENU: MenuItem[] = [
  // --- 1. MEALS & THALIS ---
  {
    id: 'menu-m1',
    name: 'Maharaja Royal Veg Thali',
    description: 'Grand royal feast featuring Paneer Makhani, Dal Saffron & Stone, Subz Korma, Saffron Pulao, Garlic Naan, Laccha Paratha, Burani Raita, and warm Gulab Jamun in copper katoris.',
    price: 895,
    category: 'Meals & Thalis',
    isVegetarian: true,
    isMeal: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_maharaja_thali_1793242388409.jpg',
    rating: 5.0,
    prepTime: '20 mins',
    tags: ['Royal Banquet Meal', 'Multi-Course Thali']
  },

  // --- 2. BIRYANIS ---
  {
    id: 'menu-b1',
    name: 'Royal Hyderabadi Mutton Dum Biryani',
    description: 'Aged fragrant basmati layered with tender spiced goat meat, saffron strands, caramelised onions, fresh mint leaves, and a golden roasted egg.',
    price: 745,
    category: 'Biryanis',
    isVegetarian: false,
    isBiryani: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_hyderabadi_biryani_1793242389009.jpg',
    rating: 4.9,
    prepTime: '25 mins',
    tags: ['Hyderabadi Dum', 'Royal Recipe']
  },
  {
    id: 'menu-b2',
    name: 'Nawabi Kathal Jackfruit Dum Biryani',
    description: 'Marinated tender raw jackfruit cooked Awadhi dum style with saffron basmati rice, caramelized shallots, toasted cashews, and rose water.',
    price: 645,
    category: 'Biryanis',
    isVegetarian: true,
    isBiryani: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_kathal_biryani_1793242391364.jpg',
    rating: 4.8,
    prepTime: '22 mins',
    tags: ['Vegetarian Dum', 'Awadhi Kathal']
  },

  // --- 3. VEG CURRIES ---
  {
    id: 'menu-c1',
    name: 'Methi Malai Matar Velvet Curry',
    description: 'Plump green garden peas simmered in a silky cream gravy enriched with fresh fenugreek leaves, white pepper, and roasted kasuri methi.',
    price: 545,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_methi_malai_matar_1793242389698.jpg',
    rating: 4.9,
    prepTime: '16 mins',
    tags: ['Rich Velvet Cream', 'Mild & Aromatic']
  },
  {
    id: 'menu-c2',
    name: 'Kashmiri Shahi Dum Aloo',
    description: 'Baby potatoes gently pricked and slow-simmered in an authentic Kashmiri dried ginger, fennel, and yogurt red curry reduction.',
    price: 495,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_kashmiri_dum_aloo_1793242390322.jpg',
    rating: 4.8,
    prepTime: '18 mins',
    tags: ['Kashmiri Tradition', 'Slow Simmered']
  },
  {
    id: 'menu-c3',
    name: 'Nawabi Navratan Korma',
    description: 'A nine-gem royal curry featuring garden vegetables, paneer cubes, toasted cashews, golden raisins, and pomegranate pearls in a creamy cashew sauce.',
    price: 565,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    spiceLevel: 0,
    image: '/src/assets/images/dish_navratan_korma_1793242392493.jpg',
    rating: 4.8,
    prepTime: '18 mins',
    tags: ['Nine Gem Curry', 'Cashew Cream']
  },
  {
    id: 'menu-c4',
    name: 'Paneer Tikka Masala Makhani',
    description: 'Tandoor-charred cottage cheese chunks submerged in a velvety, buttery tomato cashew gravy with kasturi methi.',
    price: 585,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_paneer_tikka_masala_1793204958028.jpg',
    rating: 4.9,
    prepTime: '18 mins',
    tags: ['Chef Curated', 'Velvet Gravy']
  },
  {
    id: 'menu-c5',
    name: 'Dal Saffron & Stone (Overnight Dum)',
    description: 'Our signature 24-hour slow-simmered black urad lentils on a charcoal hearth, creamed with cultured white butter.',
    price: 485,
    category: 'Veg Curries',
    isVegetarian: true,
    isCurry: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_dal_makhani_1793204808251.jpg',
    rating: 4.9,
    prepTime: '20 mins',
    tags: ['Overnight Dum', 'Signature Dal']
  },

  // --- 4. NON-VEG CURRIES & MAINS ---
  {
    id: 'menu-nv1',
    name: 'Royal Awadhi Mutton Korma',
    description: 'Tender baby goat cuts braised in an opulent brown onion, toasted almond, and Kashmiri saffron gravy with silver vark.',
    price: 825,
    category: 'Non-veg items',
    isVegetarian: false,
    spiceLevel: 2,
    image: '/src/assets/images/dish_mutton_korma_1793204958845.jpg',
    rating: 5.0,
    prepTime: '24 mins',
    tags: ['Royal Awadh', 'Almond Saffron']
  },
  {
    id: 'menu-nv2',
    name: 'Kashmiri Rogan Josh Lamb Shank',
    description: 'Slow-braised spring lamb shank cooked in an aromatic gravy perfumed with ratanjot, Kashmiri dried fennel, and green cardamom.',
    price: 785,
    category: 'Non-veg items',
    isVegetarian: false,
    spiceLevel: 2,
    image: '/src/assets/images/dish_rogan_josh_1793204794132.jpg',
    rating: 4.9,
    prepTime: '22 mins',
    tags: ['Kashmiri Recipe', 'Lamb Shank']
  },

  // --- 5. STARTERS ---
  {
    id: 'menu-s1',
    name: 'Crispy Dahi Ke Kebab',
    description: 'Cardamom-scented hung yogurt medallions pan-seared with a delicate crust, served with spiced cranberry relish and mint emulsion.',
    price: 465,
    category: 'Starters',
    isVegetarian: true,
    isStarter: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_dahi_kebab_1793204793277.jpg',
    rating: 4.8,
    prepTime: '15 mins',
    tags: ['Melt in Mouth', 'Vegetarian Starter']
  },
  {
    id: 'menu-s2',
    name: 'Amritsari Spiced Fish Tikka',
    description: 'Flaky fresh river sole crusted with roasted ajwain carom seeds and degi mirch, flash-fried and served with lemon rings.',
    price: 645,
    category: 'Starters',
    isVegetarian: false,
    isStarter: true,
    spiceLevel: 2,
    image: '/src/assets/images/dish_amritsari_fish_1793204809538.jpg',
    rating: 4.9,
    prepTime: '18 mins',
    tags: ['River Sole', 'Crisp Ajwain']
  },
  {
    id: 'menu-s3',
    name: 'Charcoal Saffron Paneer Tikka',
    description: 'Handcrafted cottage cheese marinated in yellow mustard and Kashmiri saffron, clay-oven roasted with bell peppers and onions.',
    price: 525,
    category: 'Starters',
    isVegetarian: true,
    isStarter: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_paneer_tikka_1793204824805.jpg',
    rating: 4.7,
    prepTime: '16 mins',
    tags: ['Tandoor Roasted', 'Pure Cottage Cheese']
  },
  {
    id: 'menu-s4',
    name: 'Wok-Tossed Crispy Salt & Pepper Corn',
    description: 'Crisp golden sweet corn and water chestnuts tossed with cracked black pepper, curry leaves, scallions, and chili flakes.',
    price: 425,
    category: 'Starters',
    isVegetarian: true,
    isStarter: true,
    spiceLevel: 1,
    image: '/src/assets/images/dish_crispy_corn_1793204959296.jpg',
    rating: 4.7,
    prepTime: '12 mins',
    tags: ['Golden Crunch', 'Appetizer']
  },

  // --- 6. DRINKS ---
  {
    id: 'menu-d1',
    name: 'Saffron Cardamom Masala Chai',
    description: 'Single-estate Assam black tea brewed with crushed green cardamom, cinnamon, fresh ginger root and pure saffron threads.',
    price: 245,
    category: 'Drinks',
    isVegetarian: true,
    isDrink: true,
    spiceLevel: 0,
    image: '/src/assets/images/drink_saffron_chai_1793204810187.jpg',
    rating: 4.9,
    prepTime: '8 mins',
    tags: ['Single Estate', 'Royal Brew']
  },
  {
    id: 'menu-d2',
    name: 'Smoked Rosemary Old-Fashioned',
    description: 'Artisanal craft cocktail with flamed rosemary aroma, roasted spices, clear crystal ice, and dehydrated blood orange.',
    price: 495,
    category: 'Drinks',
    isVegetarian: true,
    isDrink: true,
    spiceLevel: 0,
    image: '/src/assets/images/drink_smoked_cocktail_1793204809382.jpg',
    rating: 4.8,
    prepTime: '5 mins',
    tags: ['Smoked Libation', 'Mixology']
  },
  {
    id: 'menu-d3',
    name: 'Royal Mango Saffron Kulhad Lassi',
    description: 'Chilled Alphonso mango purée churned with hung yogurt, Mongra saffron, crushed pistachios, and almond slivers.',
    price: 345,
    category: 'Drinks',
    isVegetarian: true,
    isDrink: true,
    spiceLevel: 0,
    image: '/src/assets/images/drink_mango_lassi_1793204960599.jpg',
    rating: 4.9,
    prepTime: '6 mins',
    tags: ['Alphonso Mango', 'Kulhad Served']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Grand Stone Dining Hall',
    category: 'Interior',
    image: '/src/assets/images/gallery_grand_archway_1793242870117.jpg',
    caption: 'Arched volcanic stone vaults bathed in warm ambient candlelight.'
  },
  {
    id: 'gal-2',
    title: 'Terracotta Palace Courtyard',
    category: 'Interior',
    image: '/src/assets/images/gallery_courtyard_fountain_1793242883252.jpg',
    caption: 'Intimate courtyard dining with brass lanterns, water fountain, and hand-carved pillars.'
  },
  {
    id: 'gal-3',
    title: 'Executive Chef Plating Art',
    category: 'Chef',
    image: '/src/assets/images/gallery_chef_garnishing_1793242897422.jpg',
    caption: 'Master culinary craftsmanship and artisanal plating at our open kitchen.'
  },
  {
    id: 'gal-4',
    title: 'Live Clay Tandoor Hearth',
    category: 'Chef',
    image: '/src/assets/images/gallery_clay_tandoor_1793204960998.jpg',
    caption: 'Artisan skewers roasting over glowing natural charcoal embers.'
  },
  {
    id: 'gal-5',
    title: 'Intimate Candlelit Table Setting',
    category: 'Dining',
    image: '/src/assets/images/gallery_table_candles_1793204961528.jpg',
    caption: 'Sophisticated linen tables with polished silver and crystal stemware.'
  },
  {
    id: 'gal-6',
    title: 'Sommelier Wine Enclave',
    category: 'Ambience',
    image: '/src/assets/images/gallery_wine_cellar_1793204823729.jpg',
    caption: 'Curated international vintages in our temperature-controlled cellar.'
  }
];

export const RESTAURANT_EVENTS: RestaurantEvent[] = [
  {
    id: 'evt-1',
    title: 'Sufi & Sitar Live Evenings',
    tagline: 'Classical Acoustic Soirée & Royal Dining',
    dateOrSchedule: 'Every Friday & Saturday Night',
    time: '08:00 PM – 11:00 PM',
    coverPrice: '₹1,499 per guest (Includes 3-Course Dinner)',
    description: 'Immerse your senses in classical Hindustani sitar and soulful Sufi melodies performed live by master musicians, paired with our signature stone-grilled tasting menu under ambient candlelight.',
    highlights: ['Live Classical Sitar Performance', 'Curated 3-Course Tasting Dinner', 'Complimentary Saffron Welcome Drink', 'Priority Chamber Seating'],
    image: '/src/assets/images/event_live_sitar_sufi_1793204791369.jpg',
    statusTag: 'Weekly Signature'
  },
  {
    id: 'evt-2',
    title: 'Sunday Royal Waterfront Brunch',
    tagline: 'Seaside Terrace & Live Hearth Buffet',
    dateOrSchedule: 'Every Sunday',
    time: '12:00 PM – 04:00 PM',
    coverPrice: '₹2,199 per guest (Brunch & Mocktails)',
    description: 'Bask in gentle sea breezes on our private Colaba terrace. Feast on live clay tandoor counters, slow-dum biryani stations, fresh seasonal berries, and bottomless artisanal coolers.',
    highlights: ['Live Charcoal Tandoor Counters', 'Dum Handi Biryani Stations', 'Waterfront Harbor Terrace Seating', 'Live Jazz & World Acoustic Ensemble'],
    image: '/src/assets/images/event_terrace_brunch_1793204792267.jpg',
    statusTag: 'Popular Weekend'
  },
  {
    id: 'evt-3',
    title: "Executive Chef's Grand Degustation",
    tagline: 'Private Cellar 7-Course Gastronomy',
    dateOrSchedule: 'First Thursday of Every Month',
    time: '07:30 PM Onwards',
    coverPrice: '₹3,499 per guest (Limited to 16 Diners)',
    description: 'An intimate 7-course multi-sensory degustation personally introduced and served by our Executive Chef. Explores rare Himalayan spices, 24-hour slow reductions, and master wine pairings in the private cellar.',
    highlights: ['7-Course Bespoke Tasting Menu', 'Guided International Wine Pairings', 'Intimate Private Sommelier Cellar', 'Chef Discussion & Recipe Souvenir'],
    image: '/src/assets/images/event_chef_degustation_1793242853426.jpg',
    statusTag: 'Exclusive Seating'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Aarav Malhotra',
    role: 'Gastronomy Critic, Mumbai Epicure',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'Saffron & Stone sets an extraordinary benchmark for contemporary Indian cuisine. The Saffron Special Biryani is unmatched anywhere in the city — pure royalty in a handi.',
    dishFavored: 'Saffron Special Biryani',
    date: 'October 2026'
  },
  {
    id: 't-2',
    name: 'Dr. Meera Vasudevan',
    role: 'Private Dining Member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'From the warm terracotta stone architecture to the attentive sommeliers, every detail was immaculate. Our anniversary dinner felt truly intimate and regal.',
    dishFavored: 'Stone-Grilled Chicken & Lava Cake',
    date: 'September 2026'
  },
  {
    id: 't-3',
    name: 'Vikramaditya Singhania',
    role: 'Culinary Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'The tandoori platter and garlic butter prawns left our entire family spellbound. The smoke, the spice balance, and the hospitable warmth are world-class.',
    dishFavored: 'Tandoori Platter',
    date: 'August 2026'
  },
  {
    id: 't-4',
    name: 'Sanjana Roy Kapoor',
    role: 'Food & Lifestyle Journalist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    quote: 'A masterclass in flavour balance. The creamy butter paneer melts effortlessly on the tongue, and the restaurant ambience feels straight out of an imperial palace.',
    dishFavored: 'Creamy Butter Paneer',
    date: 'July 2026'
  }
];
