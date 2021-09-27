function splitFirstName(name: string): string {
  if (!name) {
    return '';
  }

  const formatted = name
    .split(' ')[0]
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());

  return formatted;
}

export default splitFirstName;
