import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Triggers web page audit.
 * @param {string} url - Target URL to audit
 * @returns {Promise<object>} Audit metrics payload
 */
export const auditUrl = async (url) => {
  try {
    const response = await api.post('/audit', { url });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Failed to connect to audit server'
    };
  }
};

export default api;
