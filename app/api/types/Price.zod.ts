import { z } from "zod";
import { KVDB } from "../KVDB";
import zodFunc from "../zodFunc";

function getNumHash(input: string) {
    var hash = 0
    for (var i = 0; i < input.length; i++) {
      hash  = ((hash << 5) - hash) + input.charCodeAt(i);
      hash |= 0; // to 32bit integer
    }
    return Math.abs(hash)
}
  
export const priceRowSchema = z.object({
    id: z.string().optional(),
    type: z.string().optional(),
    name: z.string(),
    kind: z.string().optional(),
    where: z.string().optional(),
    date: z.string().optional(),
    bank: z.string().optional(),
    address: z.string().optional(),
    price: z.string(),
    comment: z.string().optional(),
});

export const okvedSchema = z.record(z.string())

export const priceInputSchema = z.object({
    prefix: z.string().nonempty("Prefix is required"),
    type: z.string().nonempty("Type is required"),
    body: z.string().nonempty("Body is required"),
})

export const priceTransform = priceInputSchema.transform((input) => {
    let res: any[] = []
    const rows = input.body.split(/\r?\n/)
    for (let i = 0; i < rows.length; i++) {
        let item: any = {}
        const row = rows[i].split(';')
        item.name = row[0].trim()
        item.id = input.prefix + '-' + String(getNumHash(item.name)).substr(0, 6)
        item.type = input.type
        item.kind = row[1].trim()
        item.where = row[2].trim()
        item.date = row[3].trim()
        item.bank = row[4].trim()
        item.address = row[5].trim()
        item.price = row[6].trim()
        item.comment = row[7].trim()
        res.push(item)
    }
    return {name: input.type + '-' + input.prefix, data: res}
})




export const zParsePrice = zodFunc(priceTransform, {
    async save(price) {
        const kvdb = new KVDB({kv: db, namespace: 'Price'})
        await kvdb.put(price.name, '', JSON.stringify(price.data))
        return price.name
    }
})