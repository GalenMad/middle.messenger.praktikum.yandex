import './scss/styles.scss';
import pages from './pages';
import Router from './modules/router.js';

const router = new Router("#app");

pages.forEach(({block, path, props = {}}) => {
  router.use(path, block, props);
})

router.start();
window.router = router;
