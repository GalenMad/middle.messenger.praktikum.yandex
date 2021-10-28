import './styles.scss';
import compileTemplate from './template.pug';
import defaultAvatar from '../../assets/images/default-avatar.svg';

const userData = [{
	name: 'Почта',
	value: 'pochta@yandex.ru',
},{
	name: 'Логин',
	value: 'ivanivanov',
},{
	name: 'Имя',
	value: 'Иван',
},{
	name: 'Фамилия',
	value: 'Иванов',
},{
	name: 'Имя в чате',
	value: 'Иван',
},{
	name: 'Телефон',
	value: '+7 (909) 967 30 30'
}];

const compile = (props) => compileTemplate(Object.assign({userData, defaultAvatar}, props));
export default compile;
