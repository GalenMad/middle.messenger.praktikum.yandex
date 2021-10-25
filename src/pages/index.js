import Authorization from './authorization/';
import Registration from './registration/';
import UserSettings from './user-settings/';
import Page404 from './404/';
import Page500 from './500/';
import Main from './main/';

export default {
    'main': Main,
    'authorization': Authorization,
    'registration': Registration,
    'user-settings': UserSettings,
    '404': Page404,
    '500': Page500
}