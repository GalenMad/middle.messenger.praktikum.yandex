export default class EventBus {
  listeners: Record<string, Function[]>;

  constructor() {
    this.listeners = {};
  }

  _checkExistListener(event: string, callback: Function): boolean {
    return this.listeners[event].some((handler) => handler === callback);
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    if (!this._checkExistListener(event, callback)) {
      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: any): void {
    if (this.listeners[event]) {
      // TODO: Тут была ошибка, если такого события нет. Возможно, что это было важно.
      this.listeners[event].forEach((handler: Function) => handler(...args));
    }
  }
}
