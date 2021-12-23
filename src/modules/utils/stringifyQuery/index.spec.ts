import { expect } from 'chai';
import stringifyQuery from './index';

describe('Утилиты. stringifyQuery —', () => {
  it('Возвращает строку, если на вход строка', () => {
    const data = 'string';
    expect(stringifyQuery(data)).to.equal(data);
  });

  it('Возвращает корректную строку, если на вход объект', () => {
    const data = {
      key: 1,
      key2: 'test',
      key3: false,
      key4: true,
      key5: [1, 2, 3],
      key6: { a: 1 },
      key7: { b: { d: 2 } },
    };
    const result = 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2';
    expect(stringifyQuery(data)).to.deep.equal(result);
  });
});
