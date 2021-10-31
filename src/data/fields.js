import { login, required, minLength, maxLength, alphaNum, name, firstCapital, email, phone, hasUppercase, hasDigit } from '../utils/validators.js';

export default {
	first_name: {
		label: 'Имя',
		id: 'first_name',
		name: 'first_name',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			name: {
				func: name,
				message: 'Неверный формат имени'
			},
			firstCapital: {
				func: firstCapital,
				message: 'Первая буква должна быть заглавной'
			}
		},
	},
	second_name: {
		label: 'Фамилия',
		id: 'second_name',
		name: 'second_name',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			name: {
				func: name,
				message: 'Неверный формат фамилии'
			},
			firstCapital: {
				func: firstCapital,
				message: 'Первая буква должна быть заглавной'
			},
		},
	},
	login: {
		label: 'Логин',
		id: 'login',
		name: 'login',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			login: {
				func: login,
				message: 'Неверный формат логина'
			},
			minLength: {
				argument: 3,
				func: minLength,
				message: (argument) => `Минимум симоволов — ${argument}`
			},
			maxLength: {
				argument: 20,
				func: maxLength,
				message: (argument) => `Максимум символов — ${argument}`
			},
			alphaNum: {
				func: alphaNum,
				message: 'Только латиница'
			}
		},
	},
	email: {
		label: 'Электронная почта',
		id: 'email',
		name: 'email',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			email: {
				func: email,
				message: 'Неверный формат электронной почты'
			}
		},
	},
	password: {
		label: 'Пароль',
		id: 'password',
		name: 'password',
		type: 'password',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			minLength: {
				argument: 8,
				func: minLength,
				message: (argument) => `Минимум симоволов — ${argument}`
			},
			maxLength: {
				argument: 40,
				func: maxLength,
				message: (argument) => `Максимум символов — ${argument}`
			},
			hasUppercase: {
				func: hasUppercase,
				message: 'Хотя бы одна заглавная буква'
			},
			hasDigit: {
				func: hasDigit,
				message: 'Хотя бы одна цифра'
			}
		}
	},
	phone: {
		label: 'Телефон',
		id: 'phone',
		name: 'phone',
		type: 'tel',
		validators: {
			required: {
				func: required,
				message: 'Обязательное поле'
			},
			phone: {
				func: phone,
				message: 'Неверный формат телефона'
			},
		}
	},
};
