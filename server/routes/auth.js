var express = require('express');
var router = express.Router();

/* Get username & passwod, Return the token */
router.post('/', function(req, res, next) {
  const { username, password } = req.body
  res.json({message: 'Your name is ' + username + '\nThe password is ' + password});
});

module.exports = router;