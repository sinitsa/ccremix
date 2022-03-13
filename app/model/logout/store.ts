import { LogoutForm } from "./types";
import { createStore, sample } from "effector";
import { doLogout, setSavePhone, logoutPressed } from "./events";
import { $login  } from "../session/store";


export const $logout = createStore<LogoutForm>({ savePhone: true })
  .on(setSavePhone, (_, value: boolean) => ({
    savePhone: value
  }))

sample({ $logout, $login }, logoutPressed).watch(doLogout)
