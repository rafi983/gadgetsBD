export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  vendor: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: 'Apple MacBook Pro 16" M2 Max',
    image:
      "https://images.unsplash.com/photo-1517336712461-481140081023?w=900",
    price: 345000,
    vendor: "Official Apple Store",
    category: "Laptops",
  },
  {
    id: "p2",
    name: "iPhone 15 Pro Max",
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=900",
    price: 145000,
    vendor: "Apple Bangladesh",
    category: "Phones",
  },
  {
    id: "p3",
    name: "Sony WH-1000XM5 Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    price: 38500,
    vendor: "Sony Official",
    category: "Audio",
  },
  {
    id: "p4",
    name: "Razer BlackWidow V4 Pro",
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=900",
    price: 18500,
    vendor: "Razer Store",
    category: "Accessories",
  },
];

export const categories = [
  "Laptops & PCs",
  "Smartphones",
  "Accessories",
  "Gaming",
  "Audio",
  "Cameras",
];

export const shops = [
  { name: "Apple Store", rating: 4.9, products: 120 },
  { name: "Sony Official", rating: 4.7, products: 88 },
  { name: "Razer Store", rating: 4.6, products: 64 },
];

export const orders = [
  { id: "GB-2026-001234", date: "March 21, 2026", total: 402000, status: "Delivered" },
  { id: "GB-2026-001111", date: "March 14, 2026", total: 18500, status: "Delivered" },
];

export const cartItems = [
  { name: 'Apple MacBook Pro 16" M2 Max', qty: 1, price: 345000 },
  { name: "Sony WH-1000XM5 Headphones", qty: 1, price: 38500 },
  { name: "Razer BlackWidow V4 Pro", qty: 1, price: 18500 },
];

export const sellerItems = [
  { name: 'Apple MacBook Pro 16" M2 Max', stock: 24, price: 345000 },
  { name: "iPhone 15 Pro Max", stock: 38, price: 145000 },
  { name: "Sony WH-1000XM5 Headphones", stock: 66, price: 38500 },
];

export function formatBdt(value: number): string {
  return new Intl.NumberFormat("en-BD").format(value);
}

