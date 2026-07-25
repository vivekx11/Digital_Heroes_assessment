import React, { useState } from 'react';
import { Copy, Check, Download, Code } from 'lucide-react';

export function ExportActions({ data }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const jsonString = JSON.stringify({ success: true, data }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const sanitizedDomain = (data.url || 'report')
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]/gi, '_');
    a.download = `page_pulse_audit_${sanitizedDomain}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
        <Code className="w-4 h-4 text-blue-500" />
        <span>Export Audit Report</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy JSON</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download JSON</span>
        </button>
      </div>
    </div>
  );
}
