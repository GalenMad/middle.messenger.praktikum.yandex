import {
  login, required, minLength, maxLength, hasUppercase, hasDigit, notInteger,
} from './validators';

export default [{
  label: 'Логин',
  id: 'login',
  name: 'login',
  validators: [
    required(),
    login(),
    minLength(3),
    maxLength(20),
    notInteger(),
  ],
},
{
  label: 'Пароль',
  id: 'password',
  name: 'password',
  type: 'password',
  validators: [
    required(),
    minLength(8),
    maxLength(40),
    hasUppercase(),
    hasDigit(),
  ],
}];
