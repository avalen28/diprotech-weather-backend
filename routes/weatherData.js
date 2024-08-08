const router = require("express").Router();
const { default: axios } = require("axios");
const { LocationService } = require("../utils/location");
const { storeData } = require("../utils/storage");


/**
 * GET weather data.
 * @name get/weather-data
 * @function
 * @description Function that obtains parameters from the endpoint (longitude and latitude) and returns both the weather forecast and nearby cities.
 * @param {string} req.params.long - The longitude of the location.
 * @param {string} req.params.lat - The latitude of the location.
 * @returns {Object} The weather data for the requested location and nearby cities.
 * @throws {Error} 500 - There was an error connecting to OpenWeather API.
 * @throws {Error} 400 - Bad request: invalid coordinates.
 */
router.get("/:long/:lat", async function (req, res) {
  const { long, lat } = req.params;
  const locationService = new LocationService(long, lat);

  if (!locationService.areValidCoordinates()) {
    res.status(400).json({ message: "Bad request: invalid coordinates" });
    return;
  }

  const [currentCity, ...nearbyCities] =
    locationService.findNearbyLocations(11);

  try {
    const url = locationService.getUrl(currentCity);
    const weatherDataFromAPI = await axios.get(url);
    storeData(weatherDataFromAPI.data);

    res.status(200).json({ weatherData: weatherDataFromAPI.data, nearbyCities });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error connecting to OpenWeather API" });
  }
});

module.exports = router;
