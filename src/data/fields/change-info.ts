import { login, required, minLength, maxLength, name, firstCapital, email, phone, notInteger } from './validators';

export default (data: { [x: string]: any; }) => [{
  label: 'Имя',
  id: 'first_name',
  name: 'first_name',
  value: data['first_name'],
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
  value: data['second_name'],
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
  value: data['login'],
  validators: [
    required(),
    login(),
    minLength(3),
    maxLength(20),
    notInteger()
  ],
},
{
  label: 'Имя в чате',
  id: 'display_name',
  name: 'display_name',
  value: data['display_name'],
  validators: [
    required(),
    maxLength(20),
    notInteger()
  ],
},
{
  label: 'Электронная почта',
  id: 'email',
  name: 'email',
  value: data['email'],
  type: 'email',
  validators: [
    required(),
    email(),
  ],
},
{
  label: 'Телефон',
  id: 'phone',
  name: 'phone',
  value: data['phone'],
  type: 'tel',
  validators: [
    required(),
    phone()
  ],
}];
