const API_BASE_URL = 'https://v2.api.noroff.dev';

/**
 *
 * @param {string} endpoint API endpoint to call
 * @param {RequestInit} [options={}] Optional fetch config (method, headers, body).
 * @returns {Promise<any>} The parsed JSON response data, or empty object if status 204.
 * @throws {Error} Throws error if status is not ok.
 */

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const rawToken = localStorage.getItem('token');
  const token = rawToken ? JSON.parse(rawToken) : null;

  const headers: Record<string, string> = {
    'X-Noroff-API-Key': '2ae5d3f9-4510-4997-9507-8e1212c84e46',
    ...(options.headers as Record<string, string>),
  };

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || 'API error');
  }
  if (response.status === 204) {
    return {};
  }

  return response.json();
}
