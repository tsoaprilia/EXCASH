'use client';
import { useEffect, useState } from "react";
import { getProductMetrics } from "../lib/data";
import { getTransactionMetrics } from "../lib/data";

const ProductMetrics = () => {
  const [metrics, setMetrics] = useState({ totalProducts: 0, totalStock: 0 });
  const [transactionMetrics, setTransactionMetrics] = useState({ totalTransactions: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductMetrics();
        setMetrics(data);

        const transactionData = await getTransactionMetrics();
        setTransactionMetrics(transactionData);
      } catch (error) {
        console.error("Failed to fetch product metrics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-around mb-10 space-x-4">
      <div className="bg-blue-50 p-5 rounded-md border border-blue-200 w-1/2 mt-4">
        <p className="text-xl font-medium text-blue-800">Total Products</p>
        <h1 className="text-2xl font-bold text-blue-800 pt-3">{metrics.totalProducts} products</h1>
      </div>
      <div className="bg-green-50 p-5 rounded-md border border-green-200 w-1/2 mt-4">
        <p className="text-xl font-medium text-green-700">Total Stock</p>
        <h1 className="text-2xl font-bold text-green-900 pt-3">{metrics.totalStock} items</h1>
      </div>
        <div className="bg-yellow-50 p-5 rounded-md border border-yellow-200 w-1/2 mt-4">
        <p className="text-xl font-medium text-yellow-700">Total Transactions</p>
        <h1 className="text-2xl font-bold text-yellow-900 pt-3">{transactionMetrics.totalTransactions}</h1>
      </div>
      <div className="bg-red-50 p-5 rounded-md border border-red-200 w-1/2 mt-4">
        <p className="text-xl font-medium text-red-700">Total Revenue</p>
        <h1 className="text-2xl font-bold text-red-900 pt-3">${transactionMetrics.totalRevenue.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default ProductMetrics;
