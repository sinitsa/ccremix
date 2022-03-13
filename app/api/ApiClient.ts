
import { Session } from "~/types/session";


type RequestMethods = 'POST' | 'GET' | 'DELETE' | 'PUT'


export class ApiClient {
    private _apiUrl: string = 'https://api.lawsvc.ru/';
    // private _apiVersion: string = '1';
/*     private _apiKeys = {
        login: 'log',
        token: '',
        passwd: ''
    }
 */
    public headers = {'Access-Control-Allow-Origin': '*'}

    private session: Session | undefined
    private _log: boolean = true;
    constructor(session?: Session) {
        this.session = session
    }
    private toQueryString = (object: any) =>
        '?' +
        Object.keys(object)
            .map(key => key + '=' + encodeURIComponent(object[key].toString()))
            .join('&');

    public async register(params: any, data?: any) {
        const res = await this.request('GET', 'auth/register', params, data)
        if (res.success === true) {
            return {success: true, data: res.data}
        }
        return {success: false, message: res.message, eror: res.error, data: res.data}
    }
    public async login(params: any, data?: any) {
        const res = await this.request('GET', 'auth/login', params, data)
        if (res.success === true) {
            this.session = {login: params.login, tokens: res.tokens}
            return {success: true, data: this.session, user: res.user}
        }
        return {success: false, message: res.message, eror: res.error, data: res.data}
    }
    public async refresh(params: any, data?: any) {
        const res = await this.request('GET', 'auth/refresh', params, data)
        if (res.success === true) {
            this.session = {login: params.login, tokens: res.tokens}
            return {success: true, data: this.session}
        }
        return {success: false, message: res.message, eror: res.error, data: res.data}
    }
    public async request(method: RequestMethods, path: string, params?: any, data?: any) {
        const url = this._apiUrl + path + this.toQueryString({...this._apiKeys, ...params})
        const request = {
            method,
//            mode: 'cors',
            headers: this.session?.tokens?.access ? {...this.headers, 'Authorization': 'Bearer ' + this.session?.tokens?.access} : this.headers,
        }
        try {
            const req = data ? { ...request, body: data } : request
            this._log && console.log('Api request url:' + url)
            this._log && console.log('Api request:' + JSON.stringify(req, null, 2))
            const response = await fetch(url, req)
            const resp = await response.json()
            this._log && console.log('Api response:' + JSON.stringify(resp, null, 2))
            return resp;
         } catch (error) {
             console.error(error);   
             return Promise.reject(error.message)
         }
    }

    public async setPrice(data: any) {
        let formData = new FormData();
        for (const key in data.data) {
            formData.append(key, data.data[key])
        }
        const res = await this.request('POST', 'price/set', {}, formData)
        return res
    }

    public async sendMessage(data: any) {
        let formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }
        const res = await this.request('POST', 'message/send', {}, formData)
        return res
    }

    public async getMessages(login: string) {
        const res = await this.request('GET', 'messages/' + login, {})
        return res
    }

    public async getPrices() {
        const res = await this.request('GET', 'price/get', {})
        return res
    }

    public async getOkved() {
        const res = await this.request('GET', 'okved/get', {})
        return res
    }

}
