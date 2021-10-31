import Authorization from './authorization/';
import Registration from './registration/';
import UserSettings from './profile/';
import ErrorPage from './error-page/';
import ChatsPage from './chats/';
import SpreadPage from './spread-page';

const errorPages = {
	404: {errorCode: '404', title: 'Ошибка', message: 'Не туда попали?', linkText: 'Вернуться к чатам', linkAddress: '/'},
	500: {errorCode: '500', title: 'Ошибка', message: 'Ага, уже бежим', linkText: 'Вернуться к чатам', linkAddress: '/'}
};

// TODO: Временная заглушка для разводящей страницы;
export { SpreadPage };

export default {
	'authorization': {
		name: 'Авторизация',
		render: Authorization,
		path: 'authorization'
	},
	'registration': {
		name: 'Регистрация',
		render: Registration,
		path: 'registration'
	},
	'chats': {
		name: 'Чаты',
		render: ChatsPage,
		path: 'chats'
	},
	'profile': {
		name: 'Профиль пользователя',
		render: UserSettings,
		path: 'profile'
	},
	'page-404': {
		name: 'Ошибка 404',
		render: (props) => ErrorPage(Object.assign(errorPages['404'], props)),
		path: '404'
	},
	'page-500': {
		name: 'Ошибка 500',
		render: (props) => ErrorPage(Object.assign(errorPages['500'], props)),
		path: '500'
	}
};
