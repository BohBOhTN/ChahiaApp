import React from 'react';
import { DollarSign, Package, Users, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Sales",
      value: "$24,500",
      icon: DollarSign,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Stock",
      value: "1,234 kg",
      icon: Package,
      change: "-5%",
      changeType: "negative"
    },
    {
      title: "Active Clients",
      value: "48",
      icon: Users,
      change: "+3%",
      changeType: "positive"
    },
    {
      title: "Pending Credits",
      value: "$12,300",
      icon: AlertTriangle,
      change: "-2%",
      changeType: "positive"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.title === "Pending Credits" ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.title === "Pending Credits" ? 'text-yellow-600' : 'text-blue-600'
                }`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last week
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Client {index + 1}</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,200</p>
                  <p className="text-sm text-gray-500">5kg Chicken</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <div>
                    <p className="font-medium">Product {index + 1}</p>
                    <p className="text-sm text-gray-500">5 kg remaining</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}