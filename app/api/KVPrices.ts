import { z } from 'zod';
import { priceTransform, zParsePrice } from './types/Price.zod';
import { KVDB } from "./KVDB"



export class KVPrices {
    private kvdb: KVDB


    constructor() {
        this.kvdb = new KVDB({kv: db, namespace: 'Price'})
    }

    async set(data: z.infer<typeof priceTransform>) {  
        const pr = zParsePrice(data)
        if (pr._success)
            return {success: true, name: await pr.save()}
        else
            return {success: false, error: pr._error}
    }

    async list() {
        return await this.kvdb.list('', '')
    }
    async get(name: string) {
        return await this.kvdb.getAddr(name)
    }
    async compile() {
        const list = await this.list()
    
        return list
    }

    async getFull() {
        return await this.kvdb.get('FullPriceList', '')
    }

}