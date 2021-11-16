import { required, minLength, maxLength, hasUppercase, hasDigit } from '../utils/validators';

export default [{
  label: 'Старый пароль',
  id: 'oldPassword',
  name: 'oldPassword',
  type: 'password',
  validators: [
    required(),
  ]
}, {
  label: 'Новый пароль',
  id: 'newPassword',
  name: 'newPassword',
  type: 'password',
  validators: [
    required(),
    minLength(8),
    maxLength(40),
    hasUppercase(),
    hasDigit()
  ],
}];
