import { useState, useEffect } from 'react';
import { auditUrl } from '../services/api';

const HISTORY_KEY = 'pagepulse_history';

export function useAudit() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save audit history to localStorage', e);
    }
  }, [history]);

  const runAudit = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await auditUrl(url);
      if (response && response.success) {
        setResult(response.data);
        
        // Update history (keep top 5 recent unique URLs)
        setHistory((prevHistory) => {
          const filtered = prevHistory.filter((item) => item.url !== response.data.url);
          return [
            {
              url: response.data.url,
              status: response.data.status,
              responseTime: response.data.responseTime,
              timestamp: new Date().toISOString(),
              data: response.data
            },
            ...filtered
          ].slice(0, 5);
        });
      } else {
        setError(response.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze URL.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const selectHistoryItem = (itemData) => {
    setResult(itemData);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    history,
    runAudit,
    clearHistory,
    selectHistoryItem
  };
}
