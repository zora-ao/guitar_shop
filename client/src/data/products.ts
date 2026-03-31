export interface Product {
  id: number;
  name: string;
  price: string;
  priceNumber: number; // Added for sorting logic
  image: string;
  category: 'Acoustic' | 'Electric' | 'Acoustic-Electric';
  isBestSeller?: boolean;
}

export const Products: Product[] = [
  { id: 1, name: "Epiphone DR-100", price: "$3,200.00", priceNumber: 3200, category: "Acoustic", image: "..." },
  { id: 2, name: "Squier Stratocaster", price: "$4,100.00", priceNumber: 4100, category: "Electric", image: "..." },
  { id: 3, name: "Yamaha Pacifica 112V", price: "$6,200.00", priceNumber: 6200, category: "Electric", image: "..." },
  // Duplicate or add more to fill the 3x3 grid as seen in your design
];
