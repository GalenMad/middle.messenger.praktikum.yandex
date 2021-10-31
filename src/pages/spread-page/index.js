import compile from '../../utils/compile';
import compileTemplate from './template.pug';
export default (props) => compile(compileTemplate, props);
