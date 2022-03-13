import { Session } from './../types/session';
import { getUnixTime } from "date-fns";
import { LoginFields } from "../model/login/types";
import { ApiClient } from "./ApiClient";

export class SessionApi {
  public static doLogin = async ({ login, password }: LoginFields) => {
    const api = new ApiClient();
    try {
      const res = await api.login({
        login,
        password,
      });
      if (res.success) return {login, tokens: res.data.tokens} as Session;
      else return Promise.reject();
    } catch (error) {
      console.error("doLogin: " + error);
      return error;
    }
  };

  public static doRegister = async (data: any) => {
    const api = new ApiClient();
    try {
      const res = await api.register(data);
      if (res.success === true) return res.data;
      else return Promise.reject();
    } catch (error) {
      console.error("doRegister: " + error);
      return error;
    }
  };
  
  public static doRefresh = async ({ login, tokens }: Session) => {
    const api = new ApiClient();
    try {
      const res = await api.refresh({
        login: login,
        token: tokens.refresh,
      });
      if (res.success === true) return res.data.tokens;
      else return Promise.reject();
    } catch (error) {
      console.error("doLogin: " + error);
      return error;
    }
  };
}
