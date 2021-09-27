import formatNumberToTwoDigits from './formatNumberToTwoDigits';

test('it should correctly format a number to currency', () => {
  expect(formatNumberToTwoDigits(10)).toStrictEqual<string>('10');
  expect(formatNumberToTwoDigits(20)).toStrictEqual<string>('20');
  expect(formatNumberToTwoDigits(1)).toStrictEqual<string>('01');
  expect(formatNumberToTwoDigits(9)).toStrictEqual<string>('09');
});
