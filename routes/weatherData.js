const router = require("express").Router();
const { LocationValidator } = require("../utils/location");

/* GET weather data*/
router.get("/:lat/:long", function (req, res) {
  const { lat, long } = req.params;
  const locationValidator = new LocationValidator(lat,long)
  if (!locationValidator.areValidCoordinates()) {
    res.send({ message: "invalid coordinates" });
    return;
  }
  res.send({ message: "valid" });
});

module.exports = router;
