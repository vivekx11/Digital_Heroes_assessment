import React from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useAudit } from './hooks/useAudit';
import { Header } from './components/Header';
import { UrlForm } from './components/UrlForm';
import { LoadingState } from './components/LoadingState';
import { ResultCards } from './components/ResultCards';
import { ExportActions } from './components/ExportActions';
import { RequestHistory } from './components/RequestHistory';
import { ErrorAlert } from './components/ErrorAlert';
import { Footer } from './components/Footer';
import { Zap, ShieldCheck, Gauge } from 'lucide-react';

export default function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    loading,
    result,
    error,
    history,
    runAudit,
    clearHistory,
    selectHistoryItem
  } = useAudit();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Hero Section */}
        {!result && !loading && (
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Instant Web Page Diagnostics</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Audit Any Webpage in Seconds
            </h2>
            
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Analyze HTTP response codes, latency performance, title tags, meta descriptions, image alt tags, and body word counts with precision.
            </p>
          </div>
        )}

        {/* Audit Form Input */}
        <UrlForm onAnalyze={runAudit} loading={loading} />

        {/* Error Alert Display */}
        {error && <ErrorAlert message={error} />}

        {/* Loading Spinner & Progress Bar */}
        {loading && <LoadingState />}

        {/* Audit Metric Result Cards */}
        {result && !loading && (
          <>
            <ExportActions data={result} />
            <ResultCards data={result} />
          </>
        )}

        {/* Recent Audit History */}
        {!loading && history.length > 0 && (
          <RequestHistory
            history={history}
            onSelect={selectHistoryItem}
            onClear={clearHistory}
          />
        )}

        {/* Features Highlights (Shown on initial landing page) */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Response Timing</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Measures server latency and HTTP status codes in real-time.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">SEO Integrity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Parses title tags, meta descriptions, and H1 heading counts.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Accessibility Check</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Identifies missing image alt text and calculates total word count.</p>
            </div>
          </div>
        )}

      </main>

      {/* Required Footer */}
      <Footer />
    </div>
  );
}
