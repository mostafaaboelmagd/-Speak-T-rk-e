'use client';
import { ArrowUpRight } from 'lucide-react';

export default function StatsCard({ title, value, change, icon: Icon, color }) {
  return (
    <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] text-teal-400 flex items-center gap-1">
          {change}
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-black text-[var(--text-color)]">{value}</h3>
      </div>
    </div>
  );
}