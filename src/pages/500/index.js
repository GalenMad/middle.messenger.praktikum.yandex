import '../../mixins/error-page/styles.scss';
import compileTemplate from './template.pug';

console.log(compileTemplate());

document.querySelector('html').innerHTML = compileTemplate();