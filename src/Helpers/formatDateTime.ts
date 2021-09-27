import formatNumberToTwoDigits from './formatNumberToTwoDigits';

function formatDateTime(date: Date | string): string {
  if (!date) {
    return '';
  }

  try {
    const dateObject = new Date(date);

    let dateTimeString = dateObject.toLocaleTimeString('pt-BR');

    const splitted = dateTimeString.split(':');

    if (splitted.length > 2) {
      splitted.pop();
    }

    return `${formatNumberToTwoDigits(
      dateObject.getDate(),
    )}/${formatNumberToTwoDigits(
      dateObject.getMonth() + 1,
    )}/${dateObject.getFullYear()} ${formatNumberToTwoDigits(
      parseInt(splitted[0]),
    )}:${formatNumberToTwoDigits(parseInt(splitted[1]))}`;
  } catch (e) {
    return '';
  }
}

export default formatDateTime;
