import Route from './route';

const ERROR_ADDRESS = '/error-404';

class Router {
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
    window.onpopstate = (event => this._onRoute(event.currentTarget.location.pathname)).bind(this);
    this._onRoute(window.location.pathname);
    return this;
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
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
    this.history.pushState({}, "", pathname);
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

export default Router;
