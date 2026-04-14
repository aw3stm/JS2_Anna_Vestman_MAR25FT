export function save(key: string, value: any) {
 localStorage.setItem(key, JSON.stringify(value));
}

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
