import { createEffect, createEvent } from "effector";
import { removeToken, setToken } from "../session/events";
import { LogoutForm } from "./types";

export const setSavePhone = createEvent<boolean>();
export const onSetSavePhone = setSavePhone.prepend((e: CustomEvent) => e.detail.checked);

export const logoutPressed = createEvent();
export const doLogout = createEffect < { $logout: LogoutForm, $login: string}, void, Error>("Effect: logout")
  .use(async ({ $logout, $login }) => {
    if ($logout.savePhone)
      setToken({ login: $login, token: null })
    else
      removeToken()
   })
