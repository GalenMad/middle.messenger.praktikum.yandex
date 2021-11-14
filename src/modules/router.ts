import Route from './route';
import Store from './store';

function createRouter() {

  enum ADDRESSES {
    ERROR = '/error-404',
    AUTH = '/sign-in',
    MAIN = '/'
  }

  const store = new Store();
  const routes: Route[] = [];
  const history = window.history;
  const rootQuery = '#app';
  let currentRoute: null | Route = null;

  const onRoute = (pathname: string) => {
    const route = getRoute(pathname);

    if (currentRoute && currentRoute !== route) {
      currentRoute.leave();
    }

    if (currentRoute === route) {
      return;
    }

    // TODO: Узнать что уместнее — редирект или рендер с сохранением адреса
    if (!route) {
      go(ADDRESSES.ERROR);
    } else if (route.isPrivate && !store.isAuthorized) {
      go(ADDRESSES.AUTH);
    } else if (route.isNotForAuthorized && store.isAuthorized) {
      go(ADDRESSES.MAIN);
    } else {
      currentRoute = route;
      route.render();
    }
  }

  const getRoute = (pathname: string) => {
    return routes.find(route => route.match(pathname));
  }

  const use = (pathname: string, block: unknown, props: {}, options: {}) => {
    const route = new Route(pathname, block, { rootQuery: rootQuery, ...props }, options);
    routes.push(route);
    return this;
  };

  const start = async () => {
    const root = document.querySelector(rootQuery);

    if (!root) {
      throw new Error('Неверный селектор root-элемента')
    }

    root.innerHTML = '';

    root.addEventListener('click', (evt) => {
      const link = evt.path.find((elem: HTMLElement) => elem.tagName === 'A' && elem.href)
      if (link) {
        const pathname = link.getAttribute('href');
        go(pathname);
        evt.preventDefault();
      }
    });

    window.addEventListener('popstate', (evt) => {
      if (evt.currentTarget) {
        onRoute(evt.currentTarget.location.pathname);
      } else {
        throw new Error('Не обнаружен evt.currentTarget');
      }
    });

    onRoute(window.location.pathname);
    return this;
  };

  const go = (pathname: string) => {
    history.pushState({ a: 2 }, '', pathname);
    onRoute(pathname);
  };

  const back = () => history.back();
  const forward = () => history.forward();

  const methods = {
    use,
    start,
    forward,
    back,
    go
  }

  return Object.freeze(methods)
}

export default createRouter();
