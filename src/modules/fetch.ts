const stringifyQuery = (data: Record<string, string | number | unknown>) => {
  if (!data || typeof data !== 'object') {
    return '';
  }
  return Object.entries(data).reduceRight((prev: any, curr: any): string => `${curr[0]}=${curr[1].toString()}${prev ? `&${prev}` : ''}`, null);
};

const getJSONFromString = (string: string) => {
  try {
    let json = JSON.parse(string);
    return json;
  } catch (e) {
    return string;
  }
}

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
};

const BASE_HOST = 'https://ya-praktikum.tech/api/v2';

interface requestOptions {
  timeout?: number, 
  data?: Record<string, string | number | unknown>,
  method?: METHODS | string,
  headers?: Record<string, string>,
  credentials?: boolean
}

class HTTPTransport {
  private _host: string;
  private _hand: string;

  constructor(hand = '', host = BASE_HOST) {
    this._host = host;
    this._hand = hand
  }

  get = (url: string, options: requestOptions = {}) => {
    const path = options.data ? `${url}?${stringifyQuery(options.data)}` : url;
    return this.request(path, { ...options, method: METHODS.GET });
  };

  put = (url: string, options: requestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  post = (url: string, options: requestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  delete = (url: string, options: requestOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: requestOptions) => {
    const {
      method = METHODS.GET,
      headers = {},
      credentials = false,
      data = null,
      timeout = 10000
    } = options;

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const path = method === METHODS.GET && data ? `${url}?${stringifyQuery(data)}` : url;
      const requestBody = method !== METHODS.GET && data ? JSON.stringify(data) : null;

      xhr.open(method, this._host + this._hand + path);
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      if (headers) {
        for (const header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      const getResponse = (
        error = false,
        status: number | string = xhr.status,
        data: {} | null = getJSONFromString(xhr.responseText)
      ) => ({ error, status, data });

      xhr.onload = () => resolve(getResponse(!(xhr.status >= 200 && xhr.status < 300)))
      xhr.onabort = () => resolve(getResponse(true, 'abort', null));
      xhr.onerror = () => resolve(getResponse(true, 'unknown', null));
      xhr.ontimeout = () => resolve(getResponse(true, 'timeout', null));
      xhr.send(requestBody);
    });
  };
}

export default HTTPTransport;
