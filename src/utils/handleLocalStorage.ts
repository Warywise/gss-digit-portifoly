'use client';

export function getStoredItem<T = unknown>(key: string) {
  if (typeof window !== 'undefined') {
    const storedItems = localStorage.getItem(key);
    if (storedItems !== null) {
      try {
        const items = JSON.parse(storedItems);
        return items as T;
      } catch (error) {
        console.error(error);
      }
    }
  }

  return false;
}

export function setStoredItem(key: string, value: unknown) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.error('LocalStorage is not available in this environment.');
  }
}
