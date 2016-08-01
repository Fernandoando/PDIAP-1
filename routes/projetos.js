'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Projeto = require('../controllers/projeto-controller')
, session = require('express-session')
, ProjetoSchema = require('../models/projeto-schema')
, crypto = require('crypto')
, bcrypt = require('bcryptjs')
, nodemailer = require('nodemailer')
, smtpTransport = require('nodemailer-smtp-transport');

function testaEmail(req, res) {
  ProjetoSchema.find('email','email -_id', (error, emails) => {
    if(error) {
      return res.status(400).send({msg:"error occurred"});
    } else
      return res.status(200).send(emails);
  });
}

function testaEmailEEscola(req, res) {
    ProjetoSchema.find('email nomeEscola','email nomeEscola -_id', (error, escolas) => {
    if(error) {
      return res.status(400).send({msg:"error occurred"});
    } else
      return res.status(200).send(escolas);
  });
}

function testaEmail2(req, res, next) {
  let query2 = req.body.email
  ,   query = new RegExp(["^", query2, "$"].join(""), "i");

  ProjetoSchema.find({'email':query},'email -_id', (error, emails) => {
    if(error) {
      return res.status(400).send({msg:"error occurred"});
    } else if(emails != 0) {
      res.status(202).send("Email já cadastrado");
    } else {
      res.status(200).send("show");
      return next();
    }
    });
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else{
    res.send('0');
    res.redirect('/#/');
  }
}

function splita(arg){
  if (arg !== undefined) {
    let data = arg.replace(/([-.()])/g,'');
    return data;
  }
}

router.get('/', (req, res, next) => {
  res.send('Projetos po');
});

router.get('/registro', testaUsernameEEscola, (req, res) => {});

router.get('/login', (req, res) => {
	res.send('página de login');
});

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
      createdAt: Date.now(),
      resumo: req.body.resumo,
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

    let para = req.body.email
    ,   titulo = "MOVACI 2016 - Inscrição realizada com sucessowowowo!"
    ,   texto = "E aí pessoal do projeto" +req.body.nomeProjeto+ ", tudo certo? Inscrição confirmada!"
    ,   html = "<h1>Eae gata vc cadastrou um proujeto.</h1>";

    const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 587,
    auth: {
        user: 'contato@movaci.com.br',
        pass: 'chola viadinho'
      }
    }));

    let mensagem = {
      from: 'contato@movaci.com.br',
      to: para,
      subject: titulo,
      text: texto,
      html: html
    };

    /*transporter.sendMail(mensagem, (err) => {
     if (err) throw err;
     console.log("enviou a msg");
    });*/

		res.redirect('/projetos/login');
	}
  //res.send('OK');
});

