import {BaseErrorResponse} from 'src/Models/Login';

export type DatePart = 'w' | 'd' | 'h' | 'n' | 's';

export const dateDiff = (
  datepart: DatePart,
  fromdate: Date,
  todate: Date,
): number => {
  // @ts-ignore
  const diff = todate - fromdate;
  const divideBy = {w: 604800000, d: 86400000, h: 3600000, n: 60000, s: 1000};

  return Math.floor(diff / divideBy[datepart]);
};

export function findErrorMessage(
  payload: BaseErrorResponse | any,
  fallbackMessage: string,
): string {
  if (!payload) {
    return fallbackMessage;
  }

  const {errors} = payload;

  if (!!errors) {
    if (errors.length > 0) {
      const firstError = errors[0];

      if (typeof firstError === 'string') {
        return firstError;
      } else if (!!firstError.message) {
        return firstError.message;
      }
    }
  }

  return fallbackMessage;
}

export function roundTo2(n: number, digits: number): string {
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

  return (Math.round(n * 100) / 100).toFixed(2);
}

/**
 * Retorna a altura na proporção 16x9.
 */
export function getHeightProportion(width: number): number {
  return (width / 16) * 9;
}

/**
 * Pega um base64 e retorna formatado.
 * Ex: "data:image/jpeg;base64,{imageBase64}"
 */
export function getBase64FormatedString(base64: string): string {
  return `data:image/jpeg;base64,${base64}`;
}
