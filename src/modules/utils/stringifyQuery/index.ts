/* eslint-disable @typescript-eslint/no-use-before-define */
type StringIndexed = Record<string, any>;

const isPlainObject = (value: unknown): value is StringIndexed => typeof value === 'object' && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === '[object Object]';
const isArray = (value: unknown): value is [] => Array.isArray(value);
const isPrimitive = (value: unknown): value is boolean | string | number => ['string', 'number', 'boolean', 'undefined'].includes(typeof value);

function arrayStringify(outerKey: string, data: unknown[]): string | never {
  const query: string[] = [];
  data.forEach((value, i) => {
    if (isPlainObject(value)) {
      query.push(objectStringify(`${outerKey}[${i}]`, value));
    }
    if (isArray(value)) {
      query.push(arrayStringify(`${outerKey}[${i}]`, value));
    }
    if (isPrimitive(value) || value === null) {
      query.push(`${outerKey}[${i}]=${value}`);
    }
  });
  return query.join('&');
}

function objectStringify(outerKey: string, data: StringIndexed): string | never {
  const query: string[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      query.push(objectStringify(`${outerKey}[${key}]`, value));
    }
    if (isArray(value)) {
      query.push(arrayStringify(`${outerKey}[${key}]`, value));
    }
    if (isPrimitive(value) || value === null) {
      query.push(`${outerKey}[${key}]=${value}`);
    }
  });
  return query.join('&');
}

export default function stringifyQuery(data: StringIndexed | string): string | never {
  if (typeof data === 'string') {
    return data;
  }

  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  const query: string[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      query.push(objectStringify(key, value));
    }
    if (isArray(value)) {
      query.push(arrayStringify(key, value));
    }
    if (isPrimitive(value) || value === null) {
      query.push(`${key}=${value}`);
    }
  });
  return query.join('&');
}
