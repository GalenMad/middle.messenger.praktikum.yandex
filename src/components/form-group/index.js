import Block from '../../modules/block';
import compileTemplate from './template.pug';

const props = {
	label: 'Логин',
	id: 'login',
	name: 'login',
	type: 'text',
	validationMessage: 'Неправильный что-то там',
	isRequired: true
};

class FormGroup extends Block {

	static EVENTS = {
		VALIDATE: 'input:validate'
	}
	
	render() {
		return compileTemplate(this.props);
	}

	// function showValidationMessage
	// Показать валидационное сообщение

	// function hideValidationMessage
	// Скрыть валидационное сообщение

	// function checkValidation
	// Проверка значения инпута на правила валидации в props

	// on event validate запускать checkValidation 
	// Если не ок, то показываем валидацию

	// На событие blur вешаем emit validate

	// На событие focus вешаем hideValidationMessage


	_getContent = this.getContent;

	getContent = () => {
		console.log(Block.EVENTS);
		console.log(FormGroup.EVENTS);
		const content = this._getContent();
		const input = content.querySelector('input');
		const validation = content.querySelector('.validation');
		input.addEventListener('blur', () => {
			console.log('blur');
			validation.style.display = 'block';
			validation.textContent = this.props.validationMessage;
		});
		return content;
	}
}

window.formGroup = new FormGroup(props);
// document.querySelector('#exp').append(formGroup.getContent());


// setTimeout(() => {
// 	formGroup.setProps({
// 		label: 'Пароль',
// 		id: 'password',
// 		name: 'password',
// 		type: 'password',
// 		validationMessage: 'Неправильный что-то там',
// 		isRequired: false
// 	});
// }, 1000);


// document.querySelector('#exp').innerHTML = ''
// document.querySelector('#exp').append(formGroup.getContent());
