import Authorization from './authorization';
import Registration from './registration';
import UserSettings from './profile';
import ErrorPage from './error-page';
import ChatsPage from './chats';
import SpreadPage from './spread-page';

const errorPages = {
	404: { errorCode: '404', title: 'Ошибка', message: 'Не туда попали?', linkText: 'Вернуться к чатам', linkAddress: '/' },
	500: { errorCode: '500', title: 'Ошибка', message: 'Ага, уже бежим', linkText: 'Вернуться к чатам', linkAddress: '/' }
};

// TODO: Временная заглушка для разводящей страницы;
export { SpreadPage };

export default [{
	name: 'Авторизация',
	render: Authorization,
	path: 'authorization'
},
{
	name: 'Регистрация',
	render: Registration,
	path: 'registration'
},
{
	name: 'Чаты',
	render: ChatsPage,
	path: 'chats'
},
{
	name: 'Профиль пользователя',
	render: UserSettings,
	path: 'profile'
},
{
	name: 'Ошибка 404',
	render: () => ErrorPage({...errorPages['404'] }),
	path: '404'
},
{
	name: 'Ошибка 500',
	render: () => ErrorPage({...errorPages['500'] }),
	path: '500'
}];
