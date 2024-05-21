'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { EditButton, DeleteButton } from '@/components/buttons';

const ClientProductTable = ({ query, currentPage }: { query: string; currentPage: number }) => {
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts(query, currentPage);
      setProducts(fetchedProducts);
      updateTotalPrice(fetchedProducts);
    };
    fetchProducts();
  }, [query, currentPage]);

  const handleQuantityChange = (productId: string, value: number) => {
    if (typeof window !== 'undefined') {
      const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '{}');
      storedQuantities[productId] = value;
      localStorage.setItem('quantities', JSON.stringify(storedQuantities));
      updateTotalPrice(products);
    }
  };

  const getQuantity = (productId: string) => {
    if (typeof window !== 'undefined') {
      const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '{}');
      return storedQuantities[productId] || 0;
    }
    return 0;
  };

  const updateTotalPrice = (products: any[]) => {
    if (typeof window !== 'undefined') {
      const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '{}');
      const total = products.reduce((acc, product) => {
        const quantity = storedQuantities[product.id] || 0;
        return acc + product.price * quantity;
      }, 0);
      document.getElementById('total-price')!.textContent = total.toString();
    }
  };

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Image</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Deskripsi</th>
          <th className="py-3 px-6">Price</th>
          <th className="py-3 px-6">Stock</th>
          <th className="py-3 px-6">Create At</th>
          <th className="py-3 px-6 text-center">Actions</th>
          <th className="py-3 px-6">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className="bg-white border-b">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">
              <div style={{ width: '60px', height: '60px', position: 'relative' }}>
                <Image src={product.image} alt={product.nameProduct} layout="fill" objectFit="cover" style={{ width: '100%', height: '100%' }} />
              </div>
            </td>

            <td className="py-3 px-6">{product.nameProduct}</td>
            <td className="py-3 px-6">{product.description}</td>
            <td className="py-3 px-6">{product.price}</td>
            <td className="py-3 px-6">{product.stock}</td>
            <td className="py-3 px-6">{formatDate(product.createAt.toString())}</td>
            <td className="flex justify-center gap-1 py-3">
              <EditButton id={product.id} />
              <DeleteButton id={product.id} />
            </td>
            <td className="py-3 px-6">
              <input
                type="number"
                name={`quantity-${product.id}`}
                id={`quantity-${product.id}`}
                min="1"
                max={product.stock}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={getQuantity(product.id)}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientProductTable;
