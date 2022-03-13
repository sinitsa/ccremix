import { ApiClient } from "./ApiClient";
import { z } from 'zod';
import { messageSchema } from "./types/User.zod";

export const messagesSchema = z.object({
    id: z.string(),
    date: z.string(),
    from: z.string(),
    text: z.string(),
})

export class MessageApi {
  public static send = async (data: z.infer<typeof messageSchema>) => {
    const api = new ApiClient();
    try {
      const res = await api.sendMessage(data);
      return res
    } catch (error) {
      console.error("MessageApi.send: " + error);
      return error;
    }
  };

  public static get = async (login: string) => {
    const api = new ApiClient();
    try {
      const res = await api.getMessages(login);
      return res as z.infer<typeof messagesSchema>[]
    } catch (error) {
      console.error("PricesApi.get: " + error);
      return error;
    }
  };

}
