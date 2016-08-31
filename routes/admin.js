'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Admin = require('../controllers/admin-controller')
, session = require('express-session')
, adminSchema = require('../models/admin-schema')
, projetoSchema = require('../models/projeto-schema')
, crypto = require('crypto')
, bcrypt = require('bcryptjs')
, nodemailer = require('nodemailer')
, smtpTransport = require('nodemailer-smtp-transport')
, path = require('path')
, EmailTemplate = require('email-templates').EmailTemplate
, wellknown = require('nodemailer-wellknown')
, avaliadorSchema = require('../models/avaliador-schema')
, saberesSchema = require('../models/saberes-schema')
, async = require('async');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  return next();
  } else {
    res.send('0');
  }
}

router.get('/', function(req, res, next) {
  res.render('layout_admin.ejs');
});

router.post('/registro', (req, res) => {
	let newAdmin = new adminSchema({
      username: req.body.username,
      password: req.body.password
    });
    Admin.createAdmin(newAdmin);
    //res.redirect('/admin/login');
	res.send('OK');
});

/*passport.use('admin',new LocalStrategy((username, password, done) => {
  Admin.getAdminByUsername(username, (err, admin) => {
    if(err) throw err;
    if(!admin){
      return done(null, false, {message: 'Unknown admin'});
    }
    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        return done(null, admin);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
}));

passport.serializeUser((sponsor, done) => {
  done(null, sponsor.id);
});

passport.deserializeUser((id, done) => {
  Admin.getAdminById(id, (err, sponsor) => {
    done(err, sponsor);
  });
});
*/
router.post('/login', passport.authenticate('admin'), (req, res) => {
  res.send(req.user);
  //res.redirect('/home');
  //res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});

router.get('/home', ensureAuthenticated, (req, res) => {
  //res.send(req.user);
  projetoSchema.find((err, usr) => {
  	if (err) throw err;
  	res.send(usr);
  });
});

router.get('/avaliador', ensureAuthenticated, (req, res) => {
  avaliadorSchema.find((err, usr) => {
    if (err) throw err;
    res.send(usr);
  });
});

router.get('/saberes', ensureAuthenticated, (req, res) => {
  saberesSchema.find((err, usr) => {
    if (err) throw err;
    res.send(usr);
  });
});

router.post('/logout', (req, res) => {
  req.logout();
  //res.sendStatus(200);
  //res.clearCookie('userid');
  res.redirect('/');
});

router.put('/upgreice', ensureAuthenticated, (req, res) => {

  let myArray = req.body

  for (var i = 0; i < myArray.length; i++) {
    let id_doc = myArray[i];
    projetoSchema.findOneAndUpdate({"_id": id_doc},
    {"$set": {"aprovado": true}}, {new:true},
    (err, doc) => {
      if (err) throw err;
    }
    );
  }
  res.send('success');
});

/*router.get('/pdf', (req, res) =>{

	var pdf = require('pdfkit');
	var fs = require('fs');

	projetoSchema.find().sort({"categoria":1, "eixo":1, "numInscricao":1}).exec(function(err, users) {
  	if (err) throw err;
  	//res.send(usr);
  	var myDoc = new pdf;
  	myDoc.pipe(fs.createWriteStream('output.pdf'));
  	users.forEach(function(usr){

  		myDoc.addPage()
  		.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
  		.fontSize(12)
  		.text("Num. inscrição: "+usr.numInscricao, 410, 70)
  		.fontSize(18)
  		.text("Projeto",70,110)
  		.fontSize(12)
  		.text("Nome do projeto: "+usr.nomeProjeto,70,140)
  		.text("Categoria: "+usr.categoria,70,170)
  		.text("Eixo: "+usr.eixo,70,190)
  		.fontSize(18)
  		.text("Escola",70,220)
  		.fontSize(12)
  		.text("Nome: "+usr.nomeEscola,70,250)
  		.text("Cidade: "+usr.cidade+"     Estado: "+usr.estado,70,270)
  		.fontSize(18)
  		.text("Resumo",70,300)
  		.fontSize(12)
  		.text("Palavras-chave: "+usr.palavraChave,70,320)
  		.text(usr.resumo,70,350, {align: 'justify'})

  		console.log(usr.numInscricao);

	});
	res.sendStatus(200);
	myDoc.end();
  });
});*/

module.exports = router;
