import './styles.scss';
import '../../mixins/link/styles.scss';
import compileTemplate from './template.pug'
const compile = (props) => compileTemplate(props);
export default compile;
