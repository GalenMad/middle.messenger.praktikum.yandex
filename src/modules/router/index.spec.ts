/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import pages from '../../pages';
import Router from './index';

describe('Роутер', () => {
  const isAuthorized = () => false;
  pages.forEach(({
    block, path, options = {},
  }) => Router.use(path, block, options));
  Router.start(isAuthorized);

  // it('404', () => {
  Router.go('/404');
  console.log(window.history);
  // });
  // Проверка отправки на 404
  // Проверка отправки на авторизацию
  // Проверка отправки к чатам
  // Проверка перехода на страницу
  // Проверка back
  // Проверка forward
});
