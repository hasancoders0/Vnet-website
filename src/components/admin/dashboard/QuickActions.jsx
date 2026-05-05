import { FaPlus, FaBox, FaFileAlt, FaCog } from "react-icons/fa";

const actions = [
  { name: "Add Service", icon: FaPlus },
  { name: "Add Product", icon: FaBox },
  { name: "Write Post", icon: FaFileAlt },
  { name: "Settings", icon: FaCog },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">

      <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((a, i) => {
          const Icon = a.icon;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
            >
              <Icon className="text-blue-500 mb-2" />
              <p className="text-sm text-gray-700">{a.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}