export const sportsProducts = [
  {
    id: 21,
    title: "Nike Pro Soccer Ball",
    price: 29.99,
    description:
      "Professional grade soccer ball with enhanced durability and perfect aerodynamics. FIFA-approved design ensures consistent flight path and superior touch control.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop",
    inStock: false,
    variants: [
      { id: 1, name: "Size", options: ["Size 3", "Size 4", "Size 5"] },
      { id: 2, name: "Color", options: ["Black/White", "Yellow", "Blue"] },
    ],
  },
  {
    id: 22,
    title: "Basketball Pro Elite",
    price: 49.99,
    description:
      "Indoor/outdoor basketball with superior grip and durability. Official size and weight, perfect for professional play or practice.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800",
    inStock: true,
    variants: [
      { id: 1, name: "Size", options: ["Size 5", "Size 6", "Size 7"] },
      { id: 2, name: "Type", options: ["Indoor", "Outdoor", "Indoor/Outdoor"] },
    ],
  },
  {
    id: 23,
    title: "Yoga Mat Premium",
    price: 35.99,
    description:
      "Extra thick yoga mat with perfect cushioning and non-slip surface. Eco-friendly material with carrying strap included.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    inStock: true,
    variants: [
      { id: 1, name: "Thickness", options: ["4mm", "6mm", "8mm"] },
      { id: 2, name: "Color", options: ["Purple", "Blue", "Black", "Pink"] },
    ],
  },
];
