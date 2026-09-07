"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

type GradeData = {
  level: string;
  count: number;
  highlighted?: boolean;
};

const GRADE_DATA: GradeData[] = [
  { level: "Lvl 3", count: 39 },
  { level: "Lvl 4", count: 34 },
  { level: "Lvl 5", count: 22 },
  { level: "Lvl 6", count: 30 },
  { level: "Lvl 7", count: 37 },
  { level: "Lvl 8", count: 29 },
  { level: "Lvl 9", count: 22 },
  { level: "Lvl 10", count: 30, highlighted: true },
  { level: "Lvl 11", count: 25 },
  { level: "Lvl 12", count: 37 },
  { level: "Lvl 13", count: 22 },
  { level: "Lvl 14", count: 30 },
];

export function LevelGradeChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs w-full">
      {/* Title Header */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900">
          Level/Grade <span className="font-normal text-gray-500">Count</span>
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Employee Grade Level</p>
      </div>

      {/* Chart Canvas */}
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={GRADE_DATA}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            barSize={18}
          >
            <defs>
              <linearGradient id="highlightBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="level"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
            />
            <Tooltip
              cursor={{ fill: "rgba(241, 245, 249, 0.4)" }}
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "8px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {GRADE_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlighted ? "url(#highlightBar)" : "#E2E8F0"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}