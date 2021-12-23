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

const req = (value: string | boolean | Date | {}) => {
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
    return true;
  }

  return Boolean(String(value).length);
};

const DECL_CASES = [2, 0, 1, 1, 1, 2];
const LENGTH_TITLES = ['символа', 'символов', 'символов'];

// eslint-disable-next-line max-len
const declOfNum = (number: number) => LENGTH_TITLES[(number % 100 > 4 && number % 100 < 20) ? 2 : DECL_CASES[(number % 10 < 5) ? number % 10 : 5]];

export const minLength = (length: number) => {
  const validator = (value: string | []): boolean => value.length >= length;
  const message = `Не менее ${length} ${declOfNum(length)}`;
  return (value: string) => (validator(value) ? false : message);
};

export const maxLength = (length: number) => {
  const validator = (value: string | []): boolean => value.length <= length;
  const message = `Не более ${length} ${declOfNum(length)}`;
  return (value: string) => (validator(value) ? false : message);
};

export const phone = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.PHONE, value);
  const message = 'Неверный формат телефона';
  return (value: string) => (validator(value) ? false : message);
};

export const email = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.EMAIL, value);
  const message = 'Неверный формат электронной почты';
  return (value: string) => (validator(value) ? false : message);
};

export const name = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.NAME, value);
  const message = 'Только буквы';
  return (value: string) => (validator(value) ? false : message);
};

export const firstCapital = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.FIRST_UPPERCASE, value);
  const message = 'Первая буква должна быть заглавной';
  return (value: string) => (validator(value) ? false : message);
};

export const alpha = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.ALPHA, value);
  const message = 'Только латиница';
  return (value: string) => (validator(value) ? false : message);
};

export const alphaNum = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.ALPHA, value);
  const message = 'Только латиница и цифры';
  return (value: string) => (validator(value) ? false : message);
};

export const notInteger = () => {
  const validator = (value: string): boolean => !Number(value);
  const message = 'Значение не должно быть числом';
  return (value: string) => (validator(value) ? false : message);
};

export const login = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.LOGIN, value);
  const message = 'Только буквы, цифры, дефисы и подчеркивания';
  return (value: string) => (validator(value) ? false : message);
};

export const hasUppercase = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.HAS_UPPERCASE, value);
  const message = 'Должна быть буква в верхнем регистре';
  return (value: string) => (validator(value) ? false : message);
};

export const hasLowercase = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.HAS_LOWERCASE, value);
  const message = 'Должна быть буква в нижнем регистре';
  return (value: string) => (validator(value) ? false : message);
};

export const hasDigit = () => {
  const validator = (value: string): boolean => testRegExp(REG_EXP.HAS_DIGIT, value);
  const message = 'Должна быть хотя бы одна цифра';
  return (value: string) => (validator(value) ? false : message);
};

export const required = () => {
  const validator = (value: string): boolean => req(typeof value === 'string' ? value.trim() : value);
  const message = 'Обязательное поле';
  return (value: string) => (validator(value) ? false : message);
};
