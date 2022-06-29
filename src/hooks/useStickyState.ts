import { useEffect, useState } from "react";

type HookType = <T>(defaultValue: T, key: string) => [T, (value: T) => void];
type DefaultGetter = <T>(defaultValue: T, key: string) => T;

const getDefaultState: DefaultGetter = (defaultValue, key) => {
  const stickyValue = window.localStorage.getItem(key);

  return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
}

/**
 * Bomb ass local storage-connected state function
 */
export const useStickyState: HookType = (defaultValue, key) => {
  const [value, setValue] = useState(() => getDefaultState(defaultValue, key));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
}