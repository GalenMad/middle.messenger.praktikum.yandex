import {
  login, required, minLength, maxLength, name, firstCapital,
  email, phone, hasUppercase, hasDigit, notInteger,
} from './validators';

export default [{
  label: 'Имя',
  id: 'first_name',
  name: 'first_name',
  validators: [
    required(),
    name(),
    firstCapital(),
  ],
},
{
  label: 'Фамилия',
  id: 'second_name',
  name: 'second_name',
  validators: [
    required(),
    name(),
    firstCapital(),
  ],
},
{
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
  label: 'Электронная почта',
  id: 'email',
  name: 'email',
  type: 'email',
  validators: [
    required(),
    email(),
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
},
{
  label: 'Телефон',
  id: 'phone',
  name: 'phone',
  type: 'tel',
  validators: [
    required(),
    phone(),
  ],
}];
