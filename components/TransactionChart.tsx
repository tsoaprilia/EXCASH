'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getTransactionMetrics } from '../lib/data';

const TransactionChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { transactions } = await getTransactionMetrics();
        setTransactionData(transactions);
      } catch (error) {
        setError("Failed to fetch transaction metrics. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="bg-red-100 p-5 rounded-md shadow-md">{error}</div>;
  }

  return (
    <div className="bg-white p-5 rounded-md border border-gray-300">
      <h2 className="text-xl font-bold mb-5">Transaction Chart</h2>
      <LineChart width={480} height={250} data={transactionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#1E3A8A" />
      </LineChart>
    </div>
  );
};

export default TransactionChart;
