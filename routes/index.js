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

function splita(arg){
  if (arg !== undefined) {
    let data = arg.replace(/([-.() ])/g,'');
    return data;
  }
}

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

function testaUsernameEEscola(req, res) {
  ProjetoSchema.find('username nomeEscola','username nomeEscola -_id', (error, escolas) => {
    if(error) {
      return res.status(400).send({msg:"error occurred"});
    } else
    return res.status(200).send(escolas);
  });
}

function testaUsername2(req, res, next) {
  let query2 = req.body.email
  ,   query = new RegExp(["^", query2, "$"].join(""), "i");

  ProjetoSchema.find({'username':query},'username -_id', (error, usernames) => {
    if(error) {
      return res.status(400).send({msg:"error occurred"});
    } else if(usernames != 0) {
      res.status(202).send("Username já cadastrado");
    } else {
      res.status(200).send("show");
      return next();
    }
  });
}

router.post('/contato', (req, res) => {
  let email = req.body.email
  ,   nome = req.body.nome
  ,   assunto = req.body.assunto
  ,   mensagem = req.body.mensagem;

  const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth: {
      user: "contato@movaci.com.br",
      pass: "mvc2016"
    }
  }));

  var mailOptions = {
    from: 'contato@movaci.com.br',
    to: 'contato@movaci.com.br',
    subject: assunto,
    text: '',
    html: '<b> Contato via site:</b><br><b>De: </b>'+nome+' '+email+'<br><b>Assunto: </b>'+assunto+'<br><b>Mensagem: </b>'+mensagem
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    } else {
      res.send('success');
    }
    console.log('Message sent: ' + info.response);
  });
});

router.get('/registroProjeto', testaUsernameEEscola, (req, res) => {});

router.post('/registro', testaUsername2, (req, res) => {
  let  username = req.body.username
  ,   password = req.body.password
  ,   password2 = req.body.password2

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  let errors = req.validationErrors();

  if(errors){
    //res.status(501).send('error');
    console.log("Errors: "+errors);
  } else {
    let newIntegrante = ({
    tipo: "Orientador",
    nome: req.body.nomeOrientador1,
    email: req.body.emailOrientador1,
    cpf: splita(req.body.cpfOrientador1),
    telefone: splita(req.body.telefoneOrientador1),
    tamCamiseta: req.body.tamCamisetaOrientador1
  });

  let newIntegrante2 = ({
    tipo: "Orientador",
    nome: req.body.nomeOrientador2,
    email: req.body.emailOrientador2,
    cpf: splita(req.body.cpfOrientador2),
    telefone: splita(req.body.telefoneOrientador2),
    tamCamiseta: req.body.tamCamisetaOrientador2
  });

  let newIntegrante3 = ({
    tipo: "Aluno",
    nome: req.body.nomeAluno1,
    email: req.body.emailAluno1,
    cpf: splita(req.body.cpfAluno1),
    telefone: splita(req.body.telefoneAluno1),
    tamCamiseta: req.body.tamCamisetaAluno1
  });

  let newIntegrante4 = ({
    tipo: "Aluno",
    nome: req.body.nomeAluno2,
    email: req.body.emailAluno2,
    cpf: splita(req.body.cpfAluno2),
    telefone: splita(req.body.telefoneAluno2),
    tamCamiseta: req.body.tamCamisetaAluno2
  });

  let newIntegrante5 = ({
    tipo: "Aluno",
    nome: req.body.nomeAluno3,
    email: req.body.emailAluno3,
    cpf: splita(req.body.cpfAluno3),
    telefone: splita(req.body.telefoneAluno3),
    tamCamiseta: req.body.tamCamisetaAluno3
  });

  let newProject = new ProjetoSchema({
    nomeProjeto: req.body.nomeProjeto,
    categoria: req.body.categoria,
    eixo: req.body.eixo,
    nomeEscola: req.body.nomeEscola,
    cep: splita(req.body.cep),
    cidade: req.body.cidade,
    estado: req.body.estado,
    hospedagem: req.body.hospedagem,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    permissao: 1,
    createdAt: Date.now(),
    resumo: req.body.resumo,
    palavraChave: req.body.palavraChave
  });

  newProject.integrantes.push(newIntegrante);

  if(req.body.nomeOrientador2 && req.body.emailOrientador2 && req.body.cpfOrientador2 && req.body.telefoneOrientador2 && req.body.tamCamisetaOrientador2){
    newProject.integrantes.push(newIntegrante2);
  }

  newProject.integrantes.push(newIntegrante3);

  if(req.body.nomeAluno2 && req.body.emailAluno2 && req.body.cpfAluno2 && req.body.telefoneAluno2 && req.body.tamCamisetaAluno2){
    newProject.integrantes.push(newIntegrante4);
  }

  if(req.body.nomeAluno3 && req.body.emailAluno3 && req.body.cpfAluno3 && req.body.telefoneAluno3 && req.body.tamCamisetaAluno3){
    newProject.integrantes.push(newIntegrante5);
  }

  Projeto.createProject(newProject);

  let email = req.body.email
  let nomeProjeto = req.body.nomeProjeto
  let username = req.body.username
  var templatesDir = path.resolve(__dirname, '..', 'templates');
  var template = new EmailTemplate(path.join(templatesDir, 'inscricao'));
  const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth: {
      user: "contato@movaci.com.br",
      pass: "mvc2016"
    }
  }));

  var locals = {
    email: email,
    projeto: nomeProjeto,
    username: username
  }

  template.render(locals, function (err, results) {
    if (err) throw err;
    transport.sendMail({
      from: 'V MOVACI <contato@movaci.com.br>',
      to: locals.email,
      subject: 'V MOVACI - Confirmação de inscrição',
      html: results.html,
      text: results.text
    }, function (err, responseStatus) {
      if (err) throw err;
    })
  });
  // res.redirect('/projetos/login');
  }
  //res.send('OK');
});

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

