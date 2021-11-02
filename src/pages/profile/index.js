import Block from '../../modules/block';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import compileTemplate from './template.pug';
import './styles.scss';

const userData = [{
	name: 'Почта',
	value: 'pochta@yandex.ru',
}, {
	name: 'Логин',
	value: 'ivanivanov',
}, {
	name: 'Имя',
	value: 'Иван',
}, {
	name: 'Фамилия',
	value: 'Иванов',
}, {
	name: 'Имя в чате',
	value: 'Иван',
}, {
	name: 'Телефон',
	value: '+7 (909) 967 30 30'
}];

class Page extends Block {
	constructor(props = {}) {
		super('div', props);
	}
	
	render() {
		return compileTemplate(this.props);
	}
}

export default (props) => new Page({ ...props, userData, defaultAvatar}).getContent();


