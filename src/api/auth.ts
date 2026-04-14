import { save } from '../utils/storage';

const API_BASE_URL = 'https://v2.api.noroff.dev';

/**
 * Logs in user by sending POST request to the Noroff API.
 * Successful = Saves the token and profile data to localStorage.
 * @param {string} email - User's email address (must be @stud.noroff.com)
 * @param {string} password - User's password (min 8 characters)
 * @returns {Promise<object>} User's profile data returned from the API
 * @throws {Error} Throws an error if login fails
 */

export async function userLogin(email: string, password: string) {
  const url = `${API_BASE_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Couldn't sign in");
  }
  const result = await response.json();
  const { accessToken, ...profile } = result.data;

  save('token', accessToken);
  save('profile', profile);

  return profile;
}
