import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';
import AuthController from './modules/controllers/auth';

// TODO: Прикрутить алиасы когда будет вебпак
// TODO: Попробовать организовать глобальные события, чтобы чистить валидацию,
//        хайдить модалки и т.д. Возможно, стоит хранить его в сторе
// TODO: Рефактор жизненного цикла компонента

// TODO: Поправить именование классов по БЭМ
// TODO: На FireFox что-то пошло не так, надо поправить
pages.forEach(({
  block, path, props = {}, options = {},
}) => Router.use(path, block, props, options));
new AuthController().init();
