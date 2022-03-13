import { createEvent, createStore } from 'effector';

export const setError = createEvent<string|null>('Set global app error');

export const clearError = setError.prepend(() => null);

export const $error = createStore<string | null>(null)
  .on(setError, (state, text) => text);