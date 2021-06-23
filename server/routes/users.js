var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var name = "dickman";
  res.json({message: 'Hello ' + name});
});

module.exports = router;
