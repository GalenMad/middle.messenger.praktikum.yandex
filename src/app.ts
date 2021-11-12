import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router';

// TODO: Прикрутить алиасы
const router = new Router();

pages.forEach(({block, path, props = {}, isPrivate}) => {
  router.use(path, block, props, isPrivate);
})

router.start();
