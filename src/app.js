
import './styles.scss';
import pages from './pages/';
import { SpreadPage } from './pages/';
import Router from './Router';

// Router нужен, чтобы не плодить лишних html-страниц
const root = document.querySelector('#app');
const router = new Router({
  mode: 'hash',
  root: '/'
});

const list = Object.entries(pages).map(item => {
  const { path, name } = item[1];
  return { path: `/${path}`, name }
});

for (const page in pages) {
  const {render, path} = pages[page]
  router.add(path, () => {
    root.innerHTML = render();
  })
}

// TODO: Временная заглушка для разводящей страницы;
router.add('', () => root.innerHTML = SpreadPage({list}));