/* eslint-disable max-len */
import stringifyQuery from '../utils/stringifyQuery';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum ErrorStatuses {
  ABORT = 'abort',
  UNKNOWN = 'unknown',
  TIMEOUT = 'timeout',
}

export const getJSONFromString = (string: string) => {
  try {
    const json = JSON.parse(string);
    return json;
  } catch (e) {
    return string;
  }
};

const BASE_HOST = 'https://ya-praktikum.tech/api/v2';

export default class HTTPTransport {
  private _host: string;

  private _hand: string;

  constructor(hand = '', host = BASE_HOST) {
    this._host = host;
    this._hand = hand;
  }

  get = (url: string, options: RequestOptions = {}) => {
    const urlWithParams = options.data && !(options.data instanceof FormData) ? `${url}?${stringifyQuery(options.data)}` : url;
    return this.request(urlWithParams, { ...options, method: Methods.GET });
  };

  put = (url: string, options: RequestOptions = {}) => this.request(url, { ...options, method: Methods.PUT });

  post = (url: string, options: RequestOptions = {}) => this.request(url, { ...options, method: Methods.POST });

  delete = (url: string, options: RequestOptions = {}) => this.request(url, { ...options, method: Methods.DELETE });

  request = (url: string, options: RequestOptions): Promise<RequestResponse> => {
    const {
      method = Methods.GET,
      headers = null,
      data = null,
      timeout = 10000,
    } = options;

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const requestBody = data && data instanceof FormData ? data : JSON.stringify(data);
      xhr.open(method, this._host + this._hand + url);
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach((header) => xhr.setRequestHeader(header, headers[header]));
      }

      const getResponse = (
        error = false,
        status: string | number = xhr.status,
        responseData: {} | null = getJSONFromString(xhr.responseText),
      ): RequestResponse => ({ error, status, data: responseData });

      xhr.onload = () => resolve(getResponse(!(xhr.status >= 200 && xhr.status < 300)));
      // TODO: Статусы ошибок в enum
      xhr.onabort = () => resolve(getResponse(true, ErrorStatuses.ABORT, null));
      xhr.onerror = () => resolve(getResponse(true, ErrorStatuses.UNKNOWN, null));
      xhr.ontimeout = () => resolve(getResponse(true, ErrorStatuses.TIMEOUT, null));
      if (method === Methods.GET && !(requestBody instanceof FormData)) {
        xhr.send();
      } else {
        xhr.send(requestBody);
      }
    });
  };
}
