const express = require('express')
,	router = express.Router()
,	path = require('path');

//GET na homepage (/).
router.all('/', function(req, res, next) {
  res.render('layout2.ejs');
});

router.get('/admin', function(req, res, next) {
  res.render('layout_admin.ejs');
});

router.get('/admin/home', function(req, res, next) {
  res.render('layout_admin2.ejs');
});

// router.get('/admin/master', function(req, res, next) {
//   res.render('layout_master.ejs');
// });
//
// router.get('/admin/master/home', function(req, res, next) {
//   res.render('layout_admin2.ejs');
// });

router.get('/projetos/confirma/*', function(req, res, next) {
  res.render('layout_admin2.ejs');
});

// para a hora do evento ==================================================== //
router.get('/admin/saberes-docentes/inscricao', function(req, res, next) {
  res.render('correriaMOVACI.ejs');
});
// ========================================================================== //

// avaliação ================================================================ //
router.get('/avaliacao/2016', function(req, res, next) {
  res.render('layout_avaliacao.ejs');
});
router.get('/avaliacao/2016/*', function(req, res, next) {
  res.render('layout_avaliacao2.ejs');
});
// ========================================================================== //
router.get('/regulamento', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/avaliacao-fundamental', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/avaliacao-medio', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/avaliacao-medio-extensao', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/contato', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/programacao', function(req, res, next) {
  res.render('layout3.ejs');
});

router.get('/categorias-eixos', function(req, res, next) {
  res.render('layout3.ejs');
});

router.all('/home/*', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/home', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/404', function(req, res, next) {
  res.render('layout.ejs');
});

router.get('/projetos/inscricao', function(req, res, next) {
  res.render('layout.ejs');
});

router.get('/saberes-docentes/inscricao', function(req, res, next) {
  res.render('layout.ejs');
});

router.get('/avaliadores/inscricao', function(req, res, next) {
  res.render('layout.ejs');
});

router.all('/nova-senha/*', function(req, res, next) {
  res.render('layout.ejs');
});

// router.all('/redefinir-senha', function(req, res, next) {
//   res.render('layout.ejs');
// });

module.exports = router;
