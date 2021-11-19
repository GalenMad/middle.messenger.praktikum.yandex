import { login, required, minLength, maxLength } from './validators';

export default [{
  label: 'Название чата',
  id: 'chat-title',
  name: 'title',
  validators: [
    required(),
    login(),
    minLength(3),
    maxLength(20),
  ],
}];
