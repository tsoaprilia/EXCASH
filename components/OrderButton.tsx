// /components/OrderButton.tsx
'use client';

import { useRouter } from 'next/navigation';

const OrderButton = () => {
  const router = useRouter();

  const handleOrderClick = () => {
    const selectedProducts = Array.from(document.querySelectorAll('input[name^="quantity-"]')).map(input => {
      const id = input.getAttribute('name')?.split('-')[1] || '';
      const quantity = parseInt((input as HTMLInputElement).value) || 0;
      const productRow = input.closest('tr');
      const nameProduct = productRow?.querySelector('td:nth-child(3)')?.textContent || '';
      const price = parseInt(productRow?.querySelector('td:nth-child(5)')?.textContent || '0');
      return { id, nameProduct, quantity, price, total: price * quantity };
    }).filter(product => product.quantity > 0);

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    router.push('/transaction');
  };

  return (
    <button className="bg-black text-white px-4 pl-8 pr-8 py-2 rounded-sm" onClick={handleOrderClick}>
       Pesan
    </button>
  );
};

export default OrderButton;
