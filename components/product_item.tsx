import { useState } from 'react';

interface ProductItemProps {
  product: {
    id: string;
    nameProduct: string;
    price: number;
    stock: number;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-item">
      <h3>{product.nameProduct}</h3>
      <p>Price: {product.price}</p>
      <p>Stock: {product.stock}</p>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={() => alert(`Checkout ${quantity} ${product.nameProduct}`)}>Checkout</button>
    </div>
  );
};

export default ProductItem;
