import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Built for Digital Heroes Training Task
        </a>
      </div>
    </footer>
  );
}
