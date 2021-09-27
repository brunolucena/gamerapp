function formatDistance(distance?: number): string {
  if (!distance || distance === 0) {
    return '';
  }

  const rounded = Math.round((distance + Number.EPSILON) * 100) / 100;

  return `${rounded}km`;
}

export default formatDistance;
