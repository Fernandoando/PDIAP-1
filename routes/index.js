const express = require('express')
,	router = express.Router()
,	path = require('path');

//GET na homepage (/).
router.all('/', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/home/*', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/home', function(req, res, next) {
  res.render('layout.ejs');
});

router.get('/projetos/*', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/saberes-docentes/*', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/avaliadores/*', function(req, res, next) {
  res.render('layout.ejs');
});

router.get('/nova-senha/*', function(req, res, next) {
  res.render('layout.ejs');
});


// router.all('/redefinir-senha', function(req, res, next) {
//   res.render('layout.ejs');
// });

module.exports = router;
