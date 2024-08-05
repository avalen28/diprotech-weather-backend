const router = require("express").Router();

/* GET location info. */
router.get("/", function (req, res, next) {

  res.send({ message: "hello"});
});

module.exports = router;
