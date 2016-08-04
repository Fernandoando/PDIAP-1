const express = require('express')
,	router = express.Router();

//GET na homepage (/).
router.all('/', function(req, res) {
  res.render('layout');
});

module.exports = router;
