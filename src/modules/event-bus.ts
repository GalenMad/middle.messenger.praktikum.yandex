class EventBus {
  listeners: { string?: [] }
  constructor() {
    this.listeners = {};
  }

  _checkExistListener(event, callback) {
    return this.listeners[event].some((handler) => handler === callback);
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    if (!this._checkExistListener(event, callback)) {
      this.listeners[event].push(callback);
    }
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((handler) => handler(...args));
  }
}

export default EventBus;
