import formatDate from './formatDate';

test('it should correctly format a number to currency', () => {
  expect(formatDate(new Date(2020, 10, 16))).toStrictEqual<string>(
    '16/11/2020',
  );
  expect(formatDate(new Date(1992, 1, 24))).toStrictEqual<string>('24/02/1992');
});
