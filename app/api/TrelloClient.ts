import Axios, { AxiosInstance } from "axios";

type RequestMethods = 'post' | 'get' | 'delete' | 'put'

export class TrelloClient {
    private _apiUrl: string = 'https://api.trello.com/';
    private _apiVersion: string = '1';
    private _apiKeys = {
    }
    private _log: boolean = true;
    private readonly client: AxiosInstance = Axios;
    constructor(apiKeys?: {key: string, token: string}) {
        if (apiKeys)
            this._apiKeys = apiKeys
    }
    private toQueryString = (object: any) =>
        '?' +
        Object.keys(object)
            .map(key => key + '=' + encodeURIComponent(object[key].toString()))
            .join('&');
    public formFileData(file: File) {
        let formData = new FormData();
        formData.append("token", this._apiKeys.token)
        formData.append("key", this._apiKeys.key)
        formData.append("file", file)
        return formData
    }
    public async request(method: RequestMethods, path: string, params?: any, data?: any) {
        const url = this._apiUrl + this._apiVersion + path + this.toQueryString({...this._apiKeys, ...params})
        const request = {
            method: method,
            url: url,
        }
        try {
            const req = data ? { ...request, data: data } : request
            this._log && console.log('Trello request:' + JSON.stringify(req, null, 2))
            const response = await this.client(req)
            const resp = response.data
            this._log && console.log('Trello response:' + JSON.stringify(resp, null, 2))
            return resp;
        } catch (error) {
            console.error(error);   
            return Promise.reject('No network')
        }
    }
}
