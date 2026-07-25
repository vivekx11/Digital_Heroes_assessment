import React from 'react';
import { Activity } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full max-w-3xl mx-auto my-12 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-xl flex flex-col items-center justify-center text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 animate-spin flex items-center justify-center"></div>
        <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400 absolute inset-0 m-auto animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Analyzing Web Page...
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
        Fetching HTML content, measuring response time, parsing title tags, meta tags, heading structures, and images.
      </p>

      {/* Animated Progress Bar */}
      <div className="w-full max-w-md bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden relative">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full animate-progress"></div>
      </div>
    </div>
  );
}
