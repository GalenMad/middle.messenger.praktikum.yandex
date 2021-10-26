import '../../mixins/form-page/styles.scss';
import '../../mixins/form-group/styles.scss';
import compileTemplate from './template.pug'

const formGroups = [
    {
        label: 'Логин',
        id: 'login',
        inputType: 'text',
        validationMessage: 'Неправильный что-то там',
        isRequired: true
    },
    {
        label: 'Пароль',
        id: 'password',
        inputType: 'password',
        validationMessage: 'Неправильный что-то там',
        isRequired: true
    }
]

export default (props) => compileTemplate(Object.assign({formGroups}, props));