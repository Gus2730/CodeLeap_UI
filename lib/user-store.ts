import { useSyncExternalStore } from "react";

let username: string | null = null;
let listeners: (() => void)[] = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function setUsername(newUsername: string) {
  username = newUsername;
  emitChange();
}

export function getUsername() {
  return username;
}

export function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function useUsername() {
  return useSyncExternalStore(subscribe, getUsername, () => null);
}
