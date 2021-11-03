const REG_EXP = {
  ALPHA: /^[a-zA-Z]*$/,
  ALPHA_NUM: /^[a-zA-Z0-9]*$/,
  PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/,
  LOGIN: /^[A-Za-zА-Яа-я0-9_-]*$/,
  NAME: /^[A-Za-zА-Яа-я-]*$/,
  /* eslint no-control-regex: 0 */
  EMAIL: /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  FIRST_UPPERCASE: /^[A-ZА-Я]/,
  HAS_UPPERCASE: /(?=.*[A-ZА-Я])/,
  HAS_DIGIT: /(?=.*[0-9])/,
  HAS_LOWERCASE: /(?=.*[a-zа-я])/,
};

const testRegExp = (regexp: RegExp, value: string) => regexp.test(value);

const req = (value: string | boolean | Date) => {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    return false;
  }

  return Boolean(String(value).length);
};

export const minLength = (length: number) => (value: string) => value.length >= length;
export const maxLength = (length: number) => (value: string) => value.length <= length;
export const phone = () => (value: string) => testRegExp(REG_EXP.PHONE, value);
export const email = () => (value: string) => testRegExp(REG_EXP.EMAIL, value);
export const name = () => (value: string) => testRegExp(REG_EXP.NAME, value);
export const firstCapital = () => (value: string) => testRegExp(REG_EXP.FIRST_UPPERCASE, value);
export const alpha = () => (value: string) => testRegExp(REG_EXP.ALPHA, value);
export const alphaNum = () => (value: string) => testRegExp(REG_EXP.ALPHA_NUM, value);
export const notInteger = () => (value: string) => !Number(value);
export const login = () => (value: string) => testRegExp(REG_EXP.LOGIN, value) && notInteger()(value);
export const hasUppercase = () => (value: string) => testRegExp(REG_EXP.HAS_UPPERCASE, value);
export const hasLowercase = () => (value: string) => testRegExp(REG_EXP.HAS_LOWERCASE, value);
export const hasDigit = () => (value: string) => testRegExp(REG_EXP.HAS_DIGIT, value);
export const required = () => (value: string) => req((value).trim());
