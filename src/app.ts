import './scss/styles.scss';
import pages from './pages';
import { SpreadPage } from './pages';
import Router from './modules/router';

const root: HTMLElement | null = document.querySelector('#app');

if (root === null) {
	throw new Error('Не найден root-элемент');
}

// Router нужен, чтобы не плодить лишние html-страниц
const router = new Router({
	mode: 'hash',
	root: '/'
});

const list: object[] = Object.values(pages).map((item: { path: string, name: string }) => {
	return { path: item.path, name: item.name };
});

for (const page in pages) {
	const { render, path } = pages[page];
	router.add(path, () => {
		root.innerHTML = '';
		root.appendChild(render());
	});
}

// TODO: Временная заглушка для разводящей страницы;
router.add('', () => {
	root.innerHTML = '';
	root.appendChild(SpreadPage({ list }));
});
