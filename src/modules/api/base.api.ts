export default class BaseAPI {
  create(data?: unknown): Promise<unknown> { throw new Error('Not implemented'); }

  request(data?: unknown): Promise<unknown> { throw new Error('Not implemented'); }

  update(data?: unknown): Promise<unknown> { throw new Error('Not implemented'); }

  delete(data?: unknown): Promise<unknown> { throw new Error('Not implemented'); }
}
