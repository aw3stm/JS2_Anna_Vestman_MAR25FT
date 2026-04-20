import { load } from '../utils/storage';

const API_BASE_URL = 'https://v2.api.noroff.dev';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const rawToken = localStorage.getItem('token');
  const token = rawToken ? JSON.parse(rawToken) : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': '2ae5d3f9-4510-4997-9507-8e1212c84e46',
    ...(options.headers as Record<string, string>),
  };
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
  return response.json();
}
