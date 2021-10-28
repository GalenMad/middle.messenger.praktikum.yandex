import { queryStringify } from '../utils';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

class HTTPTransport {
    get = (url, options = {}) => {
        this.request(url, { ...options, method: METHODS.GET }, options.timeout)
    };
    put = (url, options = {}) => {
        this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    };
    post = (url, options = {}) => {
        this.request(url, { ...options, method: METHODS.POST }, options.timeout)
    };
    delete = (url, options = {}) => {
        this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
    };

    request = (url, options, timeout = 10000) => {
        const { method, headers = {}, data } = options;
        if (method === METHODS.GET && data) {
            url += `?${queryStringify(data)}`;
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                for (const header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            }
            xhr.timeout = timeout;

            xhr.onload = () => resolve(xhr);
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default new HTTPTransport;
