/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import Block from './index';

describe('Модуль Block.', () => {
  let clickCounter = 0;
  let antoherClickCounter = 0;

  const tagName = 'article';
  const attributes = {
    id: 'id',
    class: 'class',
    'data-id': 'data-id',
  };
  const events = [{
    type: 'click',
    cb: () => { clickCounter += 1; },
  }];
  const props = { attributes, foo: 'bar', events };
  const children = {};
  const selectors = { data: 'mockData' };
  const block = new Block(tagName, props, children, selectors);
  const element = block.getContent();

  describe('Генерация обёртки:', () => {
    it('Корректный тег', () => {
      expect(element.tagName.toLowerCase()).to.equal(tagName);
    });

    it('Присвоение атрибутов', () => {
      expect(element).to.have.property('id');
      expect(element).to.have.property('className');
      expect(element.dataset).to.have.property('id');
    });
  });

  describe('Работа с пропсами:', () => {
    it('Наличие пропса', () => {
      expect(block.props).to.have.property('foo');
      expect(block.props.foo).to.equal('bar');
    });

    it('Перезапись пропса', () => {
      block.setProps({ foo: 1 });
      expect(block.props.foo).to.equal(1);
    });

    it('Наличие пропса из селектора', () => {
      expect(block.props).to.have.property('data');
      expect(block.props.data).to.equal('data');
    });
  });

  describe('Работа с событиями:', () => {
    it('Срабатывание слушателей', () => {
      element.click();
      expect(clickCounter).to.equal(1);
    });

    it('Перезапись слушателей', () => {
      const anotherEvents = [{
        type: 'click',
        cb: () => { antoherClickCounter += 1; },
      }];
      block.setProps({ events: anotherEvents });
      element.click();
      expect(antoherClickCounter).to.equal(1);
    });

    it('Отсутствие срабатывания перезаписанных слушателей', () => {
      expect(clickCounter).to.equal(1);
    });
  });

  // TODO: Доп. тесты Block
  // Проверка на значения атрибутов
  // Проверка генерации шаблонов
  // Проверка render
  // Асинхронные тесты для добавления пропсов
  // Проверка генерации дочерних элементов
});