// Setando a estatégia do Passport
passport.use(new LocalStrategy((username, password, done) => {
	Projeto.getProjectByUsername(username, (err, user) => {
	  	if(err) throw err;
	   	if(!user){
	   		return done(null, false, {message: 'Unknown User'});
	   	}
   	Projeto.comparePassword(password, user.password, (err, isMatch) => {
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
  Projeto.getProjectById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
    //res.redirect('/projetos/dados');
    //res.cookie('userid', user.id, { maxAge: 2592000000 });  // Expires in one month
});

router.get('/home', ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.send(200);
  //res.clearCookie('userid');
  res.redirect('/#/login');
});

router.get('/update', (req, res) => {
  res.send('Página de update');
});

router.put('/update', ensureAuthenticated, (req, res) => {


  if (req.body.cep !== undefined){
    req.body.cep = splita(req.body.cep);
  }
  let newProject = req.body;
  console.log(newProject);
  /*let newProject = ({
    nomeProjeto: req.body.nomeProjeto,
    categoria: req.body.categoria,
    eixo: req.body.eixo,
    nomeEscola: req.body.nomeEscola,
    cep: splita(req.body.cep),
    cidade: req.body.cidade,
    estado: req.body.estado,
    hospedagem: req.body.hospedagem,
    resumo: req.body.resumo
  });*/

  ProjetoSchema.update({_id:req.user.id}, {$set:newProject, updatedAt: Date.now()}, {upsert:true,new: true}, (err,docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  });

});

router.put('/updateIntegrante', ensureAuthenticated, (req, res) => {

let id2 = req.body.integrantes_id;
let id = req.user.id;

console.log(id2+"     "+id);

  let newIntegrante = ({
    tipo: req.body.tipo,
    nome: req.body.nome,
    email: req.body.email,
    cpf: splita(req.body.cpf),
    telefone: splita(req.body.telefone),
    tamCamiseta: req.body.tamCamiseta,
    _id: id2
  });

  ProjetoSchema.findOneAndUpdate({"_id": id,"integrantes._id": id2},
    {"$set": {"integrantes.$": newIntegrante, updatedAt: Date.now()}}, {new:true},
    (err,doc) => {
      if (err) throw err;
      res.send(doc);
    }
  );
});

router.put('/novoIntegrante', ensureAuthenticated, (req, res) => {

let newIntegrante = ({
    tipo: req.body.tipo,
    nome: req.body.nome,
    email: req.body.email,
    cpf: splita(req.body.cpf),
    telefone: splita(req.body.telefone),
    tamCamiseta: req.body.tamCamiseta
  });

    ProjetoSchema.findOne({_id: req.user.id}, (err, usr) => {
      if (err) throw err;
      usr.integrantes.push(newIntegrante);
      usr.save((err, usr) => {
        if (err) throw err;
      });
    });


    ProjetoSchema.update({_id:req.user.id}, {$set: {updatedAt: Date.now()}}, {upsert:true,new: true}, (err,docs) => {
      if (err) throw err;
      res.status(200).json(docs);
    });

});

router.put('/removerIntegrante', ensureAuthenticated, (req, res) => {
  let id = req.body.integrantes_id;

  ProjetoSchema.findOne({"integrantes._id": id}, (err, usr) => {
    if (err) throw err;
    usr.integrantes.id(id).remove()
    usr.save((err, usr) => {
    if (err) throw err;
    });
  });


    ProjetoSchema.update({_id:req.user.id}, {$set: {updatedAt: Date.now()}}, {upsert:true,new: true}, (err,docs) => {
      if (err) throw err;
      res.status(200).json(docs);
    });



});

router.post('/redefinir-senha', (req, res) => {
  let username = req.body.username;
  crypto.randomBytes(20, (err, buf) => {
    let token = buf.toString('hex');
    console.log(token);

    ProjetoSchema.findOneAndUpdate({username: username}, {$set:{resetPasswordToken:token, resetPasswordCreatedDate:Date.now() + 3600000}}, {upsert:true, new: true}, function(err, doc){
      if(err){
        console.log("Something wrong when updating data!");
      } else{
        let email = doc.email;
        let nome_projeto = doc.nomeProjeto;
        let url = "url: http://localhost/projetos/nova-senha/"+username+"/"+token;

        let titulo = "MOVACI 2016 - Redefinição de senha"
        ,   texto = " "
        ,   html = "<h1>Blablab "+nome_projeto+" labalabla  "+url+"</h1>";

        const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.zoho.com',
        port: 587,
        auth: {
            user: 'contato@movaci.com.br',
            pass: 'mya collins nossa gata'
          }
        }));

        let mensagem = {
          from: 'contato@movaci.com.br',
          to: email,
          subject: titulo,
          text: texto,
          html: html
        };
        //FALTA ENVIAR O EMAIL COM O LINK PRA TROCAR A SENHA
        res.status(200).send("url: http://localhost/projetos/nova-senha/"+username+"/"+token);
        console.log(doc);
    /*transporter.sendMail(mensagem, (err) => {
    if (err) throw err;
    console.log("enviou a msg");
    })*/
      }
    });
  });
});

router.post('/nova-senha/:username/:token', (req, res) => {
  if(req.params.token === '') {
    res.status(400).send("erro");
    //console.log('err');
  } else {
    ProjetoSchema.findOne({username: (req.params.username)}, (err, usr) => {
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



//=====================================================================



//método ligeiro

router.get('/testekrl', function(req, res) {

let cep = "95.800-000"
,   cpf = "017.733.430-41"
,   telefone = "(51) 3741-5039"


if (cep !== undefined && cep.length==10) {
  cep = cep.replace(/([-.])/g,'');
  console.log(cep);
}

if (cpf !== undefined && cpf.length==14) {
  cpf = cpf.replace(/([-.])/g,'');
  console.log(cpf);
}

if (telefone !== undefined && telefone.length==14) {
  telefone = telefone.replace(/([-.() ])/g,'');
  console.log(telefone);
}


res.send(cep+" "+cpf+" "+telefone);
});




// GET na rota todos para mostrar TODOS os projetos cadastrados (projetos/todos)
router.get('/todos', ensureAuthenticated, (req, res) => {
	//res.set({ 'Content-Type' : 'text/json; charset=utf-8'})
  Projeto.findAll((err, docs) => {
   	res.send(docs);
  })
});

/*router.put("/:id",function (req,res) {
          var newUser = req.body;
          UserModel.update({_id:newUser._id},{$set:newUser},function (err,docs) {
            if(err){
              console.log("some error occurred in update");
            }else{
              console.log("update user",docs);
              res.status(200).json(newUser);
            }
          });
        });﻿*/

module.exports = router;
