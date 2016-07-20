const express = require('express')
,	router = express.Router();

//GET na homepage (/).
router.get('/', function(req, res) {
  res.render('layout');
});

module.exports = router;
