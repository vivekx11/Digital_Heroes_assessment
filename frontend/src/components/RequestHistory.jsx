import React from 'react';
import { History, Trash2, ArrowUpRight, Clock } from 'lucide-react';

export function RequestHistory({ history, onSelect, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Recent Audit History
          </h3>
        </div>

        <button
          onClick={onClear}
          className="text-xs font-semibold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item.data)}
            className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate flex-1">
                {item.url}
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                HTTP {item.status}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.responseTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
