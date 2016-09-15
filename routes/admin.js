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

router.get('/loggedin', ensureAuthenticated, (req, res) => {
  res.send('success');
});

router.get('/projetos', ensureAuthenticated, (req, res) => {
  projetoSchema.find((err, usr) => {
  	if (err) throw err;
  	res.send(usr);
  });
});

router.post('/avaliador', ensureAuthenticated, (req, res) => {
  avaliadorSchema.find((err, usr) => {
    if (err) throw err;
    res.send(usr);
  });
});

router.post('/saberes', ensureAuthenticated, (req, res) => {
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

router.put('/upgreice2', ensureAuthenticated, (req, res) => {

  let myArray = req.body

  for (var i = 0; i < myArray.length; i++) {
    let id_doc = myArray[i];
    projetoSchema.findOneAndUpdate({"_id": id_doc},
    {"$unset": {"aprovado": true}}, {new:true},
    (err, doc) => {
      if (err) throw err;
    });
  }
  res.send('success');
});

router.post('/aprovadosemail', (req, res) => {
  var templatesDir = path.resolve(__dirname, '..', 'templates');
  var emailTemplates = require('email-templates');
  //var template = new EmailTemplate(path.join(templatesDir, 'redefinicao'));
  // Prepare nodemailer transport object

  emailTemplates(templatesDir, function(err, template) {

    if (err) {
      console.log(err);
    } else {

      var users = [];

      projetoSchema.find({ 'aprovado': true }, function (err, docs) {
        if (err) throw err;
        //console.log(docs);
        docs.forEach(function(usr) {
          let url = "https://www.movaci.com.br/projetos/confirma/"+usr._id+"/2456";
          let url2 = "https://www.movaci.com.br/projetos/confirma/"+usr._id+"/9877";
          users.push({'email': usr.email, 'projeto': usr.nomeProjeto, 'url': url, 'url2': url2});
        });
        for (var i = 0; i < users.length; i++) {
          console.log(users[i]);
        }

      const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.zoho.com',
        port: 587,
        auth: {
          user: "contato@movaci.com.br",
          pass: "mvc2016"
    }
  }));

      var Render = function(locals) {
        this.locals = locals;
        this.send = function(err, html, text) {
          if (err) {
            console.log(err);
          } else {
            transporter.sendMail({
            from: 'contato@movaci.com.br',
            to: locals.email,
            subject: 'MOVACI 2016 - Projeto aprovado!',
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err);
            } else {
              console.log(responseStatus.message);
            }
          });
          }
        };
        this.batch = function(batch) {
          batch(this.locals, templatesDir, this.send);
        };
      };

    // Load the template and send the emails
    template('confirmacao_sim', true, function(err, batch) {
        for(var user in users) {
          var render = new Render(users[user]);
          render.batch(batch);
        };
      });
      res.send('ok');
    });
};
});
});

/*router.post('/aprovados', (req, res) => {
  console.log(req.body.username);
  const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth: {
      user: "contato@movaci.com.br",
      pass: "*mvc2016"
    }
  }));

  let maillist = [];

  projetoSchema.find({"aprovado": true}).exec(function(err, users) {
    if (err) throw err;
    users.forEach(function(usr) {
      maillist.push(usr.email);
      console.log(maillist);
    });
  });

  maillist.toString();

  /*var mailOptions = {
    from: 'contato@movaci.com.br',
    to: maillist,
    subject: 'Teste aprovados',
    text: '',
    html: '<b> Teste:</b><br><b>De: </b>'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    } else {
      res.send('success');
    }
    console.log('Message sent: ' + info.response);
  });*/


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

