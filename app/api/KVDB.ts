/* eslint-disable no-unused-vars */
import { KVNamespace } from "@cloudflare/workers-types"


export declare type KVDBOptions = {
    namespace?: string
    ttl?: string | number
    kv?: KVNamespace
}
export declare type KVDBPutOptions = {
    ttl?: string | number
}
export declare type KVPutOptions = {
    expiration?: string | number
    expirationTtl?: string | number
}
export declare type KVGetTypes = "text" | "json" | 'arrayBuffer' | "stream"
export declare type KVDBCacheValue = string | ReadableStream | ArrayBuffer | FormData

export class KVDB {
    public prefix: string = 'lawbiz|'
    public namespace: string = ''
    public ttl: number = 60*60*24
    private kv: KVNamespace

    constructor(options?: KVDBOptions) {
        if (options && options.namespace)
            this.namespace = options.namespace
        if (options && options.ttl)
            this.ttl = Number(options.ttl)
        this.kv = (options && options.kv)
            ? options.kv
            : db
        
    }
    public addr = (entity: string, a: string[] | string): string =>
        this.prefix + entity + '|' + (this.namespace ? this.namespace + '|' : '') + (typeof a === 'string' ? a : Array.from(a).join('|'))

    public name = (name: string, prefix: string[] | string): string => {
        const pr = this.prefix + (typeof prefix === 'string' ? prefix : Array.from(prefix).join('|'))
        const n = name.substring(pr.length+1)
        return n.substring(0, n.length-1)
    }

    public async getAddr(addr: string, type: KVGetTypes = 'json') {
        return await this.kv.get(addr, type as any)
    }
    public async get(entity: string, key: string | string[], type: KVGetTypes = 'json') {
        return await this.getAddr(this.addr(entity, key), type as any)
    }

    public async put(entity: string, key: string | string[], value: KVDBCacheValue) {
        const addr = this.addr(entity, key)
        await this.kv.put(addr, value)
        return addr
    }

    public async putTtl(entity: string, key: string | string[], value: KVDBCacheValue, options?: KVDBPutOptions) {
        const opts: KVPutOptions = {}
        const ttl = options && options.ttl
        opts.expirationTtl = ttl
            ? ttl
            : this.ttl
        const addr = this.addr(entity, key)

        await this.kv.put(addr, value, opts)
        return addr
    }

    public async list(entity: string, prefix?: string | string[], limit?: number, cursor?: string) {
        const addr = this.addr(entity, prefix)
        return await this.kv.list({prefix: addr, limit: limit, cursor: cursor})
    }

    public async delete(entity: string, key: string | string[]) {
        const addr = this.addr(entity, key)
        await this.kv.delete(addr)
        return addr
    }
}

