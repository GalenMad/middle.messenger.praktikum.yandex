import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';

// TODO: Прикрутить алиасы

pages.forEach(({block, path, props = {}, options = {}}) => Router.use(path, block, props, options));
Router.start();
