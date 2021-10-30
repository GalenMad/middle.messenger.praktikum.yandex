import Block from '../modules/block';
const templ = (index) => `<template data-replace="${index}"></template>`;
const compile = (compileTemplate, props = {}) => {
	const templates = [];

	Object.keys(props).forEach((propName, index) => {
		let prop = props[propName];
		if (prop instanceof Block) {
			props[propName] = templ(index);
			templates.push(prop.getContent());
		} else if (Array.isArray(prop) && prop.every(item => item instanceof Block)) {
			props[propName] = templ(index);
			const fragment = document.createDocumentFragment();
			fragment.append(...prop.map(element => element.getContent()));
			templates.push(fragment);
		}
	});

	const container = document.createElement('template');
	container.innerHTML = compileTemplate(props);

	templates.forEach((element, index) => {
		console.log(container.content);
		const template = container.content.querySelector(`template[data-replace="${index}"]`);
		template.parentNode.replaceChild(element, template);
	});

	return container.content;
};
export default compile;
