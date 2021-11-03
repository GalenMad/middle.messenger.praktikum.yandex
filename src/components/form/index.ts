import Block from '../../modules/block';
import FormGroup from '../form-group';
import compileTemplate from './template.pug';
import './styles.scss';

// TODO: Пробежаться по коду и вынести в константы строки
const FORM_CLASS = 'form';
const FORM_TAG = 'form';

const createFormGroups = (props: { fields?: [] }) => {
  const formGroups: Record<string, any> = {};
  if (props.fields) {
    props.fields.forEach((field, index: number) => {
      const prop: string = `form-group-${index}`;
      formGroups[prop] = new FormGroup(field);
    });
    return formGroups;
  }
};

class Form extends Block {
  constructor(props: { attributes?: { class?: string }, fields?: []; }) {
    // Конструкция ниже нужна для того, чтобы класс, заданный снаружи, был в приоритете
    const className = (props.attributes && props.attributes.class) || FORM_CLASS;
    const attributes = { ...props.attributes, class: className };
    const formGroups = createFormGroups(props);
    super(FORM_TAG, { ...props, attributes }, formGroups);

    // Объявление в конструкторе не очень красиво, зато просто и не дублируется
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const children = Object.values(this.children);
      const isValid = children.map((element) => element.isValid).every((status) => status);
      children.forEach((element) => element.checkValidity());
      if (isValid) {
        const formData = children.map((element) => [element.name, element.value]);
        // eslint-disable-next-line no-console
        console.log(formData.reduceRight((prev, curr) => `${curr.join(': ')}\n${prev}`, ''));
      }
    });
  }

  render() {
    return compileTemplate(this.props);
  }
}

export default Form;
