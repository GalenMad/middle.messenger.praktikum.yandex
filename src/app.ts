import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';
import Store from './modules/store';

// TODO: Прикрутить алиасы
const router = new Router();

pages.forEach(({block, path, props = {}, options = {}}) => router.use(path, block, props, options));

new Store().init(router.start.bind(router));
