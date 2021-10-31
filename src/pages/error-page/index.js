import compile from '../../utils/compile';
import compileTemplate from './template.pug';
import './styles.scss';
export default (props) => compile(compileTemplate, props);
