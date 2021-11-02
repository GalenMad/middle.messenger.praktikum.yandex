import allFields from '../../data/fields';
import Form from './../../components/form';
import compileTemplate from './template.pug';
import Block from '../../modules/block';

const fields = allFields.filter(field => ['login', 'password'].includes(field.name));

const props = {
	fields,
	title: 'Авторизация',
	buttonText: 'Поехали',
	footerText: 'Нет аккаунта?',
	linkText: 'Зарегестрироваться',
	link: '/registration'
};

class Page extends Block {
	constructor(props = {}) {
		const form = new Form(props);
		super('div', props, { form });
	}

	render() {
		return compileTemplate(this.props);
	}
}

export default (extProps) => new Page({ ...props, ...extProps }).getContent();
