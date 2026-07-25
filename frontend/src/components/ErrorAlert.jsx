import React from 'react';
import { AlertTriangle, XCircle, Clock, FileWarning, Globe } from 'lucide-react';

export function ErrorAlert({ message }) {
  if (!message) return null;

  let icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
  let title = 'Audit Request Failed';

  if (message.toLowerCase().includes('url')) {
    icon = <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
    title = 'Invalid URL';
  } else if (message.toLowerCase().includes('timed out') || message.toLowerCase().includes('timeout')) {
    icon = <Clock className="w-5 h-5 text-orange-500 shrink-0" />;
    title = 'Request Timed Out';
  } else if (message.toLowerCase().includes('html')) {
    icon = <FileWarning className="w-5 h-5 text-purple-500 shrink-0" />;
    title = 'Non-HTML Content';
  } else if (message.toLowerCase().includes('unavailable')) {
    icon = <Globe className="w-5 h-5 text-rose-500 shrink-0" />;
    title = 'Website Unavailable';
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/40 backdrop-blur-sm text-red-900 dark:text-red-200 shadow-sm flex items-start gap-3 animate-fadeIn">
      {icon}
      <div>
        <h4 className="font-bold text-sm text-red-800 dark:text-red-300">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-red-700 dark:text-red-400 mt-0.5">
          {message}
        </p>
      </div>
    </div>
  );
}
