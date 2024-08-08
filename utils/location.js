const locationsData = require("../data/locations_ES.json");
const turf = require("@turf/turf");

/**
 * Service for handling location-based operations.
 */

class LocationService {
  /**
   * Constructs a LocationService instance.
   * @param {number} long - The longitude of the location.
   * @param {number} lat - The latitude of the location.
   * @property {Array<number>} coordinates - The [longitude, latitude] pair for the location.
   */
  constructor(long, lat) {
    this.long = long;
    this.lat = lat;
    this.coordinates = [this.long, this.lat];
  }

  /**
   * Checks if the provided coordinates are valid.
   * @returns {boolean} True if the coordinates are valid, otherwise false.
   */
  areValidCoordinates = () =>
    this.isValidLongitude(this.long) && this.isValidLatitude(this.lat);

  /**
   * Checks if the latitude is valid.
   * @returns {boolean} True if the latitude is valid, otherwise false.
   */
  isValidLatitude = () => !isNaN(this.lat) && this.lat >= -90 && this.lat <= 90;

  /**
   * Checks if the longitude is valid.
   * @returns {boolean} True if the longitude is valid, otherwise false.
   */
  isValidLongitude = () =>
    !isNaN(this.long) && this.long >= -180 && this.long <= 180;

  /**
   * Finds nearby locations based on the given coordinates.
   * @param {number} amount - The number of nearby locations to return.
   * @returns {Array} An array of nearby locations.
   */
  findNearbyLocations = (amount) => {
    return locationsData
      .sort(
        (a, b) =>
          this.calculateDistanceBetweenTwoCities(
            this.coordinates,
            a.location.coordinates
          ) -
          this.calculateDistanceBetweenTwoCities(
            this.coordinates,
            b.location.coordinates
          )
      )
      .slice(0, amount);
  };

  /**
   * Calculates the distance between two cities in kilometers.
   * @param {Array<number>} firstCityCoor - The coordinates of the first city.
   * @param {Array<number>} secondCityCoor - The coordinates of the second city.
   * @returns {number} The distance between the two cities in kilometers.
   */
  calculateDistanceBetweenTwoCities(firstCityCoor, secondCityCoor) {
    const from = turf.point(firstCityCoor);
    const to = turf.point(secondCityCoor);
    const options = { units: "kilometers" };
    return turf.distance(from, to, options);
  }
  /**
   * Constructs a URL for fetching weather data for a given city.
   * @param {Object} currentCity - The city object.
   * @param {Array<number>} currentCity.location.coordinates - The coordinates of the city.
   * @returns {string} The URL to fetch weather data.
   */
  getUrl(currentCity) {
    const [long, lat] = currentCity.location.coordinates;
    return `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=10&appid=${process.env.OPENWEATHER_API_KEY}`;
  }
}

module.exports = { LocationService };
