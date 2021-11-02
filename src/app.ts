import './scss/styles.scss';
import pages, { SpreadPage } from './pages';
import Router from './modules/router';

const root: HTMLElement | null = document.querySelector('#app');

if (root === null) {
  throw new Error('Не найден root-элемент');
}

const router = new Router({
  mode: 'hash',
  root: '/',
});

// eslint-disable-next-line @typescript-eslint/ban-types
pages.forEach((page: { path: string, render: Function }): void => {
  const { render, path } = page;
  router.add(path, () => {
    root.innerHTML = '';
    root.appendChild(render());
  });
});

// TODO: Временная заглушка для разводящей страницы;
router.add('', (): void => {
  root.innerHTML = '';
  root.appendChild(SpreadPage({ list: pages }));
});
