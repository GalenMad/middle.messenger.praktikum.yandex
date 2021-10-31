import Block from '../modules/block';
const templ = (index) => `<template data-replace="${index}"></template>`;
const compile = (compileTemplate, props = {}) => {
	const templates = [];
	let counter = 0;
	const newProps = {};

	// TODO:
	// Здесь я делаю копию props чтобы избежать срабатывания Proxy на set в случае рендера инстанса 
	// Нет, это не перезаписывает свойства в оригинальных props
	Object.keys(props).forEach((propName) => {
		let prop = props[propName];
		newProps[propName] = prop;
		if (prop instanceof Block) {
			newProps[propName] = templ(counter);
			templates.push(prop.getContent());
			counter += 1;
		} else if (Array.isArray(prop) && prop.every(item => item instanceof Block)) {
			newProps[propName] = templ(counter);
			const fragment = document.createDocumentFragment();
			fragment.append(...prop.map(element => element.getContent()));
			templates.push(fragment);
			counter += 1;
		}
	});

	const container = document.createElement('template');
	container.innerHTML = compileTemplate(newProps);

	templates.forEach((element, index) => {
		const template = container.content.querySelector(`template[data-replace="${index}"]`);
		template.parentNode.replaceChild(element, template);
	});
	return container.content;
};
export default compile;
