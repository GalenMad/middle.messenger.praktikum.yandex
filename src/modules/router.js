import Route from './route';

const ERROR_ADDRESS = '/error-404';

export default class Router {
  constructor(rootQuery) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block, props) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, ...props });
    this.routes.push(route);
    return this;
  }

  start() {

    document.querySelector(this._rootQuery).addEventListener('click', (evt) => {
      const link = evt.path.find(elem => elem.tagName === 'A' && elem.href)
      if (link) {
        const pathname = link.getAttribute('href');
        this.go(pathname);
        evt.preventDefault();
      }
    });

    window.addEventListener('popstate', (evt) => {
      console.log('popstate');
      this._onRoute(evt.currentTarget.location.pathname);
    })
    this._onRoute(window.location.pathname);
    return this;
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    } else {
      const errorPage = this.getRoute(ERROR_ADDRESS);
      this._currentRoute = errorPage;
      errorPage.render();
    }
  }

  go(pathname) {
    this.history.pushState({a:2}, "", pathname);
    this._onRoute(pathname);
  }

  back(number = 1) {
    this.history.back(number);
  }

  forward(number = 1) {
    this.history.forward(number);
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}
