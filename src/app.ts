import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';
import Store from './modules/store';

// TODO: Прикрутить алиасы

pages.forEach(({block, path, props = {}, options = {}}) => Router.use(path, block, props, options));
new Store().init(Router.start.bind(Router));
