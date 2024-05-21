// /components/ProductQuantityInput.tsx (Client Component)
"use client";

import { useState, useEffect } from 'react';

type Product = {
  id: string;
  price: number;
};

const ProductQuantityInput = ({ productId, stock, products }: { productId: string; stock: number; products: Product[] }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '{}');
    setQuantity(storedQuantities[productId] || 0);
  }, [productId]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setQuantity(value);
    const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '{}');
    storedQuantities[productId] = value;
    localStorage.setItem('quantities', JSON.stringify(storedQuantities));
    updateTotalPrice(products);
  };

  const updateTotalPrice = (products: Product[]) => {
    const storedQuantities: { [key: string]: number } = JSON.parse(localStorage.getItem('quantities') || '{}');
    const total = Object.entries(storedQuantities).reduce((acc: number, [key, value]) => {
      const product = products.find(product => product.id === key);
      return acc + (product?.price || 0) * value;
    }, 0);
    document.getElementById('total-price')!.textContent = total.toString();
  };

  return (
    <input
      type="number"
      name={`quantity-${productId}`}
      id={`quantity-${productId}`}
      min="1"
      max={stock}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={quantity}
      onChange={handleQuantityChange}
    />
  );
};

export default ProductQuantityInput;
