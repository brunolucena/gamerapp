const getColorByPlatform = (
  platformName: string,
  fallbackColor = '#686868',
) => {
  platformName = platformName.toLowerCase();

  const isNintendo =
    platformName.indexOf('nintendo') > -1 ||
    platformName.indexOf('wii') > -1 ||
    platformName.indexOf('switch') > -1;

  const isPlaystation = platformName.indexOf('playstation') > -1;

  const isXbox =
    platformName.indexOf('xbox') > -1 ||
    platformName.indexOf('x-box') > -1 ||
    platformName.indexOf('x box') > -1;

  if (isNintendo) {
    return '#d72c2c';
  } else if (isPlaystation) {
    return '#2c58d7';
  } else if (isXbox) {
    return '#4e9621';
  }

  return fallbackColor;
};

export default getColorByPlatform;
