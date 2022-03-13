import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export class cStorage {
  public static set = async (key: string, value: any): Promise<void> => {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  public static get = async (key: string): Promise<any> => {
    const item = await Storage.get({ key: key });
    return (item && item.value)
      ? JSON.parse(item.value)
      : Promise.reject()
  }

  public static remove = async (key: string): Promise<void> => {
    await Storage.remove({
      key: key
    });
  }
}
