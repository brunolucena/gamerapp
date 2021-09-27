import {formatCurrency} from './formatCurrency';

test('it should correctly format a number to currency', () => {
  expect(formatCurrency(null)).toStrictEqual<string>('');
  expect(formatCurrency(1000)).toStrictEqual<string>('R$ 1.000,00');
  expect(formatCurrency(50.99)).toStrictEqual<string>('R$ 50,99');
  expect(formatCurrency(30.9849489)).toStrictEqual<string>('R$ 30,98');
  expect(formatCurrency(30.9859489)).toStrictEqual<string>('R$ 30,99');
});
