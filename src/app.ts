
import './scss/styles.scss';
import pages from './pages';
import { SpreadPage } from './pages';
import Router from './modules/router';
import './components/form-group';

const root: HTMLElement | null = document.querySelector('#app');

if (root === null) {
	throw new Error('Не найден root-элемент');
}





// PROD

// Router нужен, чтобы не плодить лишние html-страниц
// const router = new Router({
// 	mode: 'hash',
// 	root: '/'
// });


// const list: object[] = Object.values(pages).map((item: { path: string, name: string }) => {
// 	return { path: item.path, name: item.name };
// });

// for (const page in pages) {
// 	const { render, path } = pages[page];
// 	router.add(path, () => {
// 		root.innerHTML = render();
// 	});
// }

// // TODO: Временная заглушка для разводящей страницы;
// router.add('', () => root.innerHTML = SpreadPage({ list }));
