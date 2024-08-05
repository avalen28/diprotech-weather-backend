const router = require("express").Router();

/* GET weather data*/
router.get("/:lat/:long", function (req, res) {
  const { lat, long } = req.params;
  res.send({lat,long})
});

module.exports = router;
