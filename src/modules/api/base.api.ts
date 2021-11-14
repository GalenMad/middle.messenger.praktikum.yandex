import HTTP from '../fetch';
const defaultHeaders = { 'content-type': 'application/json' };

export default class BaseAPI {
  headers: Record<string, string>;
  apiInstance: HTTP;

  constructor(path: string, headers?: Record<string, string>) {
    this.headers = headers || defaultHeaders;
    this.apiInstance = new HTTP(path);    
  }

  create(_data?: Record<string, unknown>): unknown { throw new Error('Not implemented'); }

  request(_data?: Record<string, unknown>): unknown { throw new Error('Not implemented'); }

  update(_data?: Record<string, unknown>): unknown { throw new Error('Not implemented'); }

  delete(): unknown { throw new Error('Not implemented'); }
}