/*router.post('/pdf2', (req, res) =>{

  var pdf = require('pdfkit');
  var fs = require('fs');
  var myDoc = new pdf;

  myDoc.pipe(fs.createWriteStream('aprovados.pdf'));

  // myDoc
  //     .image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
  //     .fontSize(20)
  //     .moveDown(5)
  //     .text("V Mostra Venâncio-airense de Cultura e Inovação", {align: 'center'})
  //     .fontSize(16)
  //     .moveDown(5)
  //     .text("Projetos selecionados", {align: 'center'})
  //     .fontSize(12)
  //     .moveDown(2.5)
  //     .text("FUNDAMENTAL I (1° ao 5° ano)", {align: 'center'})

  projetoSchema.find({"aprovado":true,"categoria":"Fundamental I (1º ao 5º anos)"}).sort({"eixo":1, "numInscricao":1}).exec(function(err, users) {
    if (err) throw err;
    myDoc
    .image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
    .fontSize(20)
    .moveDown(5)
    .text("V Mostra Venâncio-airense de Cultura e Inovação", {align: 'center'})
    .fontSize(16)
    .moveDown(5)
    .text("Projetos selecionados", {align: 'center'})
    .fontSize(14)
    .moveDown(2.5)
    .text("FUNDAMENTAL I (1° ao 5° ano)", {align: 'center'})
    .moveDown(1)

    var echu = "";

    users.forEach(function(usr){

      myDoc.moveDown(1)
      //.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })

      if (usr.eixo !== echu) {
        echu = usr.eixo;
        myDoc.fontSize(14)
        .text("Eixo: "+usr.eixo, {align: 'center'})
      }

      myDoc.fontSize(12)
      .moveDown(1)
      .text("Projeto: "+usr.nomeProjeto)
      .moveDown(0.5)
      // .text("Orientador(es): ");

      if (usr.integrantes[0].tipo === "Orientador"){
        myDoc.text("Orientador: "+usr.integrantes[0].nome);
      }
      if (usr.integrantes[1].tipo === "Orientador"){
        myDoc.moveDown(0.5)
        .text("Orientador: "+usr.integrantes[1].nome);
      }
    });

    projetoSchema.find({"aprovado":true,"categoria":"Fundamental II (6º ao 9º anos)"}).sort({"eixo":1, "numInscricao":1}).exec(function(err, users) {
      if (err) throw err;
      myDoc.addPage()
      .image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
      .moveDown(5)
      .text("FUNDAMENTAL II (6° ao 9° ano)", {align: 'center'})
      .moveDown(1)

      users.forEach(function(usr){

      myDoc.moveDown(1.5)
      //.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })

      if (usr.eixo !== echu) {
        echu = usr.eixo;
        myDoc.fontSize(14)
        .text("Eixo: "+usr.eixo, {align: 'center'})
      }


      //.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
      myDoc.fontSize(12)
      .moveDown(1)
      .text("Projeto: "+usr.nomeProjeto)
      .moveDown(0.5)
      // .text("Eixo: "+usr.eixo)
      // .moveDown(0.5)
      // .text("Orientador(es): ");

      if (usr.integrantes[0].tipo === "Orientador"){
        myDoc.text("Orientador: "+usr.integrantes[0].nome);
      }
      if (usr.integrantes[1].tipo === "Orientador"){
        myDoc.moveDown(0.5)
        .text("Orientador: "+usr.integrantes[1].nome);
      }
    });

      projetoSchema.find({"aprovado":true, "categoria":"Ensino Médio, Técnico e Superior"}).sort({"eixo":1, "numInscricao":1}).exec(function(err, users) {
        if (err) throw err;
        myDoc.addPage()
        .image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
        .moveDown(5)
        .text("ENSINO MÉDIO, TÉNICO E SUPERIOR", {align: 'center'})
        .moveDown(1)

        users.forEach(function(usr){

      myDoc.moveDown(1.5)
      //.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })

      if (usr.eixo !== echu) {
        echu = usr.eixo;
        myDoc.fontSize(14)
        .text("Eixo: "+usr.eixo, {align: 'center'})
      }


      //.image('public/assets/images/logo.png',70, 55, { fit: [200,350] })
      myDoc.fontSize(12)
      .moveDown(1)
      .text("Projeto: "+usr.nomeProjeto)
      .moveDown(0.5)
      // .text("Eixo: "+usr.eixo)
      // .moveDown(0.5)
      // .text("Orientador(es): ");

      if (usr.integrantes[0].tipo === "Orientador"){
        myDoc.text("Orientador: "+usr.integrantes[0].nome);
      }
      if (usr.integrantes[1].tipo === "Orientador"){
        myDoc.moveDown(0.5)
        .text("Orientador: "+usr.integrantes[1].nome);
      }
    });
        res.sendStatus(200);
        myDoc.end();
      });
    });
  });
});*/

module.exports = router;
