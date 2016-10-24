const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Projeto = require('../controllers/projeto-controller')
, session = require('express-session')
, ProjetoSchema = require('../models/projeto-schema')
, crypto = require('crypto')
, bcrypt = require('bcryptjs')
, Admin = require('../controllers/admin-controller')
, Admin2 = require('../controllers/admin2-controller')
, nodemailer = require('nodemailer')
, adminSchema = require('../models/admin-schema')
, smtpTransport = require('nodemailer-smtp-transport')
, path = require('path')
, EmailTemplate = require('email-templates').EmailTemplate
, wellknown = require('nodemailer-wellknown')
, async = require('async');


passport.use('unico', new LocalStrategy(function(username, password, done) {
      Projeto.getLoginProjeto(username, (err, user) => {
        if(err) throw err;
        if(!user){
          console.log('entrou no !user '+username);
          Projeto.getLoginAdmin(username, (err, user) => {
            console.log('entrou no !user de novo');
            if(err) throw err;
            if(!user){
              console.log('entrou no !user de novo de novo');
              return done(null, false, {message: 'Unknown User'});
            }
            Projeto.compareLogin(password, user.password, (err, isMatch) => {
              console.log('OLHA, deu certo e agora vai comparar: '+password);
              if(err) throw err;
              if(isMatch){
                return done(null, user);
                console.log("Pior que deu");
              } else {
                console.log("Pior que não deu");
                return done(null, false, {message: 'Invalid password'});
              }
            }); 
          });
          // return done(null, false, {message: 'Unknown User'});
        } else {
          Projeto.compareLogin(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
              return done(null, user);
            } else {
              return done(null, false, {message: 'Invalid password'});
            }
          }); 
        }
      });
    }));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

    passport.deserializeUser(function(id, done){
      adminSchema.findById(id, function(err, user){
        if(err) done(err);
        if(user){
          done(null, user);
        } else {
          ProjetoSchema.findById(id, function(err, user){
            if(err) done(err);
            done(null, user);
          })
        }
      });
    });

function miPermiso(role) {
  return function(req, res, next) {
    if(req.user.permissao === role)
      next();
    else res.send(403);
  }
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
  return next();
  else{
    res.send('0');
  }
}

router.post('/login', passport.authenticate('unico'), (req, res) => {
  // res.send(req.session);
  if (req.user.permissao === "1") {
    res.redirect('/projetos/');
  } else if (req.user.permissao === "2") {
    res.redirect('/admin/');
  }
  //res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});

// router.get('/home', ensureAuthenticated, miPermiso("2"), (req, res) => {
//   res.redirect('/admin');
// });

// router.get('/home', ensureAuthenticated, miPermiso("1"), (req, res) => {
//   // res.send(req.user);
//   res.redirect('/projetos');
// });

/*router.post('/login/admin', passport.authenticate('admin'), (req, res) => {
res.send(req.user);
//res.redirect('/home');
//res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});*/

router.post('/logout', (req, res) => {
  req.logout();
  //res.sendStatus(200);
  //res.clearCookie('userid');
  res.redirect('/');
});




//GET na homepage (/).
router.all('/', function(req, res, next) {
  res.render('layout2.ejs');
});

// administração interna ==================================================== //
router.get('/admin', function(req, res, next) {
  res.render('layout_admin.ejs');
});

router.get('/admin/home', function(req, res, next) {
  res.render('layout_admin2.ejs');
});

router.get('/admin/master', function(req, res, next) {
  res.render('layout_master.ejs');
});

router.all('/admin/master/home/*', function(req, res, next) {
  res.render('layout_admin2.ejs');
});

router.all('/admin/master/home', function(req, res, next) {
  res.render('layout_admin2.ejs');
});
// ========================================================================== //

// avaliação ================================================================ //
router.get('/avaliacao/2016', function(req, res, next) {
  res.render('layout_avaliacao.ejs');
});
router.get('/avaliacao/2016/*', function(req, res, next) {
  res.render('layout_avaliacao2.ejs');
});
router.get('/ranking/2016', function(req, res, next) {
  res.render('layout_avaliacao2.ejs');
});
// ========================================================================== //

router.get('/projetos/confirma/*', function(req, res, next) {
  res.render('layout_admin2.ejs');
});

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

// router.all('/home/*', function(req, res, next) {
//   res.render('layout.ejs');
// });

// router.all('/home', function(req, res, next) {
//   res.render('layout.ejs');
// });

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
