// lib/types.ts

export interface Product {
  id: string;
  nameProduct: string;
  description: string;
  price: number;
  stock: number;
  createAt: string; // Since Prisma's DateTime is serialized as string
  updateAt: string; // Since Prisma's DateTime is serialized as string
  image: string;
}

export interface TransactionDetail {
  id: string;
  productId: string;
  transactionId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Transaction {
  id: string;
  total: number;
  nominalPayment: number;
  change: number;
  createdAt: string; // Since Prisma's DateTime is serialized as string
  transactionDetails: TransactionDetail[];
}
