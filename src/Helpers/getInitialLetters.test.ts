import getInitialLetters from './getInitialLetters';

test('it should correctly format a number to currency', () => {
  expect(getInitialLetters('Bruno Lucena')).toStrictEqual<string>('BL');
  expect(getInitialLetters('Bruno Alves Lucena')).toStrictEqual<string>('BA');
  expect(getInitialLetters('João da Silva')).toStrictEqual<string>('JS');
  expect(getInitialLetters('Cauê')).toStrictEqual<string>('C');
  expect(getInitialLetters('')).toStrictEqual<string>('');
});
