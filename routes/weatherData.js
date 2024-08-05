const router = require("express").Router();
const { LocationValidator } = require("../utils/location");

/* GET weather data*/
router.get("/:long/:lat", function (req, res) {
  const { long, lat } = req.params;
  const locationValidator = new LocationValidator(long, lat);
  if (!locationValidator.areValidCoordinates()) {
    res.send({ message: "invalid coordinates" });
    return;
  }
  const [currentCity, ...nearbyCities] =
    locationValidator.findNearbyLocations(11);
  res.send({ currentCity, nearbyCities });
});

module.exports = router;
