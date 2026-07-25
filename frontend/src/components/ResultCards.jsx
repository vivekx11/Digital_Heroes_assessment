import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Type, 
  FileText, 
  Heading1, 
  ImageOff, 
  FileSpreadsheet, 
  ExternalLink 
} from 'lucide-react';

export function ResultCards({ data }) {
  if (!data) return null;

  const {
    url,
    status,
    responseTime,
    pageTitle,
    metaDescription,
    h1Count,
    missingAltImages,
    wordCount
  } = data;

  const cards = [
    {
      title: 'HTTP Status',
      value: status,
      subtitle: status === 200 ? 'OK - Successfully loaded' : `HTTP Code ${status}`,
      icon: CheckCircle2,
      color: status >= 200 && status < 300 ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50' : 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50'
    },
    {
      title: 'Response Time',
      value: responseTime,
      subtitle: 'Server latency',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50'
    },
    {
      title: 'H1 Count',
      value: h1Count,
      subtitle: h1Count === 1 ? 'Optimal (1 H1 tag)' : h1Count === 0 ? 'Warning: No H1 found' : 'Multiple H1 tags found',
      icon: Heading1,
      color: h1Count === 1 ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50' : 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50'
    },
    {
      title: 'Missing ALT Images',
      value: missingAltImages,
      subtitle: missingAltImages === 0 ? 'All images have ALT text' : `${missingAltImages} image(s) need alt text`,
      icon: ImageOff,
      color: missingAltImages === 0 ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50' : 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50'
    },
    {
      title: 'Word Count',
      value: wordCount.toLocaleString(),
      subtitle: 'Approximate body text words',
      icon: FileSpreadsheet,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-8 space-y-6 animate-fadeIn">
      {/* Audited URL Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Audited URL
          </span>
          <p className="text-base font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">
            {url}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>Visit Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Numerical & Status Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${card.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Page Title & Meta Description Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Page Title Card */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Type className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Page Title
            </h4>
          </div>
          <p className="text-slate-900 dark:text-slate-100 font-medium text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
            {pageTitle || <span className="text-slate-400 italic">No title tag found</span>}
          </p>
        </div>

        {/* Meta Description Card */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Meta Description
            </h4>
          </div>
          <p className="text-slate-900 dark:text-slate-100 font-medium text-sm leading-relaxed bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
            {metaDescription || <span className="text-slate-400 italic">No meta description found</span>}
          </p>
        </div>

      </div>
    </div>
  );
}
