import Route from './route';

function createRouter() {

  enum ADDRESSES {
    ERROR = '/error-404',
    AUTH = '/sign-in',
    MAIN = '/'
  }

  const routes: Route[] = [];
  const history = window.history;
  const rootQuery = '#app';
  let getAuthorizationStatus = () => false;
  let currentRoute: undefined | Route = undefined;

  const replaceRoute = (pathname: string) => {
    history.replaceState({}, '', pathname);
    currentRoute = getRoute(pathname);
    currentRoute?.render();
  }

  const onRoute = (pathname: string) => {
    const route = getRoute(pathname);

    if (currentRoute && currentRoute !== route) {
      currentRoute.leave();
    }

    if (currentRoute === route) {
      return;
    }

    const authorizationStatus = getAuthorizationStatus();

    // TODO: Узнать что уместнее — редирект или рендер с сохранением адреса
    // TODO: Перехват возвращения на несуществующую страницу
    // TODO: Перехват возвращения на пункт в истории браузера
    if (!route) {
      replaceRoute(ADDRESSES.ERROR);
    } else if (route.isPrivate && !authorizationStatus) {
      replaceRoute(ADDRESSES.AUTH);
    } else if (route.isNotForAuthorized && authorizationStatus) {
      replaceRoute(ADDRESSES.MAIN);
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

  // TODO: Костыль с передачей метода уточнения статуса авторизации
  const start = async function (authorizationStatusGetter?: () => boolean) {
    const root = document.querySelector(rootQuery);
    getAuthorizationStatus = authorizationStatusGetter || getAuthorizationStatus;

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
    history.pushState({}, '', pathname);
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
