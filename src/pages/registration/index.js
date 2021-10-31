import allFields from '../../data/fields';
import Form from './../../components/form';
import compile from '../../utils/compile';
import compileTemplate from './template.pug';

const fields = Object.values(allFields);

const props = {
	fields,
	title: 'Регистрация',
	buttonText: 'Поехали',
	footerText: 'Уже есть аккаунт?',
	linkText: 'Войти',
	link: '/authorization'
};

const form = new Form(props);

export default (props) => compile(compileTemplate, Object.assign({ form }, props));
