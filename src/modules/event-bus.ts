function createEventBus() {

  const listeners: Record<string, Function[]> = {};
  const _checkExistListener = (event: string, callback: Function): boolean => listeners[event].some((handler) => handler === callback);

  const methods = {
    on: (event: string, callback: Function): void => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      if (!_checkExistListener(event, callback)) {
        listeners[event].push(callback);
      }
    },

    off: (event: string, callback: Function): void => {
      if (!listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      listeners[event] = listeners[event].filter((listener) => listener !== callback);
    },

    emit: (event: string, ...args: unknown[]): void => {
      if (!listeners[event]) {
        // TODO: Тут была ошибка, если такого события нет. Возможно, что это важно.
        return;
      }

      listeners[event].forEach((handler: Function) => handler(...args));
    }
  }

  return Object.freeze(methods)
}

export default createEventBus();
