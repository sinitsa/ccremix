import { createStore, sample, combine, restore } from "effector";
import { doLogin } from "../login/events";
import { doLogout } from "../logout/events";
import { getToken, setToken, removeToken, setThemeDark, onlineStatus } from "./events";
import { SessionToken, ISession } from "./types";
import { toggleDarkTheme } from "../../lib/theme";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const $onlineStatus = restore<boolean>(onlineStatus, window.navigator.onLine)

export const $login = createStore<string>('')
  .on(getToken.done, (_, { result }) => result?.login)
  .on(doLogin.done, (_, { params }) => params.login)
  .reset(removeToken.done)

doLogin.done.watch(()=>{
  const hapticsImpactLight = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };
  
  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };
  hapticsImpactLight();
  hapticsVibrate();
})
console.log('Haptics feedback')

export const $token = createStore<SessionToken>(null)
  .on(doLogin.done, (_, { result }) => result.data.token)
  .on(getToken.done, (_, { result }) => result?.token)
  .reset(doLogout.done)

export const $isClient = createStore<boolean>(false)
  .on(getToken.done, (_) => true)
  .on(doLogin.done, (_) => true)
  .on(doLogout.done, (_) => false)

export const $themeDark = createStore<boolean|undefined>(false)
  .on(setThemeDark, (_, value: boolean) => value)
  .on(getToken.done, (_, { result }) => result?.themeDark)


$themeDark.watch(toggleDarkTheme)



/* sample(
  combine($phone, $token, (ctn, token) => ({
    ctn: ctn,
    token: token
  })),
  setCustomerPressed,
  (session: ISession, uid: SessionPhone) => ({ ...session, uid: uid })
).watch(getClientInfo);

getClientInfo.done.watch(
  ({ params }) => getClient(params)
);
 */

/* sample(
  combine($phone, $token, (ctn, token) => ({
    ctn: ctn,
    token: token
  })),
  setOriginalCustomer,
  (session: ISession, _) => ({ ...session})
).watch(getCustomersAndStats);

 */