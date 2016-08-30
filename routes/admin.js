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

passport.use(new LocalStrategy((username, password, done) => {
  Admin.getAdminByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }
    Admin.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.getAdminById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
  //res.redirect('/home');
  //res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});

router.get('/home', (req, res) => {
  //res.send(req.user);
  projetoSchema.find((err, usr) => {
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

  myArray.forEach(function (value, i) {
    //console.log('%d: %s', i);

    if (value._id !== undefined) {
      let id_doc = value._id
      ProjetoSchema.findOneAndUpdate({"_id": id_doc},
      {"$set": {"aprovado": true, updatedAt: Date.now()}}, {new:true},
      (err, doc) => {
        if (err) throw err;
      }
      );
    }
  });
  res.redirect('/home/update');
});

module.exports = router;
/*router.get('/pdf', (req, res) =>{
	
	var pdf = require('pdfkit');
	var fs = require('fs');
	
	projetoSchema.find((err, users) => {
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
