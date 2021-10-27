import './styles.scss'
import compileTemplate from './template.pug'
import avatar from '../../assets/images/default-avatar.svg'

const chats = [{
    avatar,
    chatName: 'Андрей',
    chatTeaser: 'И Human Interface Guidelines и Material Design рекомендуют…',
    lastMessageTime: '10:20',
    newMessageCount: 2
}];

export default (props) => compileTemplate(Object.assign({ chats, userAvatar: avatar }, props));