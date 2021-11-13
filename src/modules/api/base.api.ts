export default class BaseAPI {
  create(_data?: Record<string, unknown>): unknown { throw new Error('Not implemented'); }

  request(_data?: Record<string, unknown>): unknown { throw new Error('Not implemented'); }

  update(): unknown { throw new Error('Not implemented'); }

  delete(): unknown { throw new Error('Not implemented'); }
}
