const stringifyQuery = (data: Record<string, any>) => {
  if (!data || typeof data !== 'object') {
    return '';
  }
  return Object.entries(data).reduceRight((prev: any, curr: any): string => `${curr[0]}=${curr[1].toString()}${prev ? `&${prev}` : ''}`, null);
};

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
};

const BASE_HOST = 'https://ya-praktikum.tech/api/v2';

class HTTPTransport {
  private _host: string;
  private _hand: string;

  constructor(hand = '', host = BASE_HOST) {
    this._host = host;
    this._hand = hand
  }

  get = (url: string, options: { timeout?: number, data?: {} } = {}) => {
    const path = options.data ? `${url}?${stringifyQuery(options.data)}` : url;
    return this.request(path, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: { timeout?: number, data?: {} } = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: { timeout?: number, data?: {} } = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: { timeout?: number, data?: {} } = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: { method?: METHODS | string, headers?: Record<string, string>, data?: {} }, timeout = 10000) => {
    const { method = METHODS.GET, headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const path = method === METHODS.GET && data ? `${url}?${stringifyQuery(data)}` : url;

      xhr.open(method, this._host + this._hand + path);
      xhr.timeout = timeout;

      if (headers) {
        for (const header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      const getResponse = (
        error = false,
        status: number | string = xhr.status,
        data: {} | null = JSON.parse(xhr.responseText)
      ) => ({ error, status, data });

      xhr.onload = () => resolve(getResponse(!(xhr.status >= 200 && xhr.status < 300)))
      xhr.onabort = () => reject(getResponse(true, 'abort', null));
      xhr.onerror = () => reject(getResponse(true, 'unknown', null));
      xhr.ontimeout = () => reject(getResponse(true, 'timeout', null));

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
