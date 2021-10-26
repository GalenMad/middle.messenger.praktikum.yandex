
import './styles.scss';
import pages from './pages/'
import Router from './Router';

const root = document.querySelector('#app');
const router = new Router({
  mode: 'hash',
  root: '/'
});

const list = Object.entries(pages).map(item => {
  return { path: `/${item[0]}`, name: item[0] }
});

for (const page in pages) {
  const render = pages[page]
  console.log(page);
  router.add(page, () => {
    root.innerHTML = render.render();
  })
}
router.add('', () => root.innerHTML = pages['main'].render({list}));