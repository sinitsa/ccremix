import { createEffect, createEvent } from "effector";
import { FormEvent } from "react";
import { SessionApi } from "../../api/session";
import { setToken } from "../session/events";
import { SessionToken } from "../session/types";
import { LoginFields } from "./types";


export const passChanged = createEvent();
export const loginChanged = createEvent();

export const onPassChanged = passChanged.prepend((e: any) => ({
  password: e.target.value,
}));
export const onLoginChanged = loginChanged.prepend((e: any) => ({
  login: e.target.value
}));

export const loginPressed = createEvent<FormEvent<HTMLFormElement>>();

export const doLogin = createEffect<LoginFields, any, Error>("Effect: login to backend")
  .use(SessionApi.doLogin)
export const doRegister = createEffect<LoginFields, any, Error>("Effect: login to backend")
  .use(SessionApi.doRegister)
export const doRefresh = createEffect<any, any, Error>("Effect: login to backend")
  .use(SessionApi.doRefresh)


  doLogin.done.watch(({params, result}) => {
    console.log(
      'Call with params', params, 
      'resolved with value', result,
      )
  })

doLogin.done.watch(({ params, result }) =>
  Promise.all([setToken({ login: String(params.login), token: result.data.token }), console.log('Set token after login: ' + params.login + '@' + JSON.stringify(result.data.token))])
)

