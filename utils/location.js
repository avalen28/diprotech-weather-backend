require("dotenv").config();
const locationsData = require("../data/locations_ES.json");
const turf = require("@turf/turf");

class LocationService {
  baseUrl = "api.openweathermap.org/data/2.5/forecast/daily?";
  constructor(long, lat) {
    this.long = long;
    this.lat = lat;
    this.coordinates = [this.long, this.lat];
  }

  areValidCoordinates = () =>
    this.isValidLongitude(this.long) && this.isValidLatitude(this.lat);

  isValidLatitude = () => !isNaN(this.lat) && this.lat >= -90 && this.lat <= 90;

  isValidLongitude = () =>
    !isNaN(this.long) && this.long >= -180 && this.long <= 180;

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

  calculateDistanceBetweenTwoCities(firstCityCoor, secondCityCoor) {
    const from = turf.point(firstCityCoor);
    const to = turf.point(secondCityCoor);
    const options = { units: "kilometers" };
    return turf.distance(from, to, options);
  }

  getUrl(currentCity) {
    const [long, lat] = currentCity.location.coordinates;
    return (
      this.baseUrl +
      `lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`
    );
  }
}

module.exports = { LocationService };
