import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';
import AuthController from './modules/controllers/auth.controller';

// TODO: Прикрутить алиасы

pages.forEach(({block, path, props = {}, options = {}}) => Router.use(path, block, props, options));
new AuthController().init();
