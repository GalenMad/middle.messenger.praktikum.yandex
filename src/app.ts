import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';
import AuthController from './modules/controllers/auth.controller';

// TODO: Прикрутить алиасы когда будет вебпак
// TODO: Попробовать организовать глобальные события, чтобы чистить валидацию, 
//        хайдить модалки и т.д. Возможно, стоит хранить его в сторе
// TODO: Рефактор жизненного цикла компонента

// TODO: Поправить именование классов по БЭМ
pages.forEach(({
  block, path, props = {}, options = {},
}) => Router.use(path, block, props, options));
new AuthController().init();
