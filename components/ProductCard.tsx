// components/ProductCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      onQuantityChange(product.id, newQuantity);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity(prev => {
      const newQuantity = prev > 0 ? prev - 1 : 0;
      onQuantityChange(product.id, newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="card">
      <Image src={product.image} alt={product.nameProduct} width={200} height={200} />
      <h2>{product.nameProduct}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <div>
        <button onClick={handleDecrease}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;
