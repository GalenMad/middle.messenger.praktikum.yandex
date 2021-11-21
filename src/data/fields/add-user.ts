import {
  login, required, minLength, maxLength, notInteger,
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
}];
