import jwt from "jsonwebtoken"

export function setLocalStorageItem({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  localStorage.setItem(key, value);
}

export function getLocalStorageItem({ key }: { key: string }) {
  return localStorage.getItem(key);
}
