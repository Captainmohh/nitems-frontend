"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const stationData = [
  { station: "SS", count: 280, color: "#2563EB" },
  { station: "SW", count: 420, color: "#F59E0B" },
  { station: "SE", count: 180, color: "#10B981" },
  { station: "NW", count: 430, color: "#EA580C" },
  { station: "NE", count: 180, color: "#7C3AED" },
  { station: "HQ", count: 480, color: "#0F172A" },
];

const legendItems = [
  { label: "South South", color: "#10B981" },
  { label: "South West", color: "#2563EB" },
  { label: "South East", color: "#F59E0B" },
  { label: "North west", color: "#EA580C" },
  { label: "North East", color: "#7C3AED" },
  { label: "NITDA Headquarter", color: "#0F172A" },
];

export function OfficeStationChart() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
        Office Station
      </h2>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stationData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="station"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "6px",
                border: "none",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={20}>
              {stationData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}