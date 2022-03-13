import { LoginForm } from "./types";
import { createStore, sample } from "effector";
import { doLogin, passChanged, loginChanged, loginPressed, doRegister, doRefresh } from "./events";


export const $login = createStore<LoginForm>({ message: 'Enter login and password' })
  .on(passChanged, (state: LoginForm, payload: any) => ({
    ...state,
    ...payload
  }))
  .on(loginChanged, (state: LoginForm, payload: any) => ({
    ...state,
    ...payload
  }))
  .on(doLogin.fail, (state, _) => ({
    ...state,
    error: true,
    message: 'Login failed'
  }))
  .on(doLogin.done, (state, _) => ({
    ...state,
    error: false,
    message: 'Login successful'
  }))

sample($login, loginPressed).watch(doLogin)

