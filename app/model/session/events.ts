import { createEffect, createEvent } from "effector";
import { ISession } from "./types";
import { Token } from "../../api/token";


export const setToken = createEffect<ISession, void, Error>().use(Token.set);
export const getToken = createEffect<void, ISession|undefined, Error>().use(Token.get);
export const removeToken = createEffect<void, void, Error>().use(Token.remove)

export const setThemeDark = createEvent<boolean>();
export const onSetThemeDark = setThemeDark.prepend(
  (e: CustomEvent) => e.detail.checked
);

export const onlineStatus = createEvent<boolean>();
export const setOnlineStatus = onlineStatus.prepend(() => window.navigator.onLine)

