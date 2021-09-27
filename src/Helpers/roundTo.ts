function roundTo(n: number, digits: number): number {
  let negative = false;

  if (digits === undefined) {
    digits = 0;
  }

  if (n < 0) {
    negative = true;
    n = n * -1;
  }

  const multiplicator = Math.pow(10, digits);

  n = parseFloat((n * multiplicator).toFixed(11));
  n = Number((Math.round(n) / multiplicator).toFixed(2));

  if (negative) {
    n = Number((n * -1).toFixed(2));
  }

  return n;
}

export default roundTo;
