import allFields from '../../data/fields';
import Form from './../../components/form';
import compile from '../../utils/compile';
import compileTemplate from './template.pug';

const fields = ['login', 'password'].map(field => allFields[field]);

const props = {
	fields,
	title: 'Авторизация',
	buttonText: 'Поехали',
	footerText: 'Нет аккаунта?',
	linkText: 'Зарегестрироваться',
	link: '/registration'
};

const form = new Form(props);
export default (props) => compile(compileTemplate, Object.assign({ form }, props));
