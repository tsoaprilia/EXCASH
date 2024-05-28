// /lib/types.ts
export interface Product {
    id: string;
    nameProduct: string;
    description: string;
    price: number;
    stock: number;
    createAt: Date;
    updateAt: Date;
    image: string;
  }
  
  export interface TransactionDetail {
    id: string;
    product: Product;
    quantity: number;
    price: number; // Assuming each detail has a price
  }
  
  export interface Transaction {
    id: string;
    transactionDetails: TransactionDetail[];
    total: number;
    nominalPayment: number;
    change: number;
    createdAt: Date;
  }
  