import Router from '../router';
import EventBus from '../event-bus';

export default class BaseController {
  eventBus: EventBus;
  router: Router;
  constructor() {
    this.eventBus = new EventBus();
    this.router = new Router();
  }

  throwError(title: string, response) {
    const { data, status } = response;
    throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
  }
}

