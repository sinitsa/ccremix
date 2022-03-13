import { ApiClient } from "./ApiClient";
import { z } from 'zod';
import { priceInputSchema } from './types/Price.zod';

export class PricesApi {
  public static set = async (data: z.infer<typeof priceInputSchema>) => {
    const api = new ApiClient();
    try {
      const res = await api.setPrice(data);
      return res
    } catch (error) {
      console.error("PricesApi.set: " + error);
      return error;
    }
  };
  public static get = async () => {
    const api = new ApiClient();
    try {
      const res = await api.getPrices();
      return res
    } catch (error) {
      console.error("PricesApi.get: " + error);
      return error;
    }
  };
  public static okved = async () => {
    const api = new ApiClient();
    try {
      const res = await api.getOkved();
      return res
    } catch (error) {
      console.error("PricesApi.get: " + error);
      return error;
    }
  };
}
