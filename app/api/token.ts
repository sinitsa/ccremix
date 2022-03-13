import { LOCAL_STORAGE_CAPACITOR, LOCAL_STORAGE_KEY } from "../config/constants";
import { ISession } from "../model/session/types";
import { SessionApi } from "./session";
import { cStorage } from "./storage";

export class Token {
    public static set = async (session: ISession): Promise<void> => {
        console.log('Token Set: ' + JSON.stringify(session))
        if (!session.login)
            return Promise.reject()
        if (LOCAL_STORAGE_CAPACITOR)
            await cStorage.set(LOCAL_STORAGE_KEY, JSON.stringify(session))
        else
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session))
    };
    public static get = async (): Promise<ISession|undefined> => {
        const session = LOCAL_STORAGE_CAPACITOR
            ? await cStorage.get(LOCAL_STORAGE_KEY)
            : localStorage.getItem(LOCAL_STORAGE_KEY)
        if (!session)
            return Promise.reject()

        console.log('Token Get: ' + JSON.stringify(session))
        let $session = JSON.parse(session)
        try {
            const token = await SessionApi.doRefresh({login: $session.login, token: $session.token.refresh})
            console.log('Token iss: ' + JSON.stringify(token))
            $session = { ...$session, token: token }
            Token.set($session)
            return $session
        } catch (error) {
            console.error('Token.get: ' + error);
        }
    };
    public static remove = async () => {
        if (LOCAL_STORAGE_CAPACITOR)
            await cStorage.remove(LOCAL_STORAGE_KEY)
        else
            localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
}