passport.serializeUser(function(user, done){ done(null, user.id) });

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

router.post('/login', passport.authenticate('unico'), (req, res) => {
  // res.send(req.session);
  if (req.user.permissao === "1") {
    // res.redirect('/projetos/');
    res.send({redirect:'/projetos'});
  } else if (req.user.permissao === "2") {
    // res.redirect('/admin/');
    res.send({redirect:'/admin'});
  }
  //res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});

router.post('/logout', (req, res) => {
  req.logout();
  //res.sendStatus(200);
  //res.clearCookie('userid');
  res.redirect('/');
});

router.post('/redefinir-senha', (req, res) => {
  let username = req.body.username;
  console.log(username);
  crypto.randomBytes(20, (err, buf) => {
    let token = buf.toString('hex');

    ProjetoSchema.findOneAndUpdate({username: username}, {$set:{resetPasswordToken:token, resetPasswordCreatedDate:Date.now() + 3600000}}, {upsert:true, new: true}, function(err, doc){
      if(err){
        console.log("Something wrong when updating data!");
      } else{
        let email = doc.email;
        let nome_projeto = doc.nomeProjeto;
        let url = "http://www.movaci.com.br/nova-senha/"+token;
        // let url = "http://www.movaci.com.br/nova-senha/"+username+"/"+token;

        // res.sendStatus(200);
        res.send(url);

        var templatesDir = path.resolve(__dirname, '..', 'templates')
        var template = new EmailTemplate(path.join(templatesDir, 'redefinicao'))
        // Prepare nodemailer transport object
        const transport = nodemailer.createTransport(smtpTransport({
          host: 'smtp.zoho.com',
          port: 587,
          auth: {
            user: "contato@movaci.com.br",
            pass: "mvc2016"
          }
        }));

        var locals = {
          email: email,
          projeto: nome_projeto,
          url: url,
        }

        template.render(locals, function (err, results) {
          if (err) {
            return console.error(err)
          }

          transport.sendMail({
            from: 'V MOVACI <contato@movaci.com.br>',
            to: locals.email,
            subject: 'V MOVACI - Redefinição de senha',
            html: results.html,
            text: results.text
          }, function (err, responseStatus) {
            if (err) {
              return console.error(err)
            }
            console.log(responseStatus.message)
          })
        });
      }
    });
  });
});

router.post('/nova-senha/:token', (req, res) => {
  if(req.params.token === '') {
    res.status(400).send("erro");
    //console.log('err');
  } else {
    ProjetoSchema.findOne({resetPasswordToken: (req.params.token)}, (err, usr) => {
      if(err || !usr) {
        res.status(400).send("erro2");
      } else if(usr.resetPasswordToken == req.params.token && !usr.hasExpired()) {
        usr.resetPasswordToken = undefined;
        usr.resetPasswordCreatedDate = undefined;
        let password = req.body.password;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            usr.password = hash;
            usr.save((err, usr) => {
              if(err) throw err;
              //console.log(usr);
              res.status(200).send('Senha alterada');
            });
          });
        });
      } else {
        res.status(400).send("erro3");
      }
    });
  };
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
