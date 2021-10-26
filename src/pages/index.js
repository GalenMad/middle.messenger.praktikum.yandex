import Authorization from './authorization/';
import Registration from './registration/';
import UserSettings from './user-settings/';
import Page404 from './404/';
import Page500 from './500/';
import SpreadPage from './spread-page';

// TODO: Временная заглушка для разводящей страницы;
export { SpreadPage };

export default {
    'authorization': {
        name: 'Авторизация',
        render: Authorization,
        path: 'authorization'
    },
    'registration': {
        name: 'Регситрация',
        render: Registration,
        path: 'registration'
    },
    'user-settings': {
        name: 'Настройки пользователя',
        render: UserSettings,
        path: 'user-settings'
    },
    '404': {
        name: 'Ошибка 404',
        render: Page404,
        path: '404'
    },
    '500': {
        name: 'Ошибка 500',
        render: Page500,
        path: '500'
    }
};