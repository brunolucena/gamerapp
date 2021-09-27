import formatDateTime from './formatDateTime';

test('it should correctly format a number to currency', () => {
  expect(formatDateTime(new Date(2020, 10, 16, 5, 20))).toStrictEqual<string>(
    '16/11/2020 05:20',
  );
  expect(formatDateTime(new Date(1992, 1, 24, 15, 2))).toStrictEqual<string>(
    '24/02/1992 15:02',
  );
});
