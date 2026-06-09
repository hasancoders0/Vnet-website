"use client";

const orders = [
  {
    name: "John Doe",
    item: "Web Development",
    price: "$299",
    status: "Pending",
    avatar: "JD",
  },
  {
    name: "Sarah Miller",
    item: "Shopify Theme",
    price: "$59",
    status: "Pending",
    avatar: "SM",
  },
  {
    name: "Robert Wilson",
    item: "UI Kit",
    price: "$29",
    status: "Completed",
    avatar: "RW",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">

      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Recent Orders</h3>
        <button className="text-sm text-blue-500">View All</button>
      </div>

      <div className="space-y-4">
        {orders.map((o, i) => (
          <div
            key={i}
            className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition"
          >
            {/* USER */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                {o.avatar}
              </div>

              <div>
                <p className="text-sm font-medium">{o.name}</p>
                <p className="text-xs text-gray-500">{o.item}</p>
              </div>
            </div>

            {/* PRICE */}
            <p className="text-sm font-medium">{o.price}</p>

            {/* STATUS */}
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                o.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}