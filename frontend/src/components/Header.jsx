import React from 'react';
import { Activity, Sun, Moon } from 'lucide-react';

export function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Page Pulse
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Web Page Technical & SEO Auditor
            </p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform" />
          )}
        </button>
      </div>
    </header>
  );
}
