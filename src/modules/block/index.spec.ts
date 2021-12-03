/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import Block from './index';

describe('Родительский класс Block', () => {
  // before
  // Создаю экземпляр класса Block
  // с атрибутами id, class, data-id
  // Навешиваю ивент на клик
  // Применяю селектор 'isAuthorized'
  function createBlock() {
    const tagName = 'div';
    const attributes = {
      id: 'id',
      class: 'class',
      'data-id': 'data-id',
    };
    const props = { attributes };
    const children = {};
    const selectors = {};
    return new Block(tagName, props, children, selectors);
  }

  // Проверка создания обёрточного тега с атрибутами
  // Проверка наличия пропса
  // Проверка изменяемости пропсов
  // Проверка навешивания ивентов
  // Проверка селекторов

  it('Генерация обёрточного элемента', () => {
    const element = createBlock().getContent();
    expect(element).to.have.property('fgd');
    // property(element.id, 'id');
  });

  // Проверка цикла добавления/удаления ивентов
  // Проверка генерации шаблонов
  // Проверка генерации дочерних элементов
});
