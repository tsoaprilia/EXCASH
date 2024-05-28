'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getProductMetrics } from '../lib/data';

const StockChart = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductMetrics();
        setProducts(data.products);
      } catch (error) {
        setError("Failed to fetch product metrics. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="bg-red-100 p-5 rounded-md shadow-md">{error}</div>;
  }

  return (
    <div className="bg-white p-5 rounded-md border border-gray-300">
    <h2 className="text-xl font-bold mb-5">Product Stock Chart</h2>
    <BarChart width={480} height={250} data={products}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nameProduct" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="stock" fill="#1E3A8A" />
    </BarChart>
  </div>
  );
};

export default StockChart;
