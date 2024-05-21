import Sidebar from '@/components/sidebar';
import ProductMetrics from '@/components/ProductMetrics';
import StockChart from '@/components/StockChart';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-20 ml-10 pl-60 mr-6">
        <h1 className="mb-6 font-bold text-2xl">DASHBOARD MONITORING</h1>
        <ProductMetrics />
        <StockChart />
      </div>
    </div>
  );
};

export default Dashboard;
