const locationsData = require("../data/locations_ES.json");

class LocationValidator {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  areValidCoordinates = () =>
    this.isValidLatitude(this.lat) && this.isValidLongitude(this.long);

  isValidLatitude = () => !isNaN(this.lat) && this.lat >= -90 && this.lat <= 90;

  isValidLongitude = () =>
    !isNaN(this.long) && this.long >= -180 && this.long <= 180;
}

module.exports = { LocationValidator };
