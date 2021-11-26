import Block from '../modules/block';
import Authorization from './authorization';
import Registration from './registration';
import UserSettings from './profile';
import Error404 from './error-404';
import Error500 from './error-500';
import ChatsPage from './chats';

interface RoutePage {
  name: string;
  block: typeof Block;
  path: string;
  options?: PageOptions
}

const routeMap: RoutePage[] = [{
  name: 'Авторизация',
  block: Authorization,
  path: '/',
  options: {
    isNotForAuthorized: true,
  },
},
{
  name: 'Регистрация',
  block: Registration,
  path: '/sign-up',
  options: {
    isNotForAuthorized: true,
  },
},
{
  name: 'Чаты',
  block: ChatsPage,
  path: '/messenger',
  options: {
    isPrivate: true,
  },
},
{
  name: 'Профиль пользователя',
  block: UserSettings,
  path: '/settings',
  options: {
    isPrivate: true,
  },
},
{
  name: 'Ошибка 404',
  block: Error404,
  path: '/404',
},
{
  name: 'Ошибка 500',
  block: Error500,
  path: '/500',
}];

export default routeMap;
