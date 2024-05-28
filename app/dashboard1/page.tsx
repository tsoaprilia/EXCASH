import Sidebar from '@/components/sidebar';
import ProductMetrics from '@/components/ProductMetrics';
import StockChart from '@/components/StockChart';
import React, { useContext } from 'react';
import TransactionChart from '@/components/TransactionChart';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-20 ml-10 pl-60 mr-6">
        <h1 className="mb-3 font-bold text-2xl">DASHBOARD MONITORING</h1>
        <div>
          <ProductMetrics />
        </div>
        <div className="flex space-x-5">
          <div>
            <StockChart />
          </div>
          <div>
            <TransactionChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
