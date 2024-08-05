const router = require("express").Router();
const { areValidCoordinates } = require("../utils/location");

/* GET weather data*/
router.get("/:lat/:long", function (req, res) {
  const { lat, long } = req.params;
  if (!areValidCoordinates(lat, long)) {
    res.send({ message: "invalid coordinates" });
    return
  }
  res.send({ checkCoordinates });
});

module.exports = router;
