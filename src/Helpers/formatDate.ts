import formatNumberToTwoDigits from './formatNumberToTwoDigits';

function formatDate(date: Date | string): string {
  if (!date) {
    return '';
  }

  const dateObject = new Date(date);

  try {
    return `${formatNumberToTwoDigits(
      dateObject.getDate(),
    )}/${formatNumberToTwoDigits(
      dateObject.getMonth() + 1,
    )}/${dateObject.getFullYear()}`;
  } catch (e) {
    return '';
  }
}

export default formatDate;
