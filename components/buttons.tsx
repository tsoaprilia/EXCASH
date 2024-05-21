'use client';

import { IoAddSharp, IoPencil, IoTrashOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { deleteProduct } from '@/lib/actions';
export const CreateButton = () => {
  return (
    <Link
      href="/products/create"
      className="inline-flex items-center space-x-1 text-white bg-black hover-bg-gray-800 px-5 py-[9px] rounded-sm text-sm"
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/products/edit/${id}`} className="rounded-sm border p-1 hover:bg-gray-100">
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={DeleteProductWithId}>
      <button className="rounded-sm border p-1 hover:bg-gray-100">
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  const className = clsx('text-white bg-black hover:bg-gray-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center', {
    'opacity-50 cursor-progress': pending,
  });
  return (
    <button type="submit" className={className} disabled={pending}>
      {label == 'save' ? <span>{pending ? 'saving...' : 'save'}</span> : <span>{pending ? 'update...' : 'Update'}</span>}
    </button>
  );
};
