'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Projeto = require('../controllers/projeto-controller')
, session = require('express-session')
, mongoose = require('mongoose')
, ProjetoSchema = require('../models/projeto-schema')
, dbURL = ('mongodb://localhost/loginapp');

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
  console.log('<<Mongoose>> conectou em: ' + dbURL);
});

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Comment = new Schema({
	title     : String,
	author    : String
});

var BlogPost = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    comments: [Comment]
}, { collection: 'teste3' });


		BlogPost.pre('save', function (next) {
            if (this.isNew) {
                if (this.comments.length == 0) {
                    this.comments = undefined;       
                }
                else if (this.comments.length == 1 && this.comments[0] == null) {
                    this.comments = [];
                }                                                                                                                    
            }
            next();
        });


//var BlogPost = mongoose.model('BlogPost', BlogPost);

// retrieve my model
var BlogPost = mongoose.model('BlogPost', BlogPost);

// create a blog post
var post = new BlogPost();

post.comments.push({ title:  undefined});

post.save((err) => {
  if (!err) console.log('Success!');
});