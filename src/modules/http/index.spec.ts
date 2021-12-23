/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import cors from 'cors';
import express from 'express';
import { Server } from 'http';
import HTTP, { getJSONFromString, Methods, ErrorStatuses } from './index';

describe('HTTP-модуль.', () => {
  let server: Server;
  before(async () => {
    const app = express();
    app.use(cors());
    server = await app.listen(3002);
    app.get('', (_req, res) => res.json(Methods.GET));
    app.get('/timeout', () => setTimeout(() => false, 3000));
    app.get('/query', (req, res) => res.json(req.query));
    app.post('', (_req, res) => res.json(Methods.POST));
    app.put('', (_req, res) => res.json(Methods.PUT));
    app.delete('', (_req, res) => res.json(Methods.DELETE));
  });

  describe('getJSONFromString —', () => {
    it('Возвращает строку, если на вход строка', () => {
      const data = 'string';
      expect(getJSONFromString(data)).to.equal(data);
    });
    it('Возвращает объект, если на вход JSON', () => {
      const data = { a: 'string', b: 32 };
      const string = JSON.stringify(data);
      expect(getJSONFromString(string)).to.deep.equal(data);
    });
  });

  describe('Отправка запросов —', () => {
    const fetch = new HTTP('', 'http://localhost:3002');

    it('Формат ответа', async () => {
      // TODO: Громоздкая проверка, пофиксить
      const response = await fetch.request('', { method: Methods.POST });
      expect(response).to.have.property('error');
      expect(response).to.have.property('status');
      expect(response).to.have.property('data');
    });

    it(`${Methods.GET}-запрос`, async () => {
      const response = await fetch.get('');
      expect(response.error).to.be.false;
      expect(response.data).to.equal(Methods.GET);
    });

    it(`${Methods.GET}-запрос с параметрами`, async () => {
      const data = {
        key: '1',
        key2: 'test',
        key3: 'false',
        key4: 'true',
        key5: ['1', '2', '3'],
        key6: { a: '1' },
        key7: { b: { d: '2' } },
      };
      const response = await fetch.get('/query', { data });
      expect(response.error).to.be.false;
      expect(response.data).to.eql(data);
    });

    it(`${Methods.POST}-запрос`, async () => {
      const response = await fetch.post('');
      expect(response.error).to.be.false;
      expect(response.data).to.equal(Methods.POST);
    });

    it(`${Methods.PUT}-запрос`, async () => {
      const response = await fetch.put('');
      expect(response.error).to.be.false;
      expect(response.data).to.equal(Methods.PUT);
    });

    it(`${Methods.DELETE}-запрос`, async () => {
      const response = await fetch.delete('');
      expect(response.error).to.be.false;
      expect(response.data).to.equal(Methods.DELETE);
    });

    it('Формат ответа на запрос 404', async () => {
      const response = await fetch.get('/404');
      expect(response.error).to.be.true;
      expect(response.status).to.equal(404);
    });

    it('Формат ответа на таймаут', async () => {
      const response = await fetch.get('/timeout', { timeout: 10 });
      expect(response.error).to.be.true;
      expect(response.status).to.equal(ErrorStatuses.TIMEOUT);
      expect(response.data).to.be.null;
    });
  });

  // TODO: Доп. тесты
  // Проверки на остальные ошибки

  after(() => server.close());
});
