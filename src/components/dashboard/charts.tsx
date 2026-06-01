"use client";

import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const GOLD = "#c8a658";
const EMERALD = "#135641";
const CLAY = "#b8744a";
const INK = "#14110e";
const PIE_COLORS = [EMERALD, GOLD, CLAY, "#1f7a5c", "#a07f33"];

const axis = { stroke: "#14110e40", fontSize: 12 };
const tooltipStyle = { borderRadius: 12, border: "1px solid #e9dcc2", background: "#fff", fontSize: 12 };

export function RevenueChart({ data }: { data: { name: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
            <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#14110e10" vertical={false} />
        <XAxis dataKey="name" {...axis} tickLine={false} axisLine={false} />
        <YAxis {...axis} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2.5} fill="url(#rev)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OrdersBarChart({ data }: { data: { name: string; orders: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#14110e10" vertical={false} />
        <XAxis dataKey="name" {...axis} tickLine={false} axisLine={false} />
        <YAxis {...axis} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#14110e08" }} />
        <Bar dataKey="orders" fill={EMERALD} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PopularDishesChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
          {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RetentionLineChart({ data }: { data: { name: string; rate: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#14110e10" vertical={false} />
        <XAxis dataKey="name" {...axis} tickLine={false} axisLine={false} />
        <YAxis {...axis} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="rate" stroke={CLAY} strokeWidth={2.5} dot={{ r: 3, fill: CLAY }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MiniLegend({ items }: { items: { name: string; value: number }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-ink/70">
            <span className="h-3 w-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
            {it.name}
          </span>
          <span className="font-medium text-ink">{it.value}%</span>
        </li>
      ))}
    </ul>
  );
}
