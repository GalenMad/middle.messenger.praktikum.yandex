import Router from '../router';
import EventBus from '../event-bus';

interface errorData {
  status: string | number,
  data: { reason?: string }
}

export default class BaseController {
  eventBus: EventBus;
  router: Router;
  constructor() {
    this.eventBus = EventBus;
    this.router = new Router();
  }

  throwError(title: string, response: errorData) {
    const { data, status } = response;
    throw new Error(`\n ref: ${title} \n status: ${status} \n reson: ${data.reason || data}`);
  }
}

