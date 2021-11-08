import Authorization from './authorization';
import Registration from './registration';
import UserSettings from './profile';
import ErrorPage from './error-page';
import ChatsPage from './chats';

const errorPages = {
	'404': {
		errorCode: '404', message: 'Не туда попали?', linkText: 'Вернуться к чатам', linkAddress: '/',
	},
	'500': {
		errorCode: '500', message: 'Ага, уже бежим', linkText: 'Вернуться к чатам', linkAddress: '/',
	},
};

export default [{
	name: 'Авторизация',
	block: Authorization,
	path: '/sign-in',
},
{
	name: 'Регистрация',
	block: Registration,
	path: '/sign-up',
},
{
	name: 'Чаты',
	block: ChatsPage,
	path: '/',
},
{
	name: 'Профиль пользователя',
	block: UserSettings,
	path: '/profile',
},
{
	name: 'Ошибка 404',
	block: ErrorPage,
	path: '/error-404',
  props: errorPages['404']
},
{
	name: 'Ошибка 500',
	block: ErrorPage,
	path: '/error-500',
  props: errorPages['500']
}];

