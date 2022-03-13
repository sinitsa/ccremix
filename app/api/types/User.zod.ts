import { z } from "zod";
import { KVDB } from "../KVDB";
import zodFunc from "../zodFunc";
import jwt from '@tsndr/cloudflare-worker-jwt'

export const loginSchema = z.object({
    login: z.string().email(),
    password: z.string(),
});

export const userSchema = z.object({
    uid:  z.string().optional(),
    login: z.string().email(),
    password: z.string().min(6),
    secret: z.string().optional(),
    name: z.string().min(5),
    phone: z.string().min(10),
    comments: z.string().optional(),
    idCard: z.string().optional(),
});

export const messageSchema = z.object({
    login: z.string().email(),
    message: z.string(),
});

export const zParseUser = zodFunc(userSchema, {
    async save(user) {
        user.password =  await hash(user.password)
        user.uid = crypto.randomUUID()
        user.secret = crypto.randomUUID()
        const kvdb = new KVDB({kv: db, namespace: user.login})
        await kvdb.put('User', '', JSON.stringify(user))
        return user
    },
    async unique(user) {
        const kvdb = new KVDB({kv: db, namespace: user.login})
        const u = await kvdb.get('User', '')
        return u ? false : true
    }
})


export const zParseLogin = zodFunc(loginSchema, {
    async login(login) {
        login.password =  await hash(String(login.password))
        const kvdb = new KVDB({kv: db, namespace: login.login})
        const u = await kvdb.get('User', '')
        if (!u)
            return {success: false, message: 'User not found'}
        if (login.token) {
            if (login.token === u.uid)
                return {success: true, user: u}
            else
                return {success: false, message: 'Invalid token'}
        }
        if (login.password === u.password)
            return {success: true, user: u}
        else
            return {success: false, message: 'Invalid password'}
    },
    async token(login) {
        const kvdb = new KVDB({kv: db, namespace: login.login})
        const u = await kvdb.get('User', '')
        return {access: await token(login.login, u.secret, 60*30), refresh: await token(login.login, u.secret, 60*60*24)}
    },
    async check(login) {
        const kvdb = new KVDB({kv: db, namespace: login.login})
        const u = await kvdb.get('User', '')
        if (!u)
            return {success: false, message: 'Cannot find username'}
        const isValid = await jwt.verify(String(login.token), u.secret)
        const data = jwt.decode(String(login.token)) as any
        if (!isValid || (data.login !== login.login) )
            return {success: false, message: 'Incorrect token'}
        return {success: true, data: u}
    }
})


function hex(a: any) {
    var h = ""
    var b = new Uint8Array(a)
    for(var i = 0; i < b.length; i++){
      var hi = b[i].toString(16)
      h += hi.length === 1?"0"+hi:hi
    }
    return h
}

async function hash(password: string) {
    const enc = new TextEncoder().encode(password)
    let hash = await crypto.subtle.digest("SHA-1", enc)
    return hex(hash)
}

async function token(login: string, secret: string, plustime: number) {
    return await jwt.sign({
        login: login,
        nbf: Math.floor(Date.now() / 1000) - 1,
        exp: Math.floor(Date.now() / 1000) + plustime
    }, secret)
}