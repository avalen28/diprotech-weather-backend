const router = require("express").Router();
const { default: axios } = require("axios");
const { LocationService } = require("../utils/location");

/* GET weather data*/
router.get("/:long/:lat", async function (req, res) {
  const { long, lat } = req.params;
  const locationService = new LocationService(long, lat);

  if (!locationService.areValidCoordinates()) {
    res.send({ message: "invalid coordinates" });
    return;
  }

  const [currentCity, ...nearbyCities] =
    locationService.findNearbyLocations(11);

  try {
    const url = locationService.getUrl(currentCity);
    const weatherDataFromAPI = await axios.get(url);
    res.send({ weatherData: weatherDataFromAPI, nearbyCities });
  } catch (error) {
    console.error(error);
    res.send({ message: "error" });
  }
});

module.exports = router;
