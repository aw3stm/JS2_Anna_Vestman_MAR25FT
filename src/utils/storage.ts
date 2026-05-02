export function save(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 *
 * @param {string} key - Name of key to retrieve from storage.
 * @returns {any | null} - Parsed data. Null if key doesn't exist or parsing failed.
 */

export function load(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function removeData(key: string) {
  localStorage.removeItem(key);
}
