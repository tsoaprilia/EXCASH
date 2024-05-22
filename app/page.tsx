import Sidebar from "@/components/sidebar";
import Dashboard from "./dashboard1/page";

export default function Home() {
//   return (
// );
return (
  <div className="flex">
    <Sidebar></Sidebar>
    <div className="flex-1">
      <Dashboard/>
    </div>
  </div>
);
}
