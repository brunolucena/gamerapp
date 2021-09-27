export default function getInitialLetters(name: string): string {
  const splitted = name.split(' ');

  const first = splitted[0];
  let second = splitted[1];

  if (second === 'da' || second === 'de') {
    second = splitted[2];
  }

  return `${first ? first.split('')[0] : ''}${
    second ? second.split('')[0] : ''
  }`;
}
