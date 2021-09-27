function formatNumberToTwoDigits(dayOrMonth: number): string {
  if (dayOrMonth >= 10) {
    return `${dayOrMonth}`;
  } else {
    return `0${dayOrMonth}`;
  }
}

export default formatNumberToTwoDigits;
