// // pages/products/page.tsx
// import ClientProductTable from '@/components/product-table';
// import Search from '@/components/search';
// import Pagination from '@/components/pagination';
// import { CreateButton } from '@/components/buttons';
// import { getProductsPages } from '@/lib/data';
// import { TableSkeleton } from '@/components/skeleton';
// import { Suspense } from "react";
// import OrderButton from '@/components/OrderButton';

// const Home = async ({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) => {
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;

//   const totalPages = await getProductsPages(query);

//   const handleOrderClick = () => {
//     if (typeof window !== 'undefined') {
//       const selectedProducts = document.querySelectorAll('input[name^="quantity-"]');
//       const products = Array.from(selectedProducts).map(input => {
//         const id = input.getAttribute('name')?.split('-')[1] || '';
//         const quantity = parseInt((input as HTMLInputElement).value) || 0;
//         const productRow = input.closest('tr');
//         const nameProduct = productRow?.querySelector('td:nth-child(3)')?.textContent || '';
//         const price = parseInt(productRow?.querySelector('td:nth-child(5)')?.textContent || '0');
//         return { id, nameProduct, quantity, price, total: price * quantity };
//       }).filter(product => product.quantity > 0);

//       localStorage.setItem('selectedProducts', JSON.stringify(products));
//       window.location.href = '/transaction';
//     }
//   };

//   return (
//     <div className="max-w-screen-md mx-auto mt-5 pt-12 pl-24">
//       <div className="flex items-center justify-between gap-1 mb-5">
//         <Search />
//         <CreateButton />
//       </div>
// <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
// <ClientProductTable query={query} currentPage={currentPage} />
//   </Suspense>
//       <div className="flex justify-center mt-10 pl-40">
//         <Pagination totalPages={totalPages} />
//       </div>
//       <hr className="my-10" />
//       <div className="flex justify-between">
//         <div>
//         <h2 className="text-xl">Total: <span id="total-price">0</span></h2>
//         </div>
//         <div>
//         <OrderButton handleOrderClick={handleOrderClick} />
//                 </div>
//         </div>
//     </div>
//   );
// };

// export default Home;

import ProductTable from '@/components/product-table';
import Search from '@/components/search';
import Pagination from '@/components/pagination';
import { CreateButton } from '@/components/buttons';
import { getProductsPages } from '@/lib/data';
import { TableSkeleton } from '@/components/skeleton';
import { Suspense } from 'react';
import OrderButton from '@/components/OrderButton';

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getProductsPages(query);

  return (
    <div className="flex-1 pt-20 ml-10 pl-60 mr-6">
      {' '}
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ProductTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-8">
        <Pagination totalPages={totalPages} />
      </div>
      <hr className="my-8" />
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl">
            Total: <span id="total-price">0</span>
          </h2>
        </div>
        <OrderButton />
      </div>
    </div>
  );
};

export default Home;

// const Home = async ({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) => {
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;

//   const totalPages = await getProductsPages(query);

//   return (
//     <div className="max-w-screen-md mx-auto mt-5 pt-12 pl-24">
//       <div className="flex items-center justify-between gap-1 mb-5">
//         <Search />
//         <CreateButton />
//       </div>
//       <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
//         <ProductTable query={query} currentPage={currentPage} />
//       </Suspense>
//       <div className="flex justify-center mt-10 pl-40">
//         <Pagination totalPages={totalPages} />
//       </div>
//       <hr className="my-10" />
//       <div className="flex justify-between">
//         <div>
//           <h2 className="text-xl">
//             Total: <span id="total-price">0</span>
//           </h2>
//         </div>
//         <OrderButton />
//       </div>
//     </div>
//   );
// };

// export default Home;
