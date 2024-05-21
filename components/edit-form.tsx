'use client';
import { updateProduct } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/buttons';
import { Product } from '@prisma/client';

const UpdateForm = ({ product }: { product: Product }) => {
  const UpdateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useFormState(UpdateProductWithId, null);
  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="nameProduct" className="block text-sm font-medium text-gray-900">
            Name Product
          </label>
          <input
            type="text"
            name="nameProduct"
            id="nameProduct"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Product Name"
            defaultValue={product.nameProduct}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm font-medium text-gray-900">
            Image
          </label>
          <input type="file" name="image" id="image" className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-50 hover:file:bg-gray-300 file:cursor-pointer border border-gray-300 w-full"
                      />
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.image}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Description"
            defaultValue={product.description}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-900">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Stock"
            defaultValue={product.stock}
          />
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.stock}</p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="update" />
      </form>
    </div>
  );
};
export default UpdateForm;
