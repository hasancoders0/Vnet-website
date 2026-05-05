"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "May 1", uv: 2000, pv: 1200 },
  { name: "May 5", uv: 4000, pv: 2000 },
  { name: "May 10", uv: 2500, pv: 1500 },
  { name: "May 15", uv: 4500, pv: 2800 },
  { name: "May 20", uv: 3500, pv: 2200 },
  { name: "May 25", uv: 5000, pv: 3000 },
];

export default function OverviewChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Overview</h3>
        <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
          This Month
        </button>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="uv"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="pv"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}