import HTTP from '../http';

const defaultHeaders = { 'content-type': 'application/json' };

export default class BaseAPI {
  headers: Record<string, string>;

  apiInstance: HTTP;

  throwError: () => void;

  constructor(path: string, headers?: Record<string, string>) {
    this.headers = headers || defaultHeaders;
    this.apiInstance = new HTTP(path);
  }
}
