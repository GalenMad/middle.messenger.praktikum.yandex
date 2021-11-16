import { login, required, minLength, maxLength, hasUppercase, hasDigit, notInteger } from '../utils/validators';

export default [{
  label: 'Логин',
  id: 'login',
  name: 'login',
  value: 'amvoronkov',
  validators: [
    required(),
    login(),
    minLength(3),
    maxLength(20),
    notInteger()
  ],
},
{
  label: 'Пароль',
  id: 'password',
  name: 'password',
  type: 'password',
  value: 'test@test.test1D',
  validators: [
    required(),
    minLength(8),
    maxLength(40),
    hasUppercase(),
    hasDigit()
  ],
}];
