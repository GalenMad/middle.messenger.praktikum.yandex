import Authorization from './authorization/';
import Registration from './registration/';
import UserSettings from './user-settings/';
import Page404 from './404/';
import Page500 from './500/';
import SpreadPage from './spread-page';

export { SpreadPage };

export default {
    'authorization': {
        name: 'authorization',
        render: Authorization,
        path: 'authorization'
    },
    'registration': {
        name: 'registration',
        render: Registration,
        path: 'registration'
    },
    'user-settings': {
        name: 'user-settings',
        render: UserSettings,
        path: 'user-settings'
    },
    '404': {
        name: '404',
        render: Page404,
        path: '404'
    },
    '500': {
        name: '500',
        render: Page500,
        path: '500'
    }
};