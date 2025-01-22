export function setLocalStorageItem({ key, value }: { key: string; value: string }) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export function getLocalStorageItem({ key }: { key: string }) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
}
