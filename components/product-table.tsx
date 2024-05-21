// /components/ProductTable.tsx (Server Component)
import { getProducts } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { EditButton, DeleteButton } from '@/components/buttons';
import ProductQuantityInput from './ProductQuantityInput';

const ProductTable = async ({ query, currentPage }: { query: string; currentPage: number }) => {
  const products = await getProducts(query, currentPage);

  return (
    <table className="w-full table-auto border-collapse">
    <thead className="text-sm text-gray-700 uppercase border-b border-gray-300">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Image</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Deskripsi_Product</th>
          <th className="py-3 px-6">Price</th>
          <th className="py-3 px-6">Stock</th>
          <th className="py-3 px-6">Create_At</th>
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
                <Image src={product.image} alt={product.nameProduct} layout="fill" objectFit="cover" />
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
              <ProductQuantityInput productId={product.id} stock={product.stock} products={products} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;



// import { getProducts } from '@/lib/data';
// import { formatDate } from '@/lib/utils';
// import Image from 'next/image';
// import { EditButton, DeleteButton } from '@/components/buttons';
// const ProductTable = async ({ query, currentPage }: { query: string; currentPage: number }) => {
//   const products = await getProducts(query, currentPage);
//   return (
//     <table className="w-full text-sm text-left text-gray-500">
//       <thead className="text-sm text-gray-700 uppercase bg-gray-50">
//         <tr>
//           <th className="py-3 px-6">#</th>
//           <th className="py-3 px-6">Image</th>
//           <th className="py-3 px-6">Name</th>
//           <th className="py-3 px-6">Deskripsi</th>
//           <th className="py-3 px-6">Price</th>
//           <th className="py-3 px-6">Stock</th>
//           <th className="py-3 px-6">Create At</th>
//           <th className="py-3 px-6 text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product, index) => (
//           <tr key={product.id} className="bg-white border-b">
//             <td className="py-3 px-6">{index + 1}</td>
//             <td className="py-3 px-6">
//               <div style={{ width: '60px', height: '60px', position: 'relative' }}>
//                 <Image src={product.image} alt={product.nameProduct} layout="fill" objectFit="cover" style={{ width: '100%', height: '100%' }} />
//               </div>
//             </td>

//             <td className="py-3 px-6">{product.nameProduct}</td>
//             <td className="py-3 px-6">{product.description}</td>
//             <td className="py-3 px-6">{product.price}</td>
//             <td className="py-3 px-6">{product.stock}</td>
//             <td className="py-3 px-6">{formatDate(product.createAt.toString())}</td>
//             <td className="flex justify-center gap-1 py-3">
//               <EditButton id={product.id} />
//               <DeleteButton id={product.id} />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProductTable;
