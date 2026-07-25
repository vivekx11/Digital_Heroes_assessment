import React, { useState } from 'react';
import { Search, Loader2, Globe } from 'lucide-react';

export function UrlForm({ onAnalyze, loading }) {
  const [urlInput, setUrlInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = urlInput.trim();

    if (!trimmed) {
      setInputError('Please enter a website URL');
      return;
    }

    let formattedUrl = trimmed;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
      setInputError('');
      onAnalyze(formattedUrl);
    } catch (err) {
      setInputError('Please enter a valid URL (e.g. https://example.com)');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Globe className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              if (inputError) setInputError('');
            }}
            placeholder="Enter web page URL (e.g. https://example.com)"
            disabled={loading}
            className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${
              inputError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
            } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 shadow-sm transition-all duration-200`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </form>

      {inputError && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 pl-1 font-medium animate-shake">
          {inputError}
        </p>
      )}
    </div>
  );
}
