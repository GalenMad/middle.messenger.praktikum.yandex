/* eslint-disable max-len */
import './types.d';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const stringifyQuery = (data: Record<string, string | number | unknown>) => {
  if (!data || typeof data !== 'object') {
    return '';
  }
  return Object.entries(data).reduceRight((prev: any, curr: any): string => `${curr[0]}=${curr[1].toString()}${prev ? `&${prev}` : ''}`, null);
};

const getJSONFromString = (string: string) => {
  try {
    const json = JSON.parse(string);
    return json;
  } catch (e) {
    return string;
  }
};

const BASE_HOST = 'https://ya-praktikum.tech/api/v2';

class HTTPTransport {
  private _host: string;

  private _hand: string;

  constructor(hand = '', host = BASE_HOST) {
    this._host = host;
    this._hand = hand;
  }

  get = (url: string, options: requestOptions = {}) => {
    const path = options.data ? `${url}?${stringifyQuery(options.data)}` : url;
    return this.request(path, { ...options, method: METHODS.GET });
  };

  put = (url: string, options: requestOptions = {}) => this.request(url, { ...options, method: METHODS.PUT });

  post = (url: string, options: requestOptions = {}) => this.request(url, { ...options, method: METHODS.POST });

  delete = (url: string, options: requestOptions = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: requestOptions): Promise<response> => {
    const {
      method = METHODS.GET,
      headers = null,
      data = null,
      timeout = 10000,
    } = options;

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const path = method === METHODS.GET && data ? `${url}?${stringifyQuery(data)}` : url;
      const requestBody = data && data instanceof FormData ? data : JSON.stringify(data);

      xhr.open(method, this._host + this._hand + path);
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach((header) => xhr.setRequestHeader(header, headers[header]));
      }

      const getResponse = (
        error = false,
        status: number | string = xhr.status,
        data: {} | null = getJSONFromString(xhr.responseText),
      ): response => ({ error, status, data });

      xhr.onload = () => resolve(getResponse(!(xhr.status >= 200 && xhr.status < 300)));
      xhr.onabort = () => resolve(getResponse(true, 'abort', null));
      xhr.onerror = () => resolve(getResponse(true, 'unknown', null));
      xhr.ontimeout = () => resolve(getResponse(true, 'timeout', null));
      xhr.send(requestBody);
    });
  };
}

export default HTTPTransport;
