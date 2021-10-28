import compileTemplate from './template.pug';

const formGroups = [{
	label: 'Почта',
	id: 'email',
	inputType: 'email',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Логин',
	id: 'login',
	inputType: 'text',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Имя',
	id: 'first_name',
	inputType: 'text',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Фамилия',
	id: 'last_name',
	inputType: 'text',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Телефон',
	id: 'phone',
	inputType: 'tel',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Пароль',
	id: 'password',
	inputType: 'password',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
},
{
	label: 'Повторите пароль',
	id: 'repeatPassword',
	inputType: 'password',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
}];

export default (props) => compileTemplate(Object.assign({ formGroups }, props));