"use client";

import { useEffect, useState } from "react";

export type AuthMode = "login" | "signup" | null;

let currentMode: AuthMode = null;
const listeners = new Set<(mode: AuthMode) => void>();

export function openAuthModal(mode: "login" | "signup") {
  currentMode = mode;
  listeners.forEach((l) => l(mode));
}

export function closeAuthModal() {
  currentMode = null;
  listeners.forEach((l) => l(null));
}

export function useAuthModalState() {
  const [state, setState] = useState<AuthMode>(currentMode);

  useEffect(() => {
    const handleUpdate = (mode: AuthMode) => setState(mode);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return state;
}
