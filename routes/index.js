
const router = require("express").Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message: "hello world!"});
});

module.exports = router;
