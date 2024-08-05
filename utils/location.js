const areValidCoordinates = (lat, long) =>
  isValidLatitude(lat) && isValidLongitude(long);

const isValidLatitude = (lat) => !isNaN(lat) && lat >= -90 && lat <= 90;

const isValidLongitude = (long) => !isNaN(long) && long >= -180 && long <= 180;

module.exports = { areValidCoordinates };
