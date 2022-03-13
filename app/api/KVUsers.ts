import { zParseUser, zParseLogin, loginSchema, userSchema } from './types/User.zod';
import { KVDB } from "./KVDB"
import { z } from "zod";

export class KVUsers {

    async register(data: z.infer<typeof userSchema>) {
        const user = zParseUser(data)
        if (!user._success)
            return {success: false, error: user._error}
        if (!await user.unique())
            return {success: false, message: 'This username already exists', data: user._data}
        return {success: true, data: await user.save()}
     }

    async login(data: z.infer<typeof loginSchema>) {
        const login = zParseLogin(data)
        if (!login._success)
            return {success: false, error: login._error}        
        const log = await login.login()
        if (log.success)
            return {...log, tokens: await login.token()}
        return log
    }


    async refresh(data: z.infer<typeof loginSchema>) {
        const login = zParseLogin(data)
        const log = await login.check()
        if (log.success)
            return {...log, tokens: await login.token()}
        return log
    }

    async checkAccess(data: z.infer<typeof loginSchema>) {
        const login = zParseLogin(data)
        return await login.check()
    }

    async getUsers() {
        const kvdb = new KVDB({kv: db})
        return await kvdb.list('User', '')
    }

    getName(name: string, prefix: string) {
        const kvdb = new KVDB({kv: db})
        return kvdb.name(name, prefix)
    }
}