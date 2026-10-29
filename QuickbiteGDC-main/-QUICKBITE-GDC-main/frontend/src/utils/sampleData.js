// Categories available in the QUICKBITE GDC canteen
export const categories = ["All", "Indian", "Snacks", "Pizza", "Burger", "Drinks", "Dessert", "Combo"];

// Fallback food items shown when the backend is unreachable
// These are demo items only — real data comes from the backend API
export const fallbackFoods = [
  {
    _id: "sample-1",
    name: "Samosa",
    category: "Snacks",
    price: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    description: "Classic instant noodles tossed with fresh vegetables and canteen masala."
  },
  {
    _id: "sample-2",
    name: "Pizza",
    category: "Indian",
    price: 90,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    description: "Crispy stuffed paratha with spiced paneer filling. Served with curd and pickle."
  },
  {
    _id: "sample-3",
    name: "Veg Burger",
    category: "Burger",
    price: 45,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description: "Soft bun with crispy veg patty, fresh salad, and tangy sauce."
  },
  {
    _id: "sample-4",
    name: "Cold Coffee",
    category: "Drinks",
    price: 30,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    description: "Chilled blended coffee with ice and milk. Perfect between classes."
  },
  {
    _id: "sample-5",
    name: "Gulab Jamun",
    category: "Dessert",
    price: 25,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    description: "Soft milk-solid balls soaked in rose-flavoured sugar syrup."
  },
  {
    _id: "sample-6",
    name: "Campus Special Thali",
    category: "Combo",
    price: 80,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
    description: "Dal, sabzi, rice, chapati and a sweet — everything you need for lunch."
  }
];

// Not used in production — reviews section removed from redesign
export const reviews = [];
