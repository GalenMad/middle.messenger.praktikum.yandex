import './styles.scss';
import compileTemplate from './template.pug';
import avatar from '../../assets/images/default-avatar.svg';

const chats = [];

for (let i = 0; i < 4; i++) {
	chats.push({
		"id": 123,
		"title": "Андрей",
		"avatar": avatar,
		"unread_count": i + 2,
		"last_message": {
			"user": {
				"first_name": "Petya",
				"second_name": "Pupkin",
				"avatar": avatar,
				"email": "my@email.com",
				"login": "userLogin",
				"phone": "8(911)-222-33-22"
			},
			"time": "10:20",
			"content": "И Human Interface Guidelines и Material Design рекомендуют не выпендриваться…"
		}
	})
}

export default (props) => compileTemplate(Object.assign({ chats, userAvatar: avatar }, props));